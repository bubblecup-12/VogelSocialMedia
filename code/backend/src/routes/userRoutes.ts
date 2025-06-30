// src/routes/userRoutes.ts
import express from "express";
import { validateData } from "../middleware/validationMiddleware";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../schemas/userSchemas";
import { authenticateToken } from "../middleware/authenticateToken";
import { logout, refreshToken } from "../controllers/userController";
const userRouter = express.Router();

import { registerUser, loginUser } from "../controllers/userController";
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
 *     tags: [Auth]
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
 *     tags: [Auth]
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
 * /api/user/refreshToken:
 *   get:
 *     summary: Refresh JWT tokens
 *     description: |
 *       Verifiziert einen bereitgestellten Refresh-Token (im Header) und gibt neue Tokens im Header zurück.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: header
 *         name: Refresh-Token
 *         required: true
 *         schema:
 *           type: string
 *         description: Der gültige JWT-Refresh-Token
 *     responses:
 *       200:
 *         description: Tokens erfolgreich erneuert
 *         headers:
 *           Authorization:
 *             description: Neuer Access-Token im Bearer-Format
 *             schema:
 *               type: string
 *           Refresh-Token:
 *             description: Neuer Refresh-Token
 *             schema:
 *               type: string
 *       401:
 *         description: Ungültiger oder abgelaufener Refresh-Token
 *       403:
 *         description: Fehlerhafte Signatur oder ungültiger Token
 *       500:
 *         description: Serverfehler
 */

userRouter.get("/refreshToken", refreshToken);

/**
 * @swagger
 * /api/user/logout:
 *   delete:
 *     summary: logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description:  logged out
 *       401:
 *         description: not authenticated
 */
userRouter.delete("/logout", authenticateToken(), logout);

export default userRouter;
