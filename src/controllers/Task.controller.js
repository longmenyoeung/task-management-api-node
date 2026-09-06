import TaskModel from "../models/TaskModel.js";

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