import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { PrismaClient, Post } from "@prisma/client";
import { minioClient } from "../server";
import { object } from "zod";
import { uploadPostSchema } from "../schemas/postSchemas";
dotenv.config();
const prisma = new PrismaClient();

export const uploadPost = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[]; // Mehrere Dateien // Cast req.file to Express.Multer.File there is no need to check if file is undefined since it is already checked in the middleware
  const user: JwtPayload = req.user!; // Get the user from the request
  const { description, status, tags } = uploadPostSchema.parse(req.body);
  const BUCKET = "images"; // Name of the bucket where the images are stored
  console.log(tags);
  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        const objectName = `${user.sub}/${Date.now()}-${file.originalname}`;
        await minioClient.putObject(BUCKET, objectName, file.buffer);
        const url = await minioClient.presignedGetObject(
          BUCKET,
          objectName,
          60 * 5 // 5 Minuten Gültigkeit
        );

        return {
          originalName: file.originalname,
          objectName: objectName,
          size: file.size,
          mimetype: file.mimetype,
          url: url,
        };
      })
    );

    const post: Post | null = await prisma.post.create({
      data: {
        userId: user.sub!,
        description: description,
        status: status,
        media: {
          create: uploads.map((upload) => ({
            originalFilename: upload.originalName,
            objectName: upload.objectName,
            size: upload.size,
            mimeType: upload.mimetype,
            bucket: BUCKET,
            uploader: { connect: { id: user.sub! } },
          })),
        },
        postTags: {
          create: tags.map((tag: string) => ({
            tag: {
              connectOrCreate: { where: { name: tag }, create: { name: tag } },
            },
          })),
        },
      },
    }); // create a new post in the database
    res.status(StatusCodes.CREATED).json({
      message: "Upload successful",
      post: post,
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Upload failed" });
  }
};

// get post from postId
export const getPost = async (req: Request, res: Response) => {
  try {
    // get the postId from the request
    const postId: string = req.query.postId as string;
    const postObject = await prisma.post.findUnique({
      // find the post by id
      where: {
        id: postId,
      },
      include: {
        user: true,
        media: true,
      },
    });
    if (!postObject) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "Post not found",
        details: [
          {
            message: `The Post does not exist`,
          },
        ],
      });
      return;
    }
    const post = await Promise.all(
      // generate the presigned url for each image
      postObject?.media.map(async (image) => {
        try {
          await minioClient.statObject(image.bucket, image.objectName);

          return {
            originalName: image.originalFilename,
            mimetype: image.mimeType,
            url: await minioClient.presignedGetObject(
              image.bucket,
              image.objectName,
              60 * 5
            ),
          };
        } catch (err) {
          return null;
        }
      }) ?? []
    );
    res.status(StatusCodes.OK).json({
      message: "Post found",
      post: post,
    });
  } catch (err: any) {
    if (err.code === "NotFound") {
      // Handle the case where the object does not exist
      res.status(StatusCodes.NOT_FOUND).json({
        error: "Image not found",
        details: [
          {
            message: `The image  does not exist in the bucket `,
          },
        ],
      });
    }
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to retrieve post",
      details: [{ message: "Server error" }],
    });
  }
};
