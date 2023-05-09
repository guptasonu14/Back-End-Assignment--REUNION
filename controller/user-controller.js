import express, { response } from "express";
import User from "../model/user";
import user from "../model/user";
import bcrypt from "bcryptjs"
export const getAllUser = async (req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No User Found"})
    }
    return res.status(200).json({users})
}
export const signup = async(req,res,next)=> {
    const { name,email,password,blogs} = req.body;

    let exitingUser;
    try{
       exitingUser = await user.findOne({email})
    }catch(err){
       return console.log(err);
    }
    if(exitingUser){
        return response.status(400).json({message: "User Already Exist! Login Instaed "})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user1 = new user({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
    try{
       await user1.save();
    }catch(err){
       return console.log(err);
    }
    return res.status(201).json({user1})
}
export const login = async(req,res,next) => {
    const {email,password } = req.body;
    let exitingUser;
    try{
       exitingUser = await user.findOne({email})
    }catch(err){
       return console.log(err);
    }
    if(!exitingUser){
        return response.status(400).json({message: "Don't find the user find this email Id"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,exitingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    } 
     return res.status(200).json({message:"Login Successfull"})
}