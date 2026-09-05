import mongoose from "mongoose";
import ProjectModel from "../models/ProjectModel.js";
import UserModel from "../models/UserModel.js";

export const createProject = async (req, res) => {
    try {
        const {name, description, owner} = req.body;

        const ownerId = await UserModel.findById(owner);
        if(!ownerId){
            return res.status(404).json({
                success: false,
                message: 'User ID not found or Invalid User ID.'
            });
        }

        const project = new ProjectModel({
            name, description, owner
        });


        await project.save();

        return res.status(201).json({
            success: true,
            message: 'Project created successfully.',
            project:project
        });

    } catch (error) {
        return res.status(500).json({message:'Internal server error.',error:error.message});
    }
}

export const getListProject = async (req, res) => {
    try {
        const projects = await ProjectModel.find({})
                                            .populate('owner', 'username email')
        if(projects.length===0){return res.json({message:'Project is empty.'})}


        return res.status(200).json({
            success: true,
            message: 'Get all list project successfully.',
            projects:projects
        })

    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error:error.message})
    }
}

export const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        // const {name, description} = req.body; //1. Extract variables
        // const updateData = {name, description}; //2. Bundle them into a clean object

        const updateData = {
            name :req.body.name,
            description: req.body.description
        }

        // 1. Structural Verification: Guard against malformed MongoDB IDs
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format provided.'
            });
        }

        const project = await ProjectModel.findByIdAndUpdate(
            id,
            updateData,{
                new: true,
                runValidators: true
            }
        );

        if(!project){return res.status(404).json({message:'Project not found.'})}

        return res.status(200).json({
            success: true,
            message:'Project updated successfully.',
            project: project
        });

    }catch (error) {
        return res.status(500).json({
            success: false,
            message:'Server internal error.',
            error:error.message
        });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid ID format provided.'});
        }


        const project = await ProjectModel.findByIdAndDelete(id);
        if(!project) {
            return res.status(404).json({message: 'Project not found.'});
        }

        return res.status(200).json({
            success: true,
            message : "Project deleted successfully.",
            project: project
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server internal error.",
            error: error.message
        });
    }
}