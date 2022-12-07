import { ITodo, TODO_STATUS } from "../../types/index";
import { jest } from "@jest/globals";
import gql from "graphql-tag";
import { testServer, todosAPI } from "../utils/testServer";

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
    const GET_TODOS = gql`
      query GetTodos {
        todos {
          _id
          name
          status
        }
      }
    `;
    // mock the dataSource's getTodos methods
    const mockGetTodosResponse: ITodo[] = mockTodos;
    todosAPI.getTodos = jest.fn(() => Promise.resolve(mockGetTodosResponse));

    // run the query against the server and snapshot the output
    const res: any = await testServer.executeOperation(
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

    expect(res.body.singleResult.data.todos).toEqual(mockTodos);
  });
});
