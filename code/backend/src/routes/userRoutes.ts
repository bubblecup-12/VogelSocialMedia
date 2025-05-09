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
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistrationDto:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     UserLoginDto:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistrationDto'
 *     responses:
 *       201:
 *         description: Benutzer erfolgreich registriert
 *       400:
 *         description: Ungültige Eingabedaten
 */
userRouter.post(
  "/register",
  validateData(userRegistrationSchema),
  registerUser
);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginDto'
 *     responses:
 *       200:
 *         description: Login erfolgreich
 *       401:
 *         description: Ungültige Anmeldedaten
 */
userRouter.post("/login", validateData(userLoginSchema), loginUser);
/**
 * @swagger
 * /api/user/getUser/{username}:
 *   get:
 *     summary: Get user data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Der Benutzername, nach dem gesucht werden soll
 *     responses:
 *       200:
 *         description: Login erfolgreich
 *       401:
 *         description: Ungültige Anmeldedaten
 */
userRouter.get("/getUser/:username", authenticateToken(), getUser);

export default userRouter;
