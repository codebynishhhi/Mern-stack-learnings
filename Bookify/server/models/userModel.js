import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passWord:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    
})

const UserModel = mongoose.model('User', UserSchema)
export default UserModel;

