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