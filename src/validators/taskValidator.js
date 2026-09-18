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
        .optional()
        .isLength({min:5}).withMessage("Characters must be at least 5")
        .isLength({max:500}).withMessage("Characters must be at most 500"),
    body("assignedTo")
        .trim()
        .optional()
        .isMongoId().withMessage("Invalid user ID."),
    validate
]