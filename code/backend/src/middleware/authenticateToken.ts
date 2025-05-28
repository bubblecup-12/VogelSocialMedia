import express, { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

// Import the JWT secret from environment variables
const JWT_SECRET: string = process.env.TOKEN_SECRET!;
if (!JWT_SECRET) console.error("No JWT secret provided");

// Define the structure of the JWT payload
interface JwtPayload {
  id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

// Extend the Express Request interface to include the user property
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
    const authHeader = req.headers["authorization"]; // Get the authorization header
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" format

    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized",
        details: [{ message: "No token provided" }],
      });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          // Handle expired token
          res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Token expired",
            details: [{ message: "Token has expired" }],
          });
          return;
        }

        // Handle invalid token
        res.status(StatusCodes.FORBIDDEN).json({
          error: "Invalid token",
          details: [{ message: "Token is invalid" }],
        });
        return;
      }

      // Attach the decoded payload to the request object
      req.user = decoded as JwtPayload;

      next(); // Pass control to the next middleware or route handler
    });
  };
}
