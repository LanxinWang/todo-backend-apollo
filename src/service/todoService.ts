import { AddATodoMutationResponse, GetTodosQueryResponse, Todo } from "__generated__/resolvers-types.js";
import { TodoModel } from "../db/model/todoModel.js";
import { ITodo, TODO_STATUS } from "../types/index.js";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    async getAllTodos(): Promise<GetTodosQueryResponse> {
        let todos: Todo[]| [] = [];
        try {
            todos = await TodoModel.find({}).sort({ _id: -1 });
            return {
                    code: '200',
                    success: true,
                    message: 'get all todos',
                    todo: todos,
            };
        } catch (error) {
            throw new Error("error:getAllTodos");
        }
    }

    async addATodo(aTodo: Todo): Promise<AddATodoMutationResponse> {
        let todo: Todo| null = null; 
        try {
            todo = await TodoModel.create(aTodo);
            return {
                code: '200',
                success: true,
                message: 'New todo added!',
                todo: todo,
            };
        } catch (error) {
            throw new Error("DataBase operation error: add a todo");
        }
    }

    async updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null > {
        let todo: ITodo| null = null;
        try {
            await TodoModel.findByIdAndUpdate(
                _id, 
                { $set: { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE } 
            });
            todo = await TodoModel.findById(_id);
        } catch (error) {
            throw new Error("error:updateATodoById");
        }
        return todo;
    }

    async updateAllTodos(isChecked: boolean, updateIds: Number[] ): Promise<ITodo[]> {
        let todos: ITodo[] = [];
        try {
            await TodoModel.updateMany({
                _id: {$in: updateIds}
            },
            {
                $set: 
                    { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE }
            });
            todos = await TodoModel.find({_id: {$in: updateIds}});    
        } catch (error) {
            throw new Error("error:updateAllTodos");
        }
        return todos;
    }

    async deleteATodoById(_id: number): Promise<ITodo | null> {
        let todo: ITodo | null = null;
        try {
            await TodoModel.findByIdAndUpdate({
                 _id  }, 
                { $set: { status: TODO_STATUS.DELETED } 
            });
            todo = await TodoModel.findById(_id);
        } catch (error) {
            throw new Error("error:deleteATodoById");
        }
        return todo;
    }

    async deleteAllCompletedTodos(deletedIds: Number[]): Promise<ITodo[]> {
        let todos: ITodo[] = [];
        try {
            await TodoModel.updateMany({
                _id: {$in: deletedIds}
            },
            {
                $set: 
                    { status: TODO_STATUS.DELETED }
            });
            todos = await TodoModel.find({_id: {$in: deletedIds}});
        } catch (error) {
            throw new Error("error:deleteAllCompletedTodos");
        }
        return todos;
    }
}