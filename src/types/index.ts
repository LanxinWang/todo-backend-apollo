import { Document } from "mongoose";
export interface ITodo extends Document {
    _id: Number,
    status: string,
    name: string,
  }

export const TODO_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  DELETED: "deleted"
}