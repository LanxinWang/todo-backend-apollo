import mongoose from "mongoose";
import { TodoModel as Todo } from "../../mongoose/model/todoModel";
import { clearDB, closeDB, connectDB } from "../utils/db";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

afterEach(async () => {
  await clearDB();
});
describe("Todo", () => {
  it("should create a todo item successfully", async () => {
    const validTodo = {
      _id: 0,
      status: "active",
      name: "test 1",
    };
    const newTodo = new Todo(validTodo);
    await newTodo.save();
    expect(newTodo._id).toBeDefined();
    expect(newTodo.name).toBe(validTodo.name);
    expect(newTodo.status).toBe(validTodo.status);
  });

  it("should throw error when create a todo item failed", async () => {
    const invalidTodo = {
      _id: 0,
      status: "active",
    };
    try {
      const newTodo = new Todo(invalidTodo);
      await newTodo.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.name).toBeDefined();
    }
  });

  it("should fail when todo item with fields of wrong type", async () => {
    let invalidTodo = {
      _id: 0,
      status: "active",
      name: 1,
    };
    try {
      const newTodo = new Todo(invalidTodo);
      await newTodo.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.name).toBeDefined();
    }
  });

  it("should delete update a todo status", async () => {});
});
