import mongoose from "mongoose";
import ProjectModel from "../models/ProjectModel.js";
import TaskModel from "../models/TaskModel.js";
import UserModel from "../models/UserModel.js";

export const getListTask = async (req,res) => {
    try {
        const tasks = await TaskModel.find({});

        if(tasks.length === 0) {return res.status(200).json({message: 'No data found.'})}

        return res.status(200).json({
            success: true,
            message: 'Get list tasks successfully.',
            task:tasks 
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server internal error.',
            error: error.message
        });
    }
}

export const createTask  = async (req, res) => {
    try {
        const {title, description, priority, assignedTo} = req.body;
        const {id} = req.params;

        if (!title || !description || !priority || !assignedTo) {
        return res.status(400).json({ message: "Missing required fields." });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid project ID format." });
        }
        if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
            return res.status(400).json({ message: "Invalid user ID format." });
        }

        
        const project = await ProjectModel.findById(id);
        if (!project) return res.status(404).json({ message: "Project not found." });

        const user = await UserModel.findById(assignedTo);
        if (!user) return res.status(404).json({ message: "User not found." });

        const task = await TaskModel.create({
            title, 
            description, 
            priority,
            project,
            user
        });
        
        return res.status(201).json({
            success: true,
            message:"Task created successfully.",
            task: task
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message: "Server internal error.",
            error: error.message
        });
    }
}