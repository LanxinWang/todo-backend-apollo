import { AddATodoMutationResponse, DeleteAllCompletedTodosMutationResponse, DeleteATodoMutationResponse, GetTodosQueryResponse, Todo, UpdateAllTodosStatusMutationResponse, UpdateATodoStatusMutationResponse } from "__generated__/resolvers-types";
export interface todoServiceInterface {
    getAllTodos(): Promise<GetTodosQueryResponse>;
    addATodo(todo: Todo): Promise<AddATodoMutationResponse>;
    updateATodoById(_id: number, isChecked: boolean): Promise<UpdateATodoStatusMutationResponse>;
    updateAllTodos(updateIds: string[], isChecked: boolean,): Promise<UpdateAllTodosStatusMutationResponse>;
    deleteATodoById(_id: number): Promise<DeleteATodoMutationResponse>;
    deleteAllCompletedTodos(deletedIds: string[]): Promise<DeleteAllCompletedTodosMutationResponse>;
}