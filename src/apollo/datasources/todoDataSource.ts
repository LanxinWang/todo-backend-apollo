import { Todo } from "../../__generated__/resolvers-types";
import { TodoModel } from "../../mongoose/model/todoModel.js";
import { ITodo, TODO_STATUS } from "../../types/index.js";

export class TodosDataSource {
  async getTodos(): Promise<ITodo[]> {
    return await TodoModel.find({}).sort({ _id: -1 });
  }

  async addATodo(aTodo: Todo): Promise<ITodo> {
    return await TodoModel.create(aTodo);
  }

  async deleteATodo(_id: Todo["_id"]): Promise<ITodo> {
    const todo = (await this.findATodoById(_id)) as ITodo;
    await TodoModel.findByIdAndUpdate(_id, {
      $set: { status: TODO_STATUS.DELETED },
    });
    return todo;
  }

  async updateATodoStatus(
    _id: Todo["_id"],
    isChecked: boolean
  ): Promise<ITodo> {
    let todo = (await this.findATodoById(_id)) as ITodo;
    if (!todo || todo.status === "deleted") {
      return null;
    }
    await TodoModel.findByIdAndUpdate(_id, {
      $set: { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE },
    });
    todo = await this.findATodoById(_id);
    return todo;
  }

  async updateAllTodosStatus(
    updateIds: string[],
    isChecked: boolean
  ): Promise<ITodo[]> {
    let updateTodos: ITodo[] | [] = [];
    await TodoModel.updateMany(
      {
        _id: { $in: updateIds },
      },
      {
        $set: {
          status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE,
        },
      }
    );
    updateTodos = await TodoModel.find({ _id: { $in: updateIds } });
    return updateTodos;
  }

  async deleteAllCompletedTodos(deletedIds: string[]): Promise<ITodo[]> {
    let deletedTodos: ITodo[] | [] = [];
    await TodoModel.updateMany(
      {
        _id: { $in: deletedIds },
      },
      {
        $set: { status: TODO_STATUS.DELETED },
      }
    );
    deletedTodos = await TodoModel.find({ _id: { $in: deletedIds } });
    return deletedTodos;
  }

  async findATodoById(_id: Todo["_id"]): Promise<ITodo | null> {
    return await TodoModel.findById(_id);
  }
}
