import { Todo, AddATodoMutationResponse, DeleteATodoMutationResponse, UpdateATodoStatusMutationResponse, UpdateAllTodosStatusMutationResponse, DeleteAllCompletedTodosMutationResponse, GetTodosQueryResponse, } from './__generated__/resolvers-types';
import { TodoModel } from "./db/model/todoModel.js";
import { TODO_STATUS } from './types/index.js';
import { TodoService } from './service/todoService.js';

export class TodosDataSource {
    private _todoService: TodoService = new TodoService();

    async getTodos(): Promise<GetTodosQueryResponse> {
        return this._todoService.getAllTodos()
        };

    async addATodo(todo: Todo): Promise<AddATodoMutationResponse> {
        return this._todoService.addATodo(todo);

    };

    async deleteATodo(_id: Todo["_id"]): Promise<DeleteATodoMutationResponse> {
        let selectedTodo = await this.findATodoById(_id);   
        if (!selectedTodo) {
            return {
                code: '200',
                success: true,
                message: 'there is no todo found by this id',
            };
        }
        try {
            await TodoModel.findByIdAndUpdate(
                _id, 
                { $set: { status: TODO_STATUS.DELETED} 
            });
            selectedTodo = await this.findATodoById(_id);
        } catch (error) {
            throw new Error("DataBase operation error: delete a todo by id");
        }
        return {
            code: '200',
            success: true,
            message: 'deleted todo by id!',
            todo: selectedTodo,
        };
    }

    async updateATodoStatus(_id: Todo["_id"], isChecked: Boolean): Promise<UpdateATodoStatusMutationResponse> {
        let selectedTodo = await this.findATodoById(_id);
        if (!selectedTodo || selectedTodo.status === "deleted") {
            return {
                code: '200',
                success: true,
                message: 'there is no todo found by this id',
            };
        }
        try {
            await TodoModel.findByIdAndUpdate(
                _id, 
                { $set: { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE } 
            });
            selectedTodo = await this.findATodoById(_id);
        } catch (error) {
            throw new Error("DataBase operation error: update a todo status by id");
        }
        return {
            code: '200',
            success: true,
            message: 'update todo status by id!',
            todo: selectedTodo,
        };
    }

    async updateAllTodosStatus(updateIds:string[], isChecked: Boolean): Promise<UpdateAllTodosStatusMutationResponse> {
        let updateTodos: Todo[] | null = null;
        try {
            await TodoModel.updateMany({
                _id: {$in: updateIds}
            },
            {
                $set: 
                    { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE }
            });
            updateTodos = await TodoModel.find({_id: {$in: updateIds}});    
        } catch (error) {
            throw new Error("DataBase operation error: update all todos status");
        }
        return {
            code: '200',
            success: true,
            message: 'update todo status by id!',
            todo: updateTodos,
        };
    }

    async deleteAllCompletedTodos(deletedIds:string[]): Promise<DeleteAllCompletedTodosMutationResponse> {
        let deletedTodos: Todo[] | null = null;
        try {
            await TodoModel.updateMany({
                _id: {$in: deletedIds}
            },
            {
                $set: 
                    { status: TODO_STATUS.DELETED }
            });
            deletedTodos = await TodoModel.find({_id: {$in: deletedIds}});
        } catch (error) {
            throw new Error("DataBase operation error: delete all completed todos");
        }
        return {
            code: '200',
            success: true,
            message: 'delete all completed todos',
            todo: deletedTodos,
        };
    }

    async findATodoById(_id: Todo["_id"]): Promise<Todo | null> {
        let todo: Todo | null = null;
        try {
            todo = await TodoModel.findById(_id);
        } catch (error) {
            throw new Error("error:deleteATodoById");
        }
        return todo;
    }

}
