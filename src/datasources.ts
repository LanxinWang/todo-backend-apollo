import { Todo, AddATodoMutationResponse, DeleteATodoMutationResponse, UpdateATodoStatusMutationResponse, UpdateAllTodosStatusMutationResponse, DeleteAllCompletedTodosMutationResponse, GetTodosQueryResponse, } from './__generated__/resolvers-types';
import { TodoService } from './service/todoService.js';

export class TodosDataSource {
    private _todoService: TodoService = new TodoService();

    async getTodos(): Promise<GetTodosQueryResponse> {
        return this._todoService.getAllTodos();
    };

    async addATodo(todo: Todo): Promise<AddATodoMutationResponse> {
        return this._todoService.addATodo(todo);
    };

    async deleteATodo(_id: Todo["_id"]): Promise<DeleteATodoMutationResponse> {
        return this._todoService.deleteATodoById(_id);
    };

    async updateATodoStatus(_id: Todo["_id"], isChecked: boolean): Promise<UpdateATodoStatusMutationResponse> {
        return this._todoService.updateATodoById(_id, isChecked);
    };

    async updateAllTodosStatus(updateIds:string[], isChecked: boolean): Promise<UpdateAllTodosStatusMutationResponse> {
        return this._todoService.updateAllTodos(updateIds, isChecked);
    };

    async deleteAllCompletedTodos(deletedIds:string[]): Promise<DeleteAllCompletedTodosMutationResponse> {
        return this._todoService.deleteAllCompletedTodos(deletedIds);
    };
}
