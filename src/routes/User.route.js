import express from "express";
import {
    register,
    getList,
    searchById,
    deleteUser,
    login,
} from "../controllers/User.controller.js";
import { AuthenticateJWT } from "../middleware/AuthMiddleware.js";
import authorizeRoles from "../middleware/Authorizerole.js";

const userRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and management API
 */

// ============= Public Routes =============
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
userRoute.post("/register", register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials or missing fields
 *       500:
 *         description: Server internal error
 */
userRoute.post("/login", login);

// ============= Private Routes =============

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Access denied - Admin role required
 *       500:
 *         description: Internal server error
 */
userRoute.get("/", AuthenticateJWT, authorizeRoles("admin"), getList);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Search a user by ID (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *         example: 66d123456789abcdef123456
 *     responses:
 *       200:
 *         description: User found successfully
 *       400:
 *         description: Invalid ID format provided
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Access denied - Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoute.get(
    "/:id",
    AuthenticateJWT,
    authorizeRoles("admin"),
    searchById
);


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *         example: 66d123456789abcdef123456
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid format provided
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Access denied - Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoute.delete(
    "/:id",
    AuthenticateJWT,
    authorizeRoles("admin"),
    deleteUser
);



export default userRoute;

