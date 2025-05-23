import express from "express";
import {
  getPost,
  uploadPost as uploadPost,
} from "../controllers/postController";
import { upload } from "../middleware/fileUpload";
import { authenticateToken } from "../middleware/authenticateToken";
import { validateData } from "../middleware/validationMiddleware";
import { uploadPostSchema } from "../schemas/postSchemas";
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
router.post(
  "/upload",
  authenticateToken(),
  upload,
  validateData(uploadPostSchema),
  uploadPost
);
/**
 * @swagger
 * /api/posts/get/{postId}:
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
router.get("/get/:postId", getPost);

export default router;
