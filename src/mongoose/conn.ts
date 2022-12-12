import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });
const { URI } = process.env;

export const connectDb = () =>
  mongoose.connect(
    URI,
    { useNewUrlParser: true } as mongoose.ConnectOptions,
    (err: Error) => {
      if (err) throw new Error("connect failed");
      console.log("connect successfully");
    }
  );
