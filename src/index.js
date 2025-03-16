import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"; 
import { app } from "./app.js";


dotenv.config({
    path: './env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8080,()=>{
        console.log(`The app is listening to the port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MondgoDB Connection FAILED:!!!",err);
})
















/*
import express from 'express'
const app=express();

(async()=>{
    try {
         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
         app.on("error",(error)=>{
            console.log("Error",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`The App is listening to the port${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR",error)

    }
})()
    */