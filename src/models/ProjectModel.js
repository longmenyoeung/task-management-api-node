import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import TaskModel from "./TaskModel.js";

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
    }
},{
    timestamps: true,
    collection: 'projects'
});

 // 'this' is the document instance, so this._id is the target projectId
projectSchema.pre('deleteOne', { document: true, query: false }, async function() {
    await TaskModel.deleteMany({ projectId: this._id });
});

projectSchema.plugin(mongoosePaginate);
const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;