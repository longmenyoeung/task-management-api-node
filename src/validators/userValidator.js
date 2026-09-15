import {body} from 'express-validator'
import { validate } from './validate.js'

export const createUserValidator = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isAlpha('en-US')
        .withMessage("Name must contain only letters.")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long."),

    body('email')
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail() 
        .withMessage("Email is invalid.")
        .normalizeEmail(), 
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({min:8}).withMessage("Password must be at least 8 charaters.")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase.")
        .matches(/[a-z]/).withMessage("Password must conatain at least one lowercase.")
        .matches(/[0-9]/).withMessage("Password must contain at least one number.")
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.')
        .not().isIn(['123456789', 'password', 'qwerty']).withMessage("Do not use weak passwords."),
    validate
]

export const logiUserValidator  = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail() 
        .withMessage("Email is invalid.")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/[0-9]/).withMessage('Password must contain at least one number.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),
    validate
]