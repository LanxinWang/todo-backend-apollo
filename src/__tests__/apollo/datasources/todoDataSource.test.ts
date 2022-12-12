import { TodosDataSource } from "../../../apollo/datasources/todoDataSource";
import { TodoModel } from "../../../mongoose/model/todoModel";
import { ITodo } from "../../../types";

const mockTodos: ITodo[] = [
  { _id: 0, status: "active", name: "test 0" },
  { _id: 1, status: "completed", name: "test 1" },
];

const mockATodo: ITodo = { _id: 2, status: "active", name: "test 2" };

const mockADeletedTodo: ITodo = { _id: 2, status: "deleted", name: "test 2" };

const mockAUpdatedTodo: ITodo = { _id: 2, status: "completed", name: "test 2" };

const mockUpdatedTodos: ITodo[] = [
  { _id: 0, status: "active", name: "test 0" },
  { _id: 1, status: "completed", name: "test 1" },
];

const todoAPI = new TodosDataSource();
describe("test todoAPI.getTodos", () => {
  it("should get all todos when call getTodos function", async () => {
    TodoModel.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockImplementation((): ITodo[] => mockTodos.reverse()),
    });

    const todos = await todoAPI.getTodos();

    expect(TodoModel.find).toBeCalled();
    expect(todos).toEqual(mockTodos.reverse());
  });
});

describe("test todoAPI.findATodoById", () => {
  it("should return the todo when give a valid id", async () => {
    TodoModel.findById = jest.fn().mockReturnValue(mockATodo);

    const todo = await todoAPI.findATodoById(2);

    expect(TodoModel.findById).toBeCalledWith(2);
    expect(todo).toEqual(mockATodo);
  });

  it("should return null when give a invalid id", async () => {
    TodoModel.findById = jest.fn().mockReturnValue(null);

    const todo = await todoAPI.findATodoById(3);

    expect(TodoModel.findById).toBeCalledWith(3);
    expect(todo).toBeNull;
  });
});

describe("test todoAPI.addATodo", () => {
  it("should create a todo a valid todo ", async () => {
    TodoModel.create = jest.fn().mockReturnValue(mockATodo);

    const todo = await todoAPI.addATodo(mockATodo);

    expect(TodoModel.create).toBeCalledWith(mockATodo);
    expect(todo).toEqual(mockATodo);
  });
});

describe("test todoAPI.deleteATodo", () => {
  it("should update todo's status to delete when give a valid id", async () => {
    TodoModel.findById = jest.fn().mockReturnValue(mockATodo);
    TodoModel.findByIdAndUpdate = jest.fn().mockReturnValue(mockADeletedTodo);

    const todo = await todoAPI.deleteATodo(2);

    expect(todo).toEqual(mockADeletedTodo);
  });

  it("should return null when give a invalid id", async () => {
    TodoModel.findById = jest.fn().mockReturnValue(null);
    TodoModel.findByIdAndUpdate = jest.fn().mockReturnValue(mockADeletedTodo);

    const todo = await todoAPI.deleteATodo(3);

    expect(todo).toBeNull;
  });
});

describe("test todoAPI.updateATodoStatus", () => {
  it("should update todo's status to completed when give a valid id and isChecked is true", async () => {
    TodoModel.findById = jest.fn().mockReturnValue(mockATodo);
    TodoModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValueOnce(mockAUpdatedTodo);

    const todo = await todoAPI.updateATodoStatus(2, true);

    expect(TodoModel.findById).toBeCalledWith(2);
    expect(TodoModel.findByIdAndUpdate).toBeCalled();
    expect(todo).toEqual(mockAUpdatedTodo);
  });

  it("should update todo's status to active when give a valid id and isChecked is false", async () => {
    TodoModel.findById = jest.fn().mockReturnValue(mockAUpdatedTodo);
    TodoModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce(mockATodo);

    const todo = await todoAPI.updateATodoStatus(2, false);

    expect(TodoModel.findById).toBeCalledWith(2);
    expect(TodoModel.findByIdAndUpdate).toBeCalled();
    expect(todo).toEqual(mockATodo);
  });

  it("should return null when give a invalid id ", async () => {
    TodoModel.findById = jest.fn().mockReturnValue(null);
    TodoModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValueOnce(mockAUpdatedTodo);

    const todo = await todoAPI.updateATodoStatus(3, true);

    expect(TodoModel.findById).toBeCalledWith(3);
    expect(TodoModel.findByIdAndUpdate).not.toBeCalled();
    expect(todo).toBeNull;
  });
});

describe("test todoAPI.updateAllTodosStatus", () => {
  it("should return updated todos when given valid ids", async () => {
    TodoModel.updateMany = jest.fn().mockReturnValue(mockUpdatedTodos);
    TodoModel.find = jest.fn().mockReturnValue(mockUpdatedTodos);

    const todos = await todoAPI.updateAllTodosStatus([0, 1], true);

    expect(todos).toEqual(mockUpdatedTodos);
  });

  it("should return [] when given invalid ids", async () => {
    TodoModel.updateMany = jest.fn().mockReturnValue([]);
    TodoModel.find = jest.fn().mockReturnValue([]);

    const todos = await todoAPI.updateAllTodosStatus([4, 5], true);

    expect(todos).toEqual([]);
  });
});

describe("test todoAPI.deleteAllCompletedTodos", () => {
  it("should return deleted status todos when given valid ids", async () => {
    TodoModel.updateMany = jest.fn().mockReturnValue(mockTodos[1]);
    TodoModel.find = jest.fn().mockReturnValue(mockTodos[1]);

    const todos = await todoAPI.deleteAllCompletedTodos([1]);

    expect(todos).toEqual(mockTodos[1]);
  });

  it("should return [] when given invalid ids", async () => {
    TodoModel.updateMany = jest.fn().mockReturnValue([]);
    TodoModel.find = jest.fn().mockReturnValue([]);

    const todos = await todoAPI.deleteAllCompletedTodos([4, 5]);

    expect(todos).toEqual([]);
  });
});
