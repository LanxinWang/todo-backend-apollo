import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

export const todoSchema = new Schema ({
    _id: { type: String },
    status: { type: String },
    name: { type: String },
}, { versionKey: false})

