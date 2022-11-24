import { Todo, AddATodoMutationResponse, DeleteATodoMutationResponse, UpdateATodoStatusMutationResponse, UpdateAllTodosStatusMutationResponse, DeleteAllCompletedTodosMutationResponse, GetTodosQueryResponse, } from './__generated__/resolvers-types';
import { TodoModel } from "./model/todoModel.js";
import { ITodo, TODO_STATUS } from './types/index.js';

export class TodosDataSource {

    async getTodos(): Promise<GetTodosQueryResponse> {
        let todos: ITodo[] = [];
        try {
            todos = await TodoModel.find({}).sort({ _id: -1 });
        } catch (error) {
            throw new Error("error:getAllTodos");
        }
        return {
            code: '200',
            success: true,
            message: 'get all todos',
            todo: todos,
            };
        };

    async addATodo(todo: Todo): Promise<AddATodoMutationResponse> {
        try {
            todo = await TodoModel.create(todo);
        } catch (error) {
            throw new Error("DataBase operation error: add a todo");
        }
        return {
            code: '200',
            success: true,
            message: 'New todo added!',
            todo: todo,
        };
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
            await TodoModel.findByIdAndUpdate({
                 _id  }, 
                { $set: { status: TODO_STATUS.DELETED } 
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
        let updateTodos = null;
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
        // const result = await this.todos.find(todo => todo._id === _id)
        let todo: Todo | null = null;
        try {
            todo = await TodoModel.findById(_id);
        } catch (error) {
            throw new Error("error:deleteATodoById");
        }
        return todo;
    }

}
