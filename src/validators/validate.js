import { validationResult } from "express-validator"

export const  validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const formattedError  = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return res.status(400).json({
            success: false,
            errors: formattedError
        })
    }
    next();
} 