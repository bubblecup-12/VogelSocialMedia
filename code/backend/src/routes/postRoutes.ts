import express from "express";
import {
  getPost,
  getTags,
  getUserPosts,
  like,
  removeLike,
  uploadPost as uploadPost,
} from "../controllers/postController";
import { upload } from "../middleware/uploadMultiple";

import { validateData } from "../middleware/validationMiddleware";
import { uploadPostSchema } from "../schemas/postSchemas";
import { authenticateToken } from "../middleware/authenticateToken";
import { optionalAuthenticateToken } from "../middleware/optionalAuthenticateToken";
const router = express.Router();

/**
 * @swagger
 * /api/posts/upload:
 *   post:
 *     summary: Upload multiple images with metadata
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *               - description
 *               - status
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               status:
 *                 type: string
 *                 enum: [HIDDEN, PUBLIC, PRIVATE, ARCHIVED]
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *           encoding:
 *             images:
 *               style: form
 *               explode: true
 *             tags:
 *               style: form
 *               explode: true
 *             status:
 *               style: form
 *             description:
 *               style: form
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 */
router.post(
  "/upload",
  authenticateToken(),
  upload,
  validateData(uploadPostSchema),
  uploadPost
);
/**
 * @swagger
 * /api/posts/getPost/{postId}:
 *   get:
 *     summary: Get Post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post id
 *     responses:
 *       200:
 *         description:  Ok
 *       404:
 *         description: not found
 */
router.get("/getPost/:postId", optionalAuthenticateToken, getPost);
/**
 * @swagger
 * /api/posts/getUserPosts/{username}:
 *   get:
 *     summary: Get Posts from user
 *     tags: [Posts]
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
 *       404:
 *         description: not found
 */
router.get("/getuserposts/:username", optionalAuthenticateToken, getUserPosts);
/**
 * @swagger
 * /api/posts/like/{postId}:
 *   post:
 *     summary: follow a User
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
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
router.post("/like/:postId", authenticateToken(), like);

/**
 * @swagger
 * /api/posts/removeLike/{postId}:
 *   delete:
 *     summary: follow a User
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
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
router.delete("/removeLike/:postId", authenticateToken(), removeLike);

/**
 * @swagger
 * /api/posts/tags:
 *   get:
 *     summary: Get posttags
 *     description: Returns posttags
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: List of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/tags", getTags);

export default router;
