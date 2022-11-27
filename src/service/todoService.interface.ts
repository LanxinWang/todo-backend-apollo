import { ITodo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<ITodo[]>;
    createATodo(todo: ITodo): Promise<ITodo |null>;
    updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null>;
    updateAllTodos(isChecked: boolean, updateIds: Number[]): Promise<ITodo[]>;
    deleteATodoById(_id: number): Promise<ITodo | null>;
    deleteAllCompletedTodos(deletedIds: Number[]): Promise<ITodo[]>;
}