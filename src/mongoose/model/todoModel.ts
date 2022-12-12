import * as mongoose from "mongoose";
import { todoSchema } from "../schema/todoSchema";
import { ITodo } from "../../types/index";

export const TodoModel = mongoose.model<ITodo>("Todo", todoSchema);
