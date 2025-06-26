import express from "express";
import { feed } from "../controllers/feedController";
const feedRouter = express.Router();
/**
 * @swagger
 * /api/feed:
 *   get:
 *     summary: Get a paginated feed of public posts
 *     description: Returns public posts sorted by creation date descending with cursor pagination.
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: query
 *         name: createdAt
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Cursor for pagination, ISO timestamp of last post from previous page (only fetch posts created before this date)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of posts to fetch
 *     responses:
 *       200:
 *         description: List of posts with pagination cursor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       description:
 *                         type: string
 *                 nextCursor:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                   description: Cursor for the next page or null if no more posts
 *       500:
 *         description: Server error
 */
feedRouter.get("/", feed);
export default feedRouter;
