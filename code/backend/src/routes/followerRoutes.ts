import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { followUser, unfollowUser } from "../controllers/followerController";
const followerRouter = express.Router();
/**
 * @swagger
 * /api/follower/follow/{username}:
 *   post:
 *     summary: follow a User
 *     tags: [User]
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
followerRouter.post("/follow/:username", authenticateToken(), followUser);

/**
 * @swagger
 * /api/follower/unfollow/{username}:
 *   delete:
 *     summary: follow a User
 *     tags: [User]
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
followerRouter.delete("/unfollow/:username", authenticateToken(), unfollowUser);
export default followerRouter;
