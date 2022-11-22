import { Todo, AddATodoMutationResponse, DeleteATodoMutationResponse, UpdateATodoStatusMutationResponse, UpdateAllTodosStatusMutationResponse, DeleteAllCompletedTodosMutationResponse, } from './__generated__/resolvers-types';
import { TodoModel } from "./model/todoModel.js";
import { ITodo } from 'types';

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
        selectedTodo.status = "deleted";
        console.log("after delete todos:",this.todos);
        return {
            code: '200',
            success: true,
            message: 'deleted todo by id!',
            todo: selectedTodo,
        };
    }

    async updateATodoStatus(_id: Todo["_id"], isChecked: Boolean): Promise<UpdateATodoStatusMutationResponse> {
        const selectedTodo = await this.findATodoById(_id);
        if (!selectedTodo || selectedTodo.status === "deleted") {
            return {
                code: '200',
                success: true,
                message: 'there is no todo found by this id',
            };
        }
        selectedTodo.status = isChecked ? "completed" : "active";
        console.log("after update todos:",this.todos);
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

    async findATodoById(_id: Todo["_id"]): Promise<Todo | undefined> {
        const result = await this.todos.find(todo => todo._id === _id)
        return result
    }

}
