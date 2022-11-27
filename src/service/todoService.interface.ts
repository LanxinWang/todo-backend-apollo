import { AddATodoMutationResponse, GetTodosQueryResponse } from "__generated__/resolvers-types";
import { ITodo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<GetTodosQueryResponse>;
    addATodo(todo: ITodo): Promise<AddATodoMutationResponse>;
    updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null>;
    updateAllTodos(isChecked: boolean, updateIds: Number[]): Promise<ITodo[]>;
    deleteATodoById(_id: number): Promise<ITodo | null>;
    deleteAllCompletedTodos(deletedIds: Number[]): Promise<ITodo[]>;
}