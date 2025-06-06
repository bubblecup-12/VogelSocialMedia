import express, { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();
// imports the JWT secret
const JWT_SECRET: string = process.env.TOKEN_SECRET!;
if (!JWT_SECRET) console.log("no JWT secret");
// create an interface for the JWT payload
// this interface is used to define the structure of the JWT payload
interface JwtPayload {
  username: string;
  iat: number;
  exp: number;
}
// extend the Express Request interface to include the user property
// this is used to store the JWT payload in the request object
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
// Middleware function to authenticate the JWT token
export function authenticateToken() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"]; // get the authorization header from the request
    const token = authHeader && authHeader.split(" ")[1]; // split the header to get the token

    if (token == null)
      res.sendStatus(StatusCodes.UNAUTHORIZED); // if there is no token, return 401 Unauthorized
    else {
      jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        // verify the token with the secret

        if (err) {
          if (err instanceof TokenExpiredError) {
            // check if the error is expired and return 401
            res.status(StatusCodes.UNAUTHORIZED).json({
              error: "Token expired",
              details: [{ message: "Token expired" }],
            });
            return;
          }

          // if the token is invalid, return 403 Forbidden
          else {
            res.status(StatusCodes.FORBIDDEN).json({
              error: "Invalid token",
              details: [{ message: "Invalid token" }],
            });
            return;
          }
        }
        next();
      });
    }
  };
}
