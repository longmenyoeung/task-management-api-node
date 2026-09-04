import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        trim:true,
        required: true
    },
    email: {
        type:String,
        trim:true,
        unique: true,
        required:true,
    },
    password: {
        type:String,
        trim:true,
        min:8,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default : true
    },
    role:{
        type:String,
        trim:true,
        enum:['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps : true,
    collection : 'users'
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
