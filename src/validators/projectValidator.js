import {body} from 'express-validator'
import { validate } from '../middleware/Validation.js';


export const ProjectValidator  = [
    body("name")
        .trim()
        .notEmpty().withMessage("Project name is required.")
        .isLength({min:3}).withMessage("Name must be more than 3 characters long."),
    body("description")
        .trim()
        .optional()
        .isLength({min:3}).withMessage("Description must be more than 3 characters long."),
    validate     
]


