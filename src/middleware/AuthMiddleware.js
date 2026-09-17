import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js';
import ApiError from '../utils/ApiError.js';

export const AuthenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new ApiError(401, "Unauthorized.")
        }
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET; 

        const decoded = jwt.verify(token, secret);

        // Fetch user from DB and attach to req.user
        const user = await UserModel.findById(decoded.sub).select('-password');
        if (!user) {
            throw new ApiError(404, "User not found.")
        }
        
        req.user= user;
        next();

    } catch (error) {
        next(error)
    }
}