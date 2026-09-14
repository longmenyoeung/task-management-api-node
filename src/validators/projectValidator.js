import {body} from 'express-validator'
import { validate } from './validate.js'


export const createProjectValidator  = [
    body("name")
        .trim()
        .notEmpty().withMessage("Project name is required.")
        .isAlpha('en-US').withMessage('Only english alphabets allowed.')
        .isLength({min:3}).withMessage("Name must be more than 3 characters long."),
    body("description")
        .trim()
        .notEmpty().withMessage("Project name is required.")
        .isAlpha('en-US').withMessage('Only english alphabets allowed.')
        .isLength({min:3}).withMessage("Description must be more than 3 characters long."),
    validate     
]

export const updateProjectValidator  = [
    body("name")
        .trim()
        .notEmpty().withMessage("Project name is required.")
        .isAlpha('en-US').withMessage('Only english alphabets allowed.')
        .isLength({min:3}).withMessage("Name must be more than 3 characters long."),
    body("description")
        .trim()
        .notEmpty().withMessage("Project name is required.")
        .isAlpha('en-US').withMessage('Only english alphabets allowed.')
        .isLength({min:3}).withMessage("Description must be more than 3 characters long."),
    validate     
]

