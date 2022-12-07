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
    const res = await testServer.executeOperation(
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

    expect(res.body.kind).toBe("single");
    if (res.body.kind === "single") {
      expect(res.body.singleResult.errors).toEqual(undefined);
      expect(res.body.singleResult.data.todos).toEqual(mockTodos);
    }
  });

  it("mutation add a todo", async () => {
    const mockATodo: ITodo = {
      _id: 0,
      status: TODO_STATUS.ACTIVE,
      name: "todo 0",
    };
    const ADD_A_TODO = gql`
      mutation AddATodo($id: Int!, $status: String!, $name: String!) {
        addATodo(_id: $id, status: $status, name: $name) {
          _id
          status
          name
        }
      }
    `;
    const mockAddATodoResponse: ITodo = mockATodo;
    todosAPI.addATodo = jest.fn(() => Promise.resolve(mockAddATodoResponse));

    const res = await testServer.executeOperation(
      {
        query: ADD_A_TODO,
        variables: {
          id: mockATodo._id,
          name: mockATodo.name,
          status: mockATodo.status,
        },
      },
      {
        contextValue: {
          dataSources: {
            todosAPI,
          },
        },
      }
    );

    expect(res.body.kind).toBe("single");
    if (res.body.kind === "single") {
      expect(res.body.singleResult.data.addATodo).toEqual(mockATodo);
      expect(res.body.singleResult.errors).toEqual(undefined);
    }
  });
});
