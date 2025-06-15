import express from "express";
import {
  getPost,
  getUserPosts,
  uploadPost as uploadPost,
} from "../controllers/postController";
import { upload } from "../middleware/fileUpload";

import { validateData } from "../middleware/validationMiddleware";
import { uploadPostSchema } from "../schemas/postSchemas";
import { get } from "http";
const router = express.Router();

/**
 * @swagger
 * /api/posts/upload:
 *   post:
 *     summary: Upload multiple images with metadata
 *     tags:
 *       - posts
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
router.post("/upload", upload, validateData(uploadPostSchema), uploadPost);
/**
 * @swagger
 * /api/posts/getPost/{postId}:
 *   get:
 *     summary: Get Post
 *     tags: [posts]
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
 *       401:
 *         description: not authenticated
 */
router.get("/getPost/:userId", getPost);
/**
 * @swagger
 * /api/posts/getUserPosts/{userId}:
 *   get:
 *     summary: Get Post
 *     tags: [posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         description:  Ok
 *       401:
 *         description: not authenticated
 */
router.get("/getuserposts/:userId", getUserPosts);
export default router;
