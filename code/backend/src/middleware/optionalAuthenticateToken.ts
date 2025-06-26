import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/tokens";
const JWT_SECRET: string = process.env.TOKEN_SECRET!;

export const optionalAuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"]; // Get the authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" format

  if (!token) {
    return next();
  }

  jwt.verify(token!, JWT_SECRET, (err, user) => {
    if (err) {
      return next();
    }
    req.user = user as JwtPayload;
    next();
  });
};
