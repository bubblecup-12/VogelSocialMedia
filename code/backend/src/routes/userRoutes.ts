// src/routes/userRoutes.ts
import express from "express";
import { validateData } from "../middleware/validationMiddleware";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../schemas/userSchemas";
import { authenticateToken } from "../middleware/authenticateToken";

const userRouter = express.Router();

import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";

userRouter.post(
  "/register",
  validateData(userRegistrationSchema),
  registerUser,
);
userRouter.post("/login", validateData(userLoginSchema), loginUser);
userRouter.get(
  "/getUser",
  authenticateToken(),
  validateData(userLoginSchema),
  getUser,
);
export default userRouter;
