import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },
    blogs:[{type: mongoose.Types.ObjectId,ref:"Blog",required:true}]
});

export default mongoose.model("user",userSchema);
