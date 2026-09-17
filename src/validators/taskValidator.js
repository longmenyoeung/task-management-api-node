import {body} from 'express-validator';
import { validate } from '../middleware/Validation.js';

export const TaskValidate = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required.")
        .isLength({min:5}).withMessage("Characters must be at least 5")
        .isLength({max:100}).withMessage("Characters must be at most 100"),
    body("description")
        .trim()
        .isLength({min:5}).withMessage("Characters must be at least 5")
        .isLength({max:100}).withMessage("Characters must be at most 100"),
    body("status")
        .isIn(["pending", "in-progress", "completed"])
        .withMessage("Invalid status. Use 'pending', 'in-progress', or 'completed'."),
    body("priority")
        .isIn(["high", "medium", "low"])
        .withMessage("Invalid priority level. Use 'high', 'medium', or 'low'."),
    body("assignedTo")
        .trim()
        .optional()
        .isMongoId().withMessage("Invalid user ID."),
    validate
]