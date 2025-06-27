import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { PrismaClient, Post } from "../../prisma/app/generated/prisma/client";
import { minioClient } from "../server";
import { uploadPostSchema } from "../schemas/postSchemas";
dotenv.config();
const prisma = new PrismaClient();

export const uploadPost = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[]; // Mehrere Dateien // Cast req.file to Express.Multer.File there is no need to check if file is undefined since it is already checked in the middleware
  const user: JwtPayload = req.user!; // Get the user from the request
  const { description, status, tags } = uploadPostSchema.parse(req.body);
  const BUCKET = "images"; // Name of the bucket where the images are stored
  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        const objectName = `${user.sub}/posts/${Date.now()}-${file.originalname}`;
        await minioClient.putObject(BUCKET, objectName, file.buffer);
        const url = await minioClient.presignedGetObject(
          BUCKET,
          objectName,
          60 * 10
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
    const user: JwtPayload | undefined = req.user;
    const postObject = await prisma.post.findFirst({
      // find the post by id
      where: {
        id: postId,
        ...(user
          ? {
              OR: [
                { status: "PRIVATE", userId: user.id },
                { status: "PUBLIC" },
              ],
            }
          : { status: "PUBLIC" }),
      },
      include: {
        user: true,
        media: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });
    const likes: number = await prisma.like.count({
      where: {
        postId: postId,
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
    let isFollowing = false;
    if (user) {
      const following = await prisma.follow.findUnique({
        where: {
          followingUserId_followedUserId: {
            followingUserId: user.sub!,
            followedUserId: postObject.userId,
          },
        },
      });
      if (following) {
        isFollowing = true;
      }
    }
    const images = await Promise.all(
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
    ); // map the images to the presigned urls
    res.status(StatusCodes.OK).json({
      description: postObject.description,
      status: postObject.status,
      likes: likes,
      tags: postObject.postTags.map((tag) => tag.tag.name),
      user: {
        id: postObject.user.id,
        name: postObject.user.username,
      },
      createdAt: postObject.createdAt,
      updatedAt: postObject.updatedAt,
      images: images.filter((image) => image !== null), // filter out the null images
      following: isFollowing,
    });
    return;
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
      return;
    }
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to retrieve post",
      details: [{ message: "Server error" }],
    });
    return;
  }
};

// get all posts from a user
export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const user: JwtPayload | undefined = req.user;
    const username: string = req.params.username;
    const posts = await prisma.post.findMany({
      where: {
        ...(user
          ? {
              OR: [
                { status: "PRIVATE", userId: user.id },
                { status: "PUBLIC" },
              ],
            }
          : { status: "PUBLIC" }),
        user: {
          username: username,
        },
      },
    });
    if (!posts || posts.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "No posts found",
        details: [
          {
            message: `The user does not have any posts`,
          },
        ],
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      posts: posts,
    });
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to retrieve posts",
      details: [{ message: "Server error" }],
    });
    return;
  }
};
export const like = async (req: Request, res: Response) => {
  const postId: string = req.params.postId;
  const user: JwtPayload = req.user!;
  if (!postId) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "no username",
      details: [{ message: "Username is required" }],
    });
    return;
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "Post not found",
        details: [{ message: `Post with PostId '${postId}' does not exist.` }],
      });
      return;
    }
    const alreadyLiked = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: user.sub!,
        },
      },
    });
    if (alreadyLiked) {
      res.status(StatusCodes.CONFLICT).json({
        error: "Already following",
        details: [{ message: "You are already following this User" }],
      });
      return;
    }
    const follow = await prisma.like.create({
      data: {
        postId: postId,
        userId: user.sub!,
      },
    });
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Upload failed",
      details: [{ message: "Internal server error" }],
    });
  }
};
export const removeLike = async (req: Request, res: Response) => {
  const postId: string = req.params.postId;
  const user: JwtPayload = req.user!;
  if (!postId) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "no postId",
      details: [{ message: "postId is required" }],
    });
    return;
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "Post not found",
        details: [{ message: `Post with PostId '${postId}' does not exist.` }],
      });
      return;
    }
    const alreadyLiked = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId!,
          userId: user.sub!,
        },
      },
    });
    if (!alreadyLiked) {
      res.status(StatusCodes.CONFLICT).json({
        error: "Already following",
        details: [{ message: "You are already following this User" }],
      });
      return;
    }
    const follow = await prisma.like.delete({
      where: {
        postId_userId: {
          postId: postId,
          userId: user.sub!,
        },
      },
    });
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Upload failed",
      details: [{ message: "Internal server error" }],
    });
  }
};

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany({
      take: 150,
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });
    const data: string[] = tags.map((tag) => tag.name);
    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to retrieve tags",
      details: [{ message: "Internal server error" }],
    });
  }
};
