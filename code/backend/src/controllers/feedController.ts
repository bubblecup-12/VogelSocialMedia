import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClient, Post } from "../../prisma/app/generated/prisma/client";
import { feedQuerySchema } from "../schemas/feedSchemas";
import { z } from "zod";
const prisma = new PrismaClient();
export const feed = async (req: Request, res: Response) => {
  try {
    const query = feedQuerySchema.parse(req.query);
    const take = query.limit;

    const posts = await prisma.post.findMany({
      take: take + 1,
      where: {
        status: "PUBLIC",
        ...(query.createdAt && { createdAt: { lt: query.createdAt } }),
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, description: true },
    });

    const hasMore = posts.length > take;
    if (hasMore) posts.pop();

    const nextCursor = hasMore ? posts[posts.length - 1].createdAt : null;

    res.status(200).json({ posts, nextCursor });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        error: "Invalid query parameters",
        details: err.errors,
      });
      return;
    }
    console.error(err);
    res.status(400).json({ error: "Invalid query parameters" });
  }
};
