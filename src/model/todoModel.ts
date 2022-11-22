import * as mongoose from "mongoose";
import { todoSchema } from "../schema/todoSchema";
import {ITodo} from "../types/index";

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
