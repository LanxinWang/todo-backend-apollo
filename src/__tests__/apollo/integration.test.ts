import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { readFileSync } from "fs";
import { TodosDataSource } from "../../apollo/datasources/todoDataSource";
import resolvers from "../../apollo/resolvers/index";
import { ITodo, TODO_STATUS } from "../../types/index";
import { jest } from "@jest/globals";

const typeDefs = readFileSync("schema.graphql", {
  encoding: "utf-8",
});
const todosAPI = new TodosDataSource();

// ensure our server's context is typed correctly
interface ContextValue {
  dataSources: {
    todosAPI: TodosDataSource;
  };
}

// create a test server to test against, using our production typeDefs,
// resolvers, and dataSources.
const testServer = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

describe("resolvers", () => {
  it("query todos", async () => {
    const mockTodos: ITodo[] = [
      {
        _id: 0,
        status: TODO_STATUS.ACTIVE,
        name: "todo 0",
      },
      {
        _id: 1,
        status: TODO_STATUS.ACTIVE,
        name: "todo 1",
      },
    ];
    const GET_TODOS = `
      query GetTodos {
        todos {
          _id
          name
          status
        }
      }
      `;
    // mock the dataSource's underlying fetch methods
    const mockGetTodosResponse: Promise<ITodo[]> = Promise.resolve(mockTodos);
    todosAPI.getTodos = jest.fn(() => mockGetTodosResponse);

    // run the query against the server and snapshot the output
    const res: GraphQLResponse<Record<string, ITodo[]>> =
      await testServer.executeOperation(
        {
          query: GET_TODOS,
        },
        {
          contextValue: {
            dataSources: {
              todosAPI,
            },
          },
        }
      );
    console.log("res:", res);
    // expect(res.body.singleResult.data?.todos).toEqual(mockTodos);
  });
});
