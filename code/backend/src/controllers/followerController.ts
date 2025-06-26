import { StatusCodes } from "http-status-codes";
import express, { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { PrismaClient, Follow } from "../../prisma/app/generated/prisma/client";
const prisma = new PrismaClient();
export const followUser = async (req: Request, res: Response) => {
  const username: string = req.params.username;
  const followingUser: JwtPayload = req.user!;
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
    if (user.username == username) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        details: [{ message: "You can`t follow yourself" }],
      });
      return;
    }
    const alreadyFollowing = await prisma.follow.findUnique({
      where: {
        followingUserId_followedUserId: {
          followingUserId: followingUser.sub!,
          followedUserId: user.id,
        },
      },
    });
    if (alreadyFollowing) {
      res.status(StatusCodes.CONFLICT).json({
        error: "Already following",
        details: [{ message: "You are already following this User" }],
      });
      return;
    }
    const follow = await prisma.follow.create({
      data: {
        followingUserId: followingUser.sub!,
        followedUserId: user.id,
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
export const unfollowUser = async (req: Request, res: Response) => {
  const username: string = req.params.username;
  const followingUser: JwtPayload = req.user!;
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
    const alreadyFollowing = await prisma.follow.findUnique({
      where: {
        followingUserId_followedUserId: {
          followingUserId: followingUser.sub!,
          followedUserId: user.id,
        },
      },
    });
    if (!alreadyFollowing) {
      res.status(StatusCodes.CONFLICT).json({
        error: "Not following",
        details: [{ message: "You are not following this User" }],
      });
      return;
    }
    const follow = await prisma.follow.delete({
      where: {
        followingUserId_followedUserId: {
          followingUserId: followingUser.sub!,
          followedUserId: user.id,
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
