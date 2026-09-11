import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        trim:true,
        required:true
    },
    description: {
        type:String,
        trim:true
    },
    status: {
        type:String,
        enum:['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    priority: {
        type:String,
        trim: true,
        enum:['low', 'medium', 'high'],
        default:'low'
    },
    project: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        index: true,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        index: true,
        required: true
    }
},{
    timestamps : true,
    collection: 'tasks'
});

const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;