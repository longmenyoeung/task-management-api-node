import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

projectSchema.plugin(mongoosePaginate);
const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;