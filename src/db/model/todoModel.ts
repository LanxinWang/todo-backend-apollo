import * as mongoose from "mongoose";
import { todoSchema } from "../schema/todoSchema.js";
import {ITodo} from "../../types/index";

export const TodoModel = mongoose.model<ITodo>("Todo", todoSchema);
