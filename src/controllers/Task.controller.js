import mongoose from "mongoose";
import ProjectModel from "../models/ProjectModel.js";
import TaskModel from "../models/TaskModel.js";
import UserModel from "../models/UserModel.js";
import ApiError from "../utils/ApiError.js";


export const getListTask = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const tasks = await TaskModel.paginate(
            {},
            {
                page,
                limit,
                populate : [{path:'project'}, {path:'assignedTo', select: 'username email'}]
            }
        )

        return res.status(200).json({
            success: true,
            ...tasks
        });

    } catch (error) {
       next(error)
    }
}

export const createTask = async (req, res, next) => {
    try {
        const { title, description, priority, assignedTo} = req.body;
        const { id } = req.params;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid project ID format.")
        }
        if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
            throw new ApiError(400, "Invalid user ID format.")
        }


        const project = await ProjectModel.findById(id);
        if (!project) throw new ApiError(404, "Project not found.");

        if(project.owner._id.toString() === assignedTo.toString()){
            throw new ApiError(400, "The assigned user cannot be the same as the project owner.")
        }

        const user = await UserModel.findById(assignedTo);
        if (!user) throw new ApiError(404, "User not found.");

        if(req.user._id.toString() !== project.owner._id.toString()){
            throw new ApiError(403, "Only project owner can create task");
        }

        const task = await TaskModel.create({
            title,
            description,
            priority,
            project,
            assignedTo
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task: task
        });

    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, assignedTo } = req.body;
        const updateData = { title, description, status, priority, assignedTo};

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ApiError(400, "Invalid format ID provided.")
        }

        if(!mongoose.Types.ObjectId.isValid(assignedTo)){
            throw new ApiError(400, "Invalid format ID provided.")
        }

        const user = await UserModel.findById(assignedTo);

        if(!user){
            throw new ApiError(404, "User not found.")
        }

        const task = await TaskModel.findById(id).populate('project').populate('assignedTo', "_id")

        if(!task) {throw new ApiError(404, "Task not found.")}

        if(req.user._id.toString() === task.project.owner._id.toString() || 
            req.user._id.toString() === task.assignedTo._id.toString()
        ){
            const updated = await TaskModel.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            );

            return res.status(200).json({
                success: true,
                message:"Task updated successfully.",
                task:updated
            });
             
        }else{
            throw new ApiError(403, "Only project owner and assigned user can update the task.")
        }

    } catch (error) {
       next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        const task = await TaskModel.findById(id).populate('project').populate('assignedTo', '_id')

        if(!task){throw new ApiError(404, "Task not found.")}

        if(req.user._id.toString() === task.project.owner._id.toString() ||
           req.user._id.toString() === task.assignedTo._id.toString()){

            await task.deleteOne();
            return res.status(200).json({
                success: true,
                message:"Task deleted successfully.",
                task: task._id
            });

        }else{
            throw new ApiError(403, "Only project owner and assigned user can delete the task.")
        }

    } catch (error) {
       next(error)
    }
}