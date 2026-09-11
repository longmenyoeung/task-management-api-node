import e from "express";
import {
    createProject,
    deleteProject,
    getListProject,
    updateProject,
} from "../controllers/Project.controller.js";
import { AuthenticateJWT } from "../middleware/AuthMiddleware.js";

const projectRoute = e.Router();


/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management API
 */


/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - owner
 *             properties:
 *               name:
 *                 type: string
 *                 example: E-Commerce Website
 *               description:
 *                 type: string
 *                 example: Build an online shopping platform
 *               owner:
 *                 type: string
 *                 description: MongoDB ObjectId of the user who owns the project
 *                 example: 66d123456789abcdef123456
 *
 *     responses:
 *       201:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User ID not found or invalid User ID
 *       500:
 *         description: Internal server error
 */
projectRoute.post("/",AuthenticateJWT, createProject);


/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all projects successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get all list project successfully.
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66d123456789abcdef123456
 *                       name:
 *                         type: string
 *                         example: E-Commerce Website
 *                       description:
 *                         type: string
 *                         example: Build an online shopping platform
 *                       owner:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 66d987654321abcdef654321
 *                           username:
 *                             type: string
 *                             example: john
 *                           email:
 *                             type: string
 *                             example: john@example.com
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */
projectRoute.get("/", getListProject);


/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the project
 *         schema:
 *           type: string
 *         example: 66d123456789abcdef123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated E-Commerce Website
 *               description:
 *                 type: string
 *                 example: Updated project description
 *
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid ID format provided
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectRoute.put("/:id", updateProject);


/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the project
 *         schema:
 *           type: string
 *         example: 66d123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Invalid ID format provided
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectRoute.delete("/:id", deleteProject);




export default projectRoute;
