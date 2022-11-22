import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config({path: "./config.env"});
const {ATLAS_URI} = process.env;

export const connectDb =  mongoose.connect(
    ATLAS_URI, 
    {useNewUrlParser: true} as mongoose.ConnectOptions, 
    (err: Error) => {
        if(err) throw new Error("connect failed");
        console.log('connect successfully');
});