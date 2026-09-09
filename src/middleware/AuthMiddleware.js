import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                success: false,
                message: "Unauthorized."
            });
        }
        const token = authHeader.split('')[1];
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const user = await UserModel.findById(decoded.sub);
        req.user= user;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server internal error.",
            error:error.message
        });
    }
}