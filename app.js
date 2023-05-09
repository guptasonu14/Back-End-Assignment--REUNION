import express from "express";
import mongoose from 'mongoose'
import router from "./routes/user-route";
import blogrouter from "./routes/blog-route";
const app = express();
app.use(express.json());
app.use("/api/blog",blogrouter)//https://localhost:5050/api/blog/
app.use("/api/user",router) //https://localhost:5050/api/user/logo

mongoose
.connect('mongodb+srv://Admin:LUFNTsGdED3mptYY@cluster0.blj2z7r.mongodb.net/Blog?retryWrites=true&w=majority')
.then(() => app.listen(5050)).then(() =>

 console.log("Connected to the database and listening to the localhost 5050")

).catch((err) => console.log(err))

