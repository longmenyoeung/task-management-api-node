import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        trim:true,
        require:true
    },
    description: {
        type:String,
        trim:true
    },
    status: {
        type:String,
        enum:['pending', 'dilivered', 'approved'],
        default: 'pending'
    },
    priority: {
        type:String,
        trim: true,
        require: true
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
    },
    createAt :{
        type: Date,
        default : Date.now
    }
},{
    timestamps : true,
    collection: 'tasks'
});

const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;