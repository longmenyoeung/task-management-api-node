import e from "express";
import { 
    createTask, 
    deleteTask, 
    getListTask, 
    updateTask
} from "../controllers/Task.controller.js";
import { AuthenticateJWT } from "../middleware/AuthMiddleware.js";

const taskRoute = e.Router();




/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management API
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Server internal error
 */
taskRoute.get('/', getListTask);


/**
 * @swagger
 * /api/tasks/{id}/create:
 *   post:
 *     summary: Create a new task under a project
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the Project
 *         example: 66d123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - priority
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *                 example: Implement JWT Authentication
 *               description:
 *                 type: string
 *                 example: Add authentication middleware and security tokens
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               assignedTo:
 *                 type: string
 *                 description: MongoDB ObjectId of the assigned user
 *                 example: 66d987654321abcdef654321
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Missing required fields or invalid ID format
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Project or User not found
 *       500:
 *         description: Server internal error
 */
taskRoute.post('/:id/create', AuthenticateJWT, createTask);


/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the Task
 *         example: 66d123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task Title
 *               description:
 *                 type: string
 *                 example: Updated task description
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 example: in-progress
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               project:
 *                 type: string
 *                 description: MongoDB ObjectId of the Project
 *                 example: 66d123456789abcdef123456
 *               assignedTo:
 *                 type: string
 *                 description: MongoDB ObjectId of the assigned User
 *                 example: 66d987654321abcdef654321
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid format ID provided
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Task, Project, or User not found
 *       500:
 *         description: Server internal error
 */
taskRoute.put('/:id',AuthenticateJWT,  updateTask);


/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the Task
 *         example: 66d123456789abcdef123456
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server internal error
 */
taskRoute.delete('/:id', AuthenticateJWT, deleteTask);

export default taskRoute;