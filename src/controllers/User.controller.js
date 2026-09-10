import mongoose from "mongoose";
import  UserModel  from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;
    
    
          //find email if existed
        const existedEmail = await UserModel.findOne({email:email});
        if(existedEmail){
            return res.status(400).json({message: 'User already existed.'});
        }


        //if role admin already exist so it will cant create role admin more
        const adminExisted = await UserModel.findOne({role:"admin"});
        if(adminExisted){
            //use this message becuase i dont need hacker know that role admin already exist
            return res.status(400).json({message: 'Something went wrong. please try again later.'});
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


        const userRepsone = user.toObject();
        delete userRepsone.password;
        delete userRepsone.role;

        return res.status(201).json({
            success: true, 
            message: `User registered successfully.`,
            user: userRepsone
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message: "Email or password are required."
            });
        }

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Email or password incorrect."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Email or password incorrect."
            })
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
        return res.status(500).json({
            success: false,
            message: "Server internal error.",
            error: error.message
        })
    }
}

export const getList = async (req, res) => {
    try {
        const user = await UserModel.find({})
                                    .select('-password -role');

        if(user.length === 0) {
            return res.status(200).json({message:'user is empty.'})
        }


        res.status(200).json({
            success: true,
            message: "get all users successfully.",
            user:user
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Internal server error.',
            error: error.message
        });
    }
}

export const searchById = async (req, res) => {
    try {
        const {id} = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ 
                success: false,
                message: 'Invalid ID format provided.' 
            });
        }
        
        const user = await UserModel.findById(id).select('-password -role');

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found.' 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User has been found successfully.',
            user: user
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const isActive =  {
            isActive: req.body.isActive
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid format provide."
            });
        }

        const user = await UserModel.findByIdAndUpdate(id,isActive,{new: true, runValidators:true});
        if(!user){
            return res.status(404).json({
                success : false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
            user:user._id
        });

    } catch (error) {
        return res.status(500).json({message:"Internal server error.", error:error.message});
    }
}