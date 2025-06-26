import express, { Request, Response } from "express";
import {
  PrismaClient,
  User,
  RefreshToken,
} from "../../prisma/app/generated/prisma/client";
import { UserLoginDto, UserRegistrationDto } from "../schemas/userSchemas";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { RefreshTokenPayload } from "../types/tokens";
const app = express();
app.use(express.json());
const prisma = new PrismaClient();
// load environment variables from .env file
dotenv.config();
const JWT_SECRET: string = process.env.TOKEN_SECRET!; // this secret is used to sign the JWT token
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET!;

// Generate a JWT token with the username as payload and a secret from the environment variables which expires in 1800 seconds (30 minutes)
function generateAccessToken(
  username: string,
  userId: string,
  role: string,
  refreshTokenId: string
) {
  return jwt.sign(
    { username: username, role: role, sub: userId, jti: refreshTokenId },
    JWT_SECRET,
    {
      expiresIn: "1800s",
      issuer: "VogelApi",
    }
  );
}

async function generateRefreshToken(
  userId: string
): Promise<{ token: string; id: string }> {
  const expiresAt = new Date(Date.now() + 100 * 60 * 60 * 1000); // 100 h
  let refreshToken: RefreshToken;
  {
    refreshToken = await prisma.refreshToken.create({
      data: {
        expiresAt: expiresAt,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  return {
    token: jwt.sign({ jti: refreshToken.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "100h",
    }),
    id: refreshToken.id,
  };
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
  const refreshToken = await generateRefreshToken(user.id);
  res.set("Refresh-Token", refreshToken.token);
  const token: string = generateAccessToken(
    user.username,
    user.id,
    user.role,
    refreshToken.id
  ); // generate a JWT token with the username and userId as payload
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
  const refreshToken = await generateRefreshToken(user.id);
  res.set("Refresh-Token", refreshToken.token);
  const token: string = generateAccessToken(
    user.username,
    user.id,
    user.role,
    refreshToken.id
  ); // generate a JWT token with the username and userId as payload
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
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken: string | undefined = req.headers[
    "refresh-token"
  ] as string;
  if (!refreshToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
      details: [{ message: "No token provided" }],
    });
    return;
  }

  await jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    async (err: any, decoded: any) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Refreshtoken expired",
            details: [{ message: "Refreshtoken has expired" }],
          });
          return;
        }
        res.status(StatusCodes.FORBIDDEN).json({
          error: "Invalid refreshtoken",
          details: [{ message: "Refreshtoken is invalid" }],
        });
        return;
      }

      const payload = decoded as RefreshTokenPayload;
      try {
        const now = new Date();
        const storedToken = await prisma.refreshToken.findUnique({
          where: {
            id: payload.jti,
            expiresAt: {
              gt: now, // expiresAt > now
            },
          },
          include: { user: true },
        });
        if (!storedToken) {
          res.status(StatusCodes.UNAUTHORIZED).json({
            error: "InvalidRefreshToken",
            details: [
              { message: "Refresh token is invalid or no longer exists" },
            ],
          });
          return;
        }
        await prisma.refreshToken.delete({
          where: { id: payload.jti },
        });
        const refreshToken = await generateRefreshToken(storedToken.user.id);
        res.set("Refresh-Token", refreshToken.token);
        const token: string = generateAccessToken(
          storedToken.user.username,
          storedToken.user.id,
          storedToken.user.role,
          refreshToken.id
        ); // generate a JWT token with the username and userId as payload
        res.set("Authorization", `Bearer ${token}`); // set the token in the response header
        res.status(StatusCodes.OK).send();
      } catch {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "Server error",
          details: [{ message: "Server Error" }],
        });
        return;
      }
    }
  );
};

export const logout = async (req: Request, res: Response) => {
  const jti: string = req.query.jti as string;
  try {
    await prisma.refreshToken.delete({ where: { id: jti } });
    res.removeHeader("Authorization");
    res.removeHeader("Refresh-Token");
    res.status(StatusCodes.NO_CONTENT).send();
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
