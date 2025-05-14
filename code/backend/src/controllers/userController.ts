import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserLoginDto, userLoginSchema } from "../schemas/userSchemas";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();
// load environment variables from .env file
dotenv.config();
const JWT_SECRET: string = process.env.TOKEN_SECRET!; // this secret is used to sign the JWT token

// Generate a JWT token with the username as payload and a secret from the environment variables which expires in 1800 seconds (30 minutes)
function generateAccessToken(username: string, userId: string) {
  return jwt.sign(
    { username: username, role: "user", sub: userId },
    JWT_SECRET,
    { expiresIn: "1800s", issuer: "VogelApi" }
  ); //TODO: change role to user role
}

// Endpoint to register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = await req.body; //gets the data from the request body

  const existingUser = await prisma.user.findUnique({
    // check if the user already exists
    where: {
      username: username,
    },
  });
  if (existingUser) {
    // if the user already exists, return an error message
    res.status(400).json({
      error: "Invalid data",
      details: [{ message: `User "${username}" already exists` }],
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10); // hash the password with bcrypt
  if (!hashedPassword) {
    // check if the password was hashed successfully
    res.status(500).json({
      error: "Invalid data",
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
  const user = await prisma.user.create({ data: userData }); // create a new user in the database
  if (!user) {
    // check if the user was created successfully
    res.status(500).json({
      error: "Server error",
      details: [{ message: "Server Error while creating user" }],
    });
    return;
  }
  const token: string = generateAccessToken(user.username, user.id); // generate a JWT token with the username and userId as payload
  res.set("Authorization", `Bearer ${token}`); // set the token in the response header
  res.status(201).json({
    message: "user created",
    data: { username: username, email: email },
  }); // return the user object with the username and email
};

// Endpoint to login a user (unfinished)
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body; // get the data from the request body
  if (!username || !password) {
    // check if username and password are provided
    res.status(400).json({
      error: "Invalid data",
      details: [{ message: "Username and password are required" }],
    });
    return;
  }
  const user = await prisma.user.findUnique({
    // check if the user exists
    where: {
      username: username,
    },
  });
  if (!user) {
    // if the user does not exist, return an error message
    res
      .status(400)
      .json({
        error: "user not found",
        details: [{ message: `User "${username}" not found` }],
      });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password); // compare the password with the hashed password in the database
  if (!isPasswordValid) {
    // if the password is not valid, return an error message
    res.status(401).json({
      error: "invalid credentials",
      details: [{ message: "Invalid password" }],
    });
    return;
  }
  const token: string = generateAccessToken(user.username, user.id); // generate a JWT token with the username and userId as payload
  res.set("Authorization", `Bearer ${token}`); // set the token in the response header
  res.json({ message: "User logged in successfully" });
};

// Endpoint to get user data
export const getUser = async (req: Request, res: Response) => {
  const username: string = req.query.username as string;
  if (!username) {
    res.status(400).json({
      error: "no username",
      details: [{ message: "Username is required" }],
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(404).json({
      error: "user not found",
      details: [{ message: `User "${username}" not found` }],
    });
    return;
  }
  res.json({
    message: "User found",
    data: { username: user.username, email: user.email },
  });
};
