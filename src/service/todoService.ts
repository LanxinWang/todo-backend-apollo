import { AddATodoMutationResponse, DeleteAllCompletedTodosMutationResponse, DeleteATodoMutationResponse, GetTodosQueryResponse, Todo, UpdateAllTodosStatusMutationResponse, UpdateATodoStatusMutationResponse } from "__generated__/resolvers-types.js";
import { TodoModel } from "../mongoose/model/todoModel.js";
import { TODO_STATUS } from "../types/index.js";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    async getAllTodos(): Promise<GetTodosQueryResponse> {
        let todos: Todo[]| [] = [];
        try {
            todos = await TodoModel.find({}).sort({ _id: -1 }).exec();
            return {
                    code: '200',
                    message: 'get all todos',
                    todo: todos,
            };
        } catch (error) {
            throw new Error("DataBase operation error: fail getting all todos");
        };
    };

    async addATodo(aTodo: Todo): Promise<AddATodoMutationResponse> {
        let todo: Todo| null = null; 
        try {
            todo = await TodoModel.create(aTodo);
            return {
                code: '200',
                message: 'New todo added!',
                todo: todo,
            };
        } catch (error) {
            throw new Error("DataBase operation error: add a todo");
        };
    };

    async updateATodoById(_id: number, isChecked: boolean): Promise<UpdateATodoStatusMutationResponse > {
        let selectedTodo = await this.findATodoById(_id);
        if (!selectedTodo || selectedTodo.status === "deleted") {
            return {
                code: '200',
                message: 'there is no todo found by this id',
            };
        };
        try {
            await TodoModel.findByIdAndUpdate(
                _id, 
                { $set: { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE } 
            });
            selectedTodo = await this.findATodoById(_id);
            return {
                code: '200',
                message: 'update todo status by id!',
                todo: selectedTodo,
            };
        } catch (error) {
            throw new Error("DataBase operation error: update a todo status by id");
        };
    };

    async updateAllTodos(updateIds: String[], isChecked: boolean, ): Promise<UpdateAllTodosStatusMutationResponse> {
        let updateTodos: Todo[] | [] = [];
        try {
            await TodoModel.updateMany({
                _id: {$in: updateIds}
            },
            {
                $set: 
                    { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE }
            });
            updateTodos = await TodoModel.find({_id: {$in: updateIds}}); 
            return {
                code: '200',
                message: 'update todo status by id!',
                todo: updateTodos,
            };   
        } catch (error) {
            throw new Error("DataBase operation error: update all todos status");
        };
    }

    async deleteATodoById(_id: number): Promise<DeleteATodoMutationResponse> {
        let selectedTodo = await this.findATodoById(_id);   
        if (!selectedTodo) {
            return {
                code: '200',
                message: 'there is no todo found by this id',
            };
        };
        try {
            await TodoModel.findByIdAndUpdate(
                _id, 
                { $set: { status: TODO_STATUS.DELETED} 
            });
            selectedTodo = await this.findATodoById(_id);
            return {
                code: '200',
                message: 'deleted todo by id!',
                todo: selectedTodo,
            };
        } catch (error) {
            throw new Error("DataBase operation error: delete a todo by id");
        };
    };

    async deleteAllCompletedTodos(deletedIds: string[]): Promise<DeleteAllCompletedTodosMutationResponse> {
        let deletedTodos: Todo[] | [] = [];
        try {
            await TodoModel.updateMany({
                _id: {$in: deletedIds}
            },
            {
                $set: 
                    { status: TODO_STATUS.DELETED }
            });
            deletedTodos = await TodoModel.find({_id: {$in: deletedIds}});
            return {
                code: '200',
                message: 'delete all completed todos',
                todo: deletedTodos,
            };
        } catch (error) {
            throw new Error("DataBase operation error: delete all completed todos");
        };
    };

    async findATodoById(_id: Todo["_id"]): Promise<Todo | null> {
        let todo: Todo | null = null;
        try {
            todo = await TodoModel.findById(_id);
        return todo;
        } catch (error) {
            throw new Error("error:deleteATodoById");
        };
    };
}