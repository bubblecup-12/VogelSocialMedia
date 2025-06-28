import express, { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "../../prisma/app/generated/prisma/client";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { minioClient } from "../server";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();
// load environment variables from .env file
dotenv.config();

type PublicUser = {
  id: string;
  username: string;
  bio: string | null;
  profilePictureUrl: string | null;
  followers: number;
  following: number;
  posts: number;
};
const getUser: (userId: string) => Promise<PublicUser | undefined> = async (
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profilePicture: true },
  });
  if (user) {
    let profilePictureUrl: string | null = null;
    if (user.profilePicture) {
      profilePictureUrl = await minioClient.presignedGetObject(
        user.profilePicture.bucket,
        user.profilePicture.objectName,
        60 * 10
      );
    }
    const followerCount = await prisma.follow.count({
      where: {
        followedUserId: userId,
      },
    });

    const followingCount = await prisma.follow.count({
      where: {
        followingUserId: userId,
      },
    });
    const postCount = await prisma.post.count({
      where: {
        userId: userId,
      },
    });
    const publicUser: PublicUser = {
      id: user.id,
      username: user.username,
      bio: user.bio,
      profilePictureUrl,
      followers: followerCount,
      following: followingCount,
      posts: postCount,
    };
    return publicUser;
  }
  return undefined;
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const file = req.file as Express.Multer.File;
  const BUCKET = "images"; // Name of the bucket where the images are stored
  try {
    const objectName = `${user.sub}/profile.${file.mimetype.split("/")[1]}`;
    await minioClient.putObject(BUCKET, objectName, file.buffer);
    const url = await minioClient.presignedGetObject(
      BUCKET,
      objectName,
      60 * 10
    );
    const oldImage = await prisma.user.findUnique({
      where: { id: user.sub },
      select: { profilePictureId: true },
    });

    const media = await prisma.media.create({
      data: {
        originalFilename: file.originalname,
        objectName: objectName,
        mimeType: file.mimetype,
        size: file.size,
        bucket: BUCKET,
        uploader: { connect: { id: user.sub } },
      },
    });

    await prisma.user.update({
      where: { id: user.sub },
      data: {
        profilePicture: {
          connect: { id: media.id },
        },
      },
    });

    if (oldImage?.profilePictureId && oldImage.profilePictureId !== media.id) {
      await prisma.media.delete({
        where: { id: oldImage.profilePictureId },
      });
    }

    res.status(StatusCodes.CREATED).json({
      originalName: file.originalname,
      objectName: objectName,
      size: file.size,
      mimetype: file.mimetype,
      url: url,
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Upload failed",
      details: [{ message: "Internal server error" }],
    });
  }
};

export const getProfilePicture = async (req: Request, res: Response) => {
  const username: string = req.params.username;
  if (!username) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "no username",
      details: [{ message: "Username is required" }],
    });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { profilePicture: true },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "User not found",
        details: [
          { message: `User with username '${username}' does not exist.` },
        ],
      });
      return;
    }

    if (!user.profilePicture) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "No profile picture",
        details: [{ message: "This user does not have a profile picture." }],
      });
      return;
    }

    const profilePictureUrl = await minioClient.presignedGetObject(
      user.profilePicture.bucket,
      user.profilePicture.objectName,
      60 * 10 // 10 minutes expiration
    );

    res.status(StatusCodes.OK).json({ url: profilePictureUrl });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Retrieving image failed",
      details: ["Internal server error"],
    });
    return;
  }
};

export const updateBio = async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const bio: string = req.body.bio;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.sub },
      data: {
        bio: bio,
      },
    });
    const publicUser: PublicUser | undefined = await getUser(user.sub!);
    res.status(StatusCodes.OK).json({
      message: "User found",
      data: publicUser,
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Updating bio failed",
      details: [{ message: "Internal Server error" }],
    });
  }
};
// Endpoint to get user data
export const getProfile = async (req: Request, res: Response) => {
  const username: string = req.params.username as string;
  if (!username) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "no username",
      details: [{ message: "Username is required" }],
    });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { profilePicture: true },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "User not found",
        details: [
          { message: `User with username '${username}' does not exist.` },
        ],
      });
      return;
    }

    const publicUser: PublicUser | undefined = await getUser(user.id);

    res.status(StatusCodes.OK).json({
      message: "User found",
      data: publicUser,
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Retrieving image failed",
      details: ["Error while retrieving the image"],
    });
    return;
  }
};
