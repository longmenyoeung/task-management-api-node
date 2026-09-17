import mongoose from "mongoose";
import ProjectModel from "../models/ProjectModel.js";
import ApiError from "../utils/ApiError.js";



export const createProject = async (req, res, next) => {
    try {
        const data = {
            name: req.body.name, 
            description: req.body.description, 
            owner:req.user._id
        }

        const project = await ProjectModel.create(data);


        return res.status(201).json({
            success: true,
            message: 'Project created successfully.',
            project:project
        });

    } catch (error) {
        next(error);
    }
}

export const getListProject = async (req, res, next) => {
    try {
        // const projects = await ProjectModel.find({})
        //                                     .populate('owner', 'username email')
                                            
        // if(projects.length===0){return res.json({message:'Project is empty.'})}
        // let query ={};


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
 
        const projects = await ProjectModel.paginate(
            {}, 
            {
                page, 
                limit,
                populate: {path :'owner', select: 'username email'}
            }
        );

        return res.status(200).json({
            success: true,
            // appliedFilters: query,
            ...projects
        })

    } catch (error) {
       next(error);
    }
}

export const updateProject = async (req, res, next) => {
    try {
        const {id} = req.params;
       
        const updateData = {
            name :req.body.name,
            description: req.body.description,
            owner:req.user._id.toString()
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
           throw new ApiError(400, "Invalid ID format provided.");
        }

        const project = await ProjectModel.findById(id).populate('owner');

        if(!project){
            throw new ApiError(404, "Project not found.")
        }   

        if(updateData.owner !== project.owner._id.toString()){
            throw new ApiError(403, "Only user whos created in this project can update.")
        }

        //update data
        project.name = updateData.name;
        project.description = updateData.description;
        await project.save();


        return res.status(200).json({
            success: true,
            message:'Project updated successfully.',
            project: project
        });

    }catch (error) {
        next(error)
    }
}

export const deleteProject = async (req, res, next) => {
    try {
        const {id} = req.params;
       

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ApiError(400, "Invalid ID format provided.");
        }

 
        const project = await ProjectModel.findById(id);
           if(!project) {
            throw new ApiError(404, "Project not found")
        }

        if(project.owner._id.toString() !== req.user._id.toString()){
            throw new ApiError(403, "You are not authorized to delete this project.")
        }

        //delete project 
        await project.deleteOne();

        return res.status(200).json({
            success: true,
            message : "Project deleted successfully.",
            project: project
        });


    } catch (error) {
        next(error);
    }
}