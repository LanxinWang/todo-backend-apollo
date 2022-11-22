import { Todo, AddATodoMutationResponse, DeleteATodoMutationResponse, UpdateATodoStatusMutationResponse, UpdateAllTodosStatusMutationResponse, DeleteAllCompletedTodosMutationResponse, } from './__generated__/resolvers-types';
import { TodoModel } from "./model/todoModel.js";
import { ITodo, TODO_STATUS } from './types/index.js';

export class TodosDataSource {
    todos: Todo[] = [
        {
            _id: '0',
            status: 'active',
            name: 'todo 1',
        },
        {
            _id: '1',
            status: 'completed',
            name: 'todo 2',
        },
        {
            _id: '1',
            status: 'deleted',
            name: 'todo 2',
        },
        ];

    async getTodos() {
        let todos: ITodo[] = [];
        try {
            todos = await TodoModel.find({}).sort({ _id: -1 });
        } catch (error) {
            throw new Error("error:getAllTodos");
        }
        return todos;
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

    async updateAllTodosStatus(isChecked: Boolean): Promise<UpdateAllTodosStatusMutationResponse> {
        const updateTodos = this.todos.filter(todo => {
            if(todo.status !== "deleted" ) {
                todo.status = isChecked ? "completed" : "active";
            }
            return todo;
        })
        console.log("after update all todos:", this.todos);
        return {
            code: '200',
            success: true,
            message: 'update todo status by id!',
            todo: updateTodos,
        };
    }

    async deleteAllCompletedTodos(): Promise<DeleteAllCompletedTodosMutationResponse> {
        const deleteTodos = this.todos.filter(todo => {
            if(todo.status === "completed" ) {
                todo.status = "deleted";
            }
            return todo;
        })
        console.log("after delete all completed todos:", this.todos);
        return {
            code: '200',
            success: true,
            message: 'delete all completed todos',
            todo: deleteTodos,
        };
    }

    async findATodoById(_id: Todo["_id"]): Promise<Todo | null> {
        // const result = await this.todos.find(todo => todo._id === _id)
        let todo: Todo | null = null;
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

}
