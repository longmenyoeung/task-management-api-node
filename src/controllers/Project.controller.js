import mongoose from "mongoose";
import ProjectModel from "../models/ProjectModel.js";



export const createProject = async (req, res) => {
    try {
        const data = {
            name: req.body.name, 
            description: req.body.description, 
            owner:req.user._id
        }

        // if(!mongoose.Types.ObjectId.isValid(data.owner)){
        //     return res.status(400).json({message: "Invalid User ID format provided."})
        // }


        // const ownerId = await UserModel.findById(data.owner);
        // if(!ownerId){
        //     return res.status(404).json({
        //         success: false,
        //         message: 'User ID not found or Invalid User ID.'
        //     });
        // }

        const project = await ProjectModel.create(data);


        return res.status(201).json({
            success: true,
            message: 'Project created successfully.',
            project:project
        });

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message:'createProject failed. please try again.',
                // error:error.message 
            }
        );
    }
}

export const getListProject = async (req, res) => {
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
        return res.status(500).json(
            {   
                success: false,
                message: "get all projects failed. please try again.",
                // error:error.message
            })
    }
}

export const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
       
        const updateData = {
            name :req.body.name,
            description: req.body.description,
            owner:req.user._id.toString()
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format provided.'
            });
        }

        const project = await ProjectModel.findById(id).populate('owner');

        if(!project){
            return res.status(404).json({message: 'Project not found.'});
        }   

        if(updateData.owner !== project.owner._id.toString()){
            return res.status(403).json({success: false, message: "Only user whos created in this project can update."})
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
        return res.status(500).json({
            success: false,
            message:'updateProject failed. please try again.',
            // error:error.message
        });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;
       

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid ID format provided.'});
        }

 
        const project = await ProjectModel.findById(id);
           if(!project) {
            return res.status(404).json({message: 'Project not found.'});
        }

        if(project.owner._id.toString() !== req.user._id.toString()){
            return res.status(400).json({success: false, message: "Only user whos created in this project can delete."})
        }

        //delete project 
        await project.deleteOne();

        return res.status(200).json({
            success: true,
            message : "Project deleted successfully.",
            project: project
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "deleteProject failed. please try again.",
            // error: error.message
        });
    }
}