import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { string } from "zod";
const JWT_SECRET: string = process.env.TOKEN_SECRET!;

interface JwtPayload {
  username: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticateToken() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) res.sendStatus(401);
    else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET as string,
        (err: any, user: any) => {
          console.log(err);

          if (err) res.sendStatus(403);

          req.user = user;

          next();
        },
      );
    }
  };
}
