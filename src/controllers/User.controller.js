import mongoose from "mongoose";
import  UserModel  from "../models/UserModel.js";
import bcrypt from 'bcryptjs';



export const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;
    
    
          //find email if existed
        const existedEmail = await UserModel.findOne({email:email});
        if(existedEmail){
            return res.status(400).json({message: 'User already existed.'});
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

        return res.status(201).json({
            success: true, 
            message: `User registered successfully.`,
            user: user
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

export const getList = async (req, res) => {
    try {
        const user = await UserModel.find({});

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
            message: 'Internal server error.'
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
        
        const user = await UserModel.findById(id);

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