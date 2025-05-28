import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { UserLoginDto, UserRegistrationDto } from "../schemas/userSchemas";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();
// load environment variables from .env file
dotenv.config();
const JWT_SECRET: string = process.env.TOKEN_SECRET!; // this secret is used to sign the JWT token

// Generate a JWT token with the username as payload and a secret from the environment variables which expires in 1800 seconds (30 minutes)
function generateAccessToken(username: string, userId: string, role: string) {
  return jwt.sign({ username: username, role: role, sub: userId }, JWT_SECRET, {
    expiresIn: "1800s",
    issuer: "VogelApi",
  });
}

// Endpoint to register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email }: UserRegistrationDto = await req.body; //gets the data from the request body

  const existingUser: User | null = await prisma.user.findUnique({
    // check if the user already exists
    where: {
      username: username,
    },
  });
  if (existingUser) {
    // if the user already exists, return an error message
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Invalid data",
      details: [{ message: `User "${username}" already exists` }],
    });
    return;
  }
  const existingEmailUser: User | null = await prisma.user.findUnique({
    // check if the email is already in use
    where: {
      email: email,
    },
  });
  if (existingEmailUser) {
    // if the email is already in use, return an error message
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Invalid data",
      details: [{ message: `User with "${email}" already exists` }],
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10); // hash the password with bcrypt
  if (!hashedPassword) {
    // check if the password was hashed successfully
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
      details: [{ message: "Server Error" }],
    });
    return;
  }
  const userData = {
    // create a new user object with the data from the request body and the hashed password
    username: username,
    email: email,
    password: hashedPassword,
  };
  const user: User | null = await prisma.user.create({ data: userData }); // create a new user in the database
  if (!user) {
    // check if the user was created successfully
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
      details: [{ message: "Server Error while creating user" }],
    });
    return;
  }
  const token: string = generateAccessToken(user.username, user.id, user.role); // generate a JWT token with the username and userId as payload
  res.set("Authorization", `Bearer ${token}`); // set the token in the response header
  res.status(StatusCodes.CREATED).json({
    message: "user created",
    data: { username: username, email: email },
  }); // return the user object with the username and email
};

// Endpoint to login a user (unfinished)
export const loginUser = async (req: Request, res: Response) => {
  const { username, password }: UserLoginDto = req.body; // get the data from the request body

  const user: User | null = await prisma.user.findUnique({
    // check if the user exists
    where: {
      username: username,
    },
  });
  if (!user) {
    // if the user does not exist, return an error message
    res.status(StatusCodes.NOT_FOUND).json({
      error: "user not found",
      details: [{ message: `User "${username}" not found` }],
    });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password); // compare the password with the hashed password in the database
  if (!isPasswordValid) {
    // if the password is not valid, return an error message
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "invalid credentials",
      details: [{ message: "Invalid password" }],
    });
    return;
  }
  const token: string = generateAccessToken(user.username, user.id, user.role); // generate a JWT token with the username and userId as payload
  res.set("Authorization", `Bearer ${token}`); // set the token in the response header
  res.status(StatusCodes.OK).json({ message: "User logged in successfully" });
};

// Endpoint to get user data
export const getUser = async (req: Request, res: Response) => {
  const username: string = req.query.username as string;
  if (!username) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "no username",
      details: [{ message: "Username is required" }],
    });
    return;
  }
  const user: User | null = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      error: "user not found",
      details: [{ message: `User "${username}" not found` }],
    });
    return;
  }
  res.json({
    message: "User found",
    data: {
      username: user.username,
      email: user.email,
      userId: user.id,
      userInfo: user.bio,
    },
  });
};
