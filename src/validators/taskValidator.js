import {body} from 'express-validator';
import { validate } from './validate.js';

export const createTaskValidate = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required.")
        .isLength({min:5}).withMessage("Characters must be at least 5")
        .isLength({max:50}).withMessage("Characters must be at most 50")
        .isAlpha('en-US').withMessage("Onlyb english alphabets allowed"),
    body("description")
        .trim()
        .notEmpty().withMessage("Title is required.")
        .isLength({min:5}).withMessage("Characters must be at least 5")
        .isLength({max:50}).withMessage("Characters must be at most 50")
        .isAlpha('en-US').withMessage("Onlyb english alphabets allowed"),
    body("priority")
        .isIn(["high", "medium", "low"])
        .withMessage("Invalid priority level. Use 'high', 'medium', or 'low'."),

    body("assignedTo")
        .trim()
        .notEmpty().withMessage("AssignedTo is required.")
        .isMongoId().withMessage("Invalid user ID."),
    validate
]

export const updateTaskValidate = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required.")
        .isLength({min:5}).withMessage("Characters must be at least 5")
        .isLength({max:50}).withMessage("Characters must be at most 50")
        .isAlpha('en-US').withMessage("Onlyb english alphabets allowed"),
    body("description")
        .trim()
        .notEmpty().withMessage("Title is required.")
        .isLength({min:5}).withMessage("Characters must be at least 5")
        .isLength({max:50}).withMessage("Characters must be at most 50")
        .isAlpha('en-US').withMessage("Onlyb english alphabets allowed"),
    body("status")
        .isIn(["pending", "in-progress", "completed"])
        .withMessage("Invalid status. Use 'pending', 'in-progress', or 'completed'."),
    body("priority")
        .isIn(["high", "medium", "low"])
        .withMessage("Invalid priority level. Use 'high', 'medium', or 'low'."),
    body("assignedTo")
        .trim()
        // .notEmpty().withMessage("AssignedTo is required.")
        .optional()
        .isMongoId().withMessage("Invalid user ID."),
    validate
]