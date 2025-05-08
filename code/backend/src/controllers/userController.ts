import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserLoginDto, userLoginSchema } from "../schemas/userSchemas";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { string } from "zod";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();
// load environment variables from .env file
dotenv.config();
const JWT_SECRET: string = process.env.TOKEN_SECRET!;

function generateAccessToken(username: string) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "1800s" });
}

export const registerUser = async (req: Request, res: Response) => {
  const userRequest = await req.body;
  const user = await prisma.user.create({ data: userRequest });
  console.log(user.username);
  res.json({ message: "User registered successfully", data: req.body });
};

export const loginUser = (req: Request, res: Response) => {
  const token: string = generateAccessToken(req.body.username);
  res.json({ message: "User logged in successfully", data: req.body, token });
};

export const getUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  console.log(username, req.body);
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User found", data: user });
};

