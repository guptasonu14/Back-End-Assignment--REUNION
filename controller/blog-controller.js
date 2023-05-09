import mongoose from "mongoose";
import Blog from "../model/Blog";
import user from "../model/user";
export const getAllBlogs = async(req,res,next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blogs})
}
export const addBlog = async(req, res, next)=>{
    const {title,description,image, user1} = req.body;
    let excitingUser;
    try{
      excitingUser = await user1.findById(user)
    }catch(err){
       return console.log(err);
    }
    if(!excitingUser){
        return res.status(400).json({message:"Unable to find the user by this id"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user1,
    });
    try{
    //   await blog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    excitingUser.blogs.push(blog);
    await excitingUser.save({session});
    await session.commitTransaction();
    }catch(err){
       console.log(err);
       return res.status(400).json({message:err})
    }
    return res.status(200).json({blog})
}
export const updateBlog = async(req,res,next) => {
    const {title,description}=req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
       })
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable To Update"})
    }
    return res.status(200).json({blog})
     
}
export const getById = async(req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
       blog = await Blog.findById(id)
    }catch(err){
       return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"});
    }
    return res.status(200).json({blog})
}

export const deleteBlog = async(req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
       blog = await Blog.findByIdAndRemove(id).populate('user1');
       await blog.user.blogs.pull(blog);
       await blog.user.save();
    }catch(err){
       return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable To Delete"})
    }
    return res.status(200).json({message:"Successfully Deleted"})
}

export const getUserById = async (req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
      userBlogs = await user.findById(userId).populate("blog");
    }catch(err){
      return console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No Blog Found"});
    }
    return res.status(200).json({blogs:userBlogs})
}