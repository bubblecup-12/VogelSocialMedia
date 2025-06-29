import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import {
  getProfile,
  getProfilePicture,
  updateBio,
  uploadProfilePicture,
} from "../controllers/profileController";
const profileRouter = express.Router();
import { upload } from "../middleware/uploadSingle";
import { updateBioSchema } from "../schemas/profileSchemas";
import { validateData } from "../middleware/validationMiddleware";
import { optionalAuthenticateToken } from "../middleware/optionalAuthenticateToken";
/**
 * @swagger
 * /api/profile/uploadProfilePicture:
 *   post:
 *     summary: Upload profile picture
 *     description: Uploads a profile picture for the current user
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid file or request
 *       401:
 *         description: Unauthorized
 */
profileRouter.post(
  "/uploadProfilePicture",
  authenticateToken(),
  upload,
  uploadProfilePicture
);
/**
 * @swagger
 * /api/profile/getProfilePicture/{username}:
 *   get:
 *     summary: Get Profilepicture
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Der Benutzername, nach dem gesucht werden soll
 *     responses:
 *       200:
 *         description:  Ok
 *       401:
 *         description: not authenticated
 */
profileRouter.get("/getProfilePicture/:username", getProfilePicture);
/**
 * @swagger
 * /api/profile/updateBio:
 *   put:
 *     summary: Update user bio
 *     description: Updates the bio (short description) of the currently authenticated user.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 description: New bio text for the user
 *                 example: "When you program open source, you're programming COMMUNISM☭"
 *     responses:
 *       200:
 *         description: Bio updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
profileRouter.put(
  "/updateBio",
  authenticateToken(),
  validateData(updateBioSchema),
  updateBio
);
/**
 * @swagger
 * /api/profile/{username}:
 *   get:
 *     summary: Get user data
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
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
profileRouter.get("/:username", optionalAuthenticateToken, getProfile);
export default profileRouter;
