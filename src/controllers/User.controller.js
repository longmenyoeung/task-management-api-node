import mongoose from "mongoose";
import  UserModel  from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import ApiError from "../utils/ApiError.js";


export const register = async (req, res, next) => {
    try {
        const {username, email, password, role} = req.body;
    
    
          //find email if existed
        const existedEmail = await UserModel.findOne({email:email});
        if(existedEmail){
            throw new ApiError(400, "User already existed.")
        }


       
        //if role admin already exist so it will cant create role admin more
        if(role === "admin"){
        const adminExisted = await UserModel.findOne({role:"admin"});
        if(adminExisted){
            throw new ApiError(400, "Something went wrong. please try again later.")
        }
        }

         //create user
        const saltRouds = 10;
        const passwordHashed = await bcrypt.hash(password, saltRouds)

        const user = await UserModel.create({
            username, 
            email,
            password:passwordHashed, 
            role
        });


        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.role;

        return res.status(201).json({
            success: true, 
            message: `User registered successfully.`,
            user: userResponse
        });

    } catch (error) {
       next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;


        const user = await UserModel.findOne({email});
        if(!user){
            throw new ApiError(404, "Email or password incorrect.")
        }

        if(user.isActive === false){
            throw new ApiError(403, "This account has been deactivated or deleted. please contact support.")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
    
            throw new ApiError(400, "Email or password incorrect.")
        }

        //sign token
        const secret  = process.env.JWT_SECRET;
        const accessToken = jwt.sign(
            {
                sub:user._id,
                email:user.email
            },secret,
            {expiresIn: '15m'}
        )

        return res.json({
            success:true,
            token : accessToken
        });

    } catch (error) {
       next(error)
    }
}

export const getList = async (req, res, next) => {
    try {
   
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const users = await UserModel.paginate(
            {},
           {
                page,
                limit,
                select: '-password -role'
           }
        )

        res.status(200).json({
            success: true,
           ...users
        });

    } catch (error) {
       next(error)
    }
}

export const searchById = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
           throw new ApiError(400, "Invalid ID format provided.")
        }
        
        const user = await UserModel.findById(id).select('-password -role');

        if (!user) {
           throw new ApiError(404, "User not found.")
        }

        return res.status(200).json({
            success: true,
            message: 'User has been found successfully.',
            user: user
        });
        
    } catch (error) {
       next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ApiError(400, "Invalid ID format provided.")
        }
 
        const user = await UserModel.findByIdAndUpdate(id,{isActive: false}, {new:true,runValidators:true}).select('-password -role');
        if(!user){
            throw new ApiError(404, "User not found.")
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
            user:user._id
        });

    } catch (error) {
       next(error);
    }
}
