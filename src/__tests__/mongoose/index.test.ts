import { TodosDataSource } from "../../apollo/datasources/todoDataSource.js";
import { ITodo } from "../../types/index.js";

const db = require("./db");

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const todosDataSource = new TodosDataSource();
describe("todoApp database test ", () => {
  it("should add a todo ", async (done) => {
    const mockTodo: ITodo = { _id: 0, status: "active", name: "test" };
    const result = await todosDataSource.addATodo(mockTodo);

    expect(result._id).toBe(mockTodo._id);
    expect(result.status).toBe(mockTodo.status);
    expect(result.name).toBe(mockTodo.name);
    done();
  });
});
