import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type : String,
        trim:true,
        required:true
    },
    description: {
        type: String,
        trim:true
    },
    owner :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true
    },
    createdAt :{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true,
    collection: 'projects'
});

const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;