import { ITodo, TODO_STATUS } from "../../types/index";
import { jest } from "@jest/globals";
import gql from "graphql-tag";
import { testServer, todosAPI } from "../utils/testServer";

describe("integration", () => {
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

  it("mutation delete a todo", async () => {
    const mockATodo: ITodo = {
      _id: 0,
      status: TODO_STATUS.DELETED,
      name: "todo 0",
    };
    const DELETE_A_TODO = gql`
      mutation DeleteATodo($id: Int!) {
        deleteATodo(_id: $id) {
          _id
          status
          name
        }
      }
    `;
    const mockDeleteATodoResponse: ITodo = mockATodo;
    todosAPI.deleteATodo = jest.fn(() =>
      Promise.resolve(mockDeleteATodoResponse)
    );

    const res = await testServer.executeOperation(
      {
        query: DELETE_A_TODO,
        variables: {
          id: mockATodo._id,
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
      expect(res.body.singleResult.data.deleteATodo).toEqual(mockATodo);
      expect(res.body.singleResult.errors).toEqual(undefined);
    }
  });

  it("mutation delete all completed todos", async () => {
    const mockTodos: ITodo[] = [
      {
        _id: 0,
        status: TODO_STATUS.COMPLETED,
        name: "todo 0",
      },
      {
        _id: 1,
        status: TODO_STATUS.ACTIVE,
        name: "todo 1",
      },
    ];
    const mockDeletedAllCompletedTodos: ITodo[] = [
      {
        _id: 0,
        status: TODO_STATUS.DELETED,
        name: "todo 0",
      },
      {
        _id: 1,
        status: TODO_STATUS.ACTIVE,
        name: "todo 1",
      },
    ];
    const DELETE_ALL_COMPLETED_TODOS = gql`
      mutation DeleteAllCompletedTodos($deletedIds: [Int]!) {
        deleteAllCompletedTodos(deletedIds: $deletedIds) {
          _id
          status
          name
        }
      }
    `;
    const mockDeleteAllCompletedTodoResponse: ITodo[] = [
      mockDeletedAllCompletedTodos[0],
    ];
    todosAPI.deleteAllCompletedTodos = jest.fn(() =>
      Promise.resolve(mockDeleteAllCompletedTodoResponse)
    );

    const res = await testServer.executeOperation(
      {
        query: DELETE_ALL_COMPLETED_TODOS,
        variables: {
          deletedIds: [mockTodos[0]._id],
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
      expect(res.body.singleResult.data.deleteAllCompletedTodos).toEqual([
        mockDeletedAllCompletedTodos[0],
      ]);
      expect(res.body.singleResult.errors).toEqual(undefined);
    }
  });

  it("mutation update a todo", async () => {
    const mockATodo: ITodo = {
      _id: 0,
      status: TODO_STATUS.ACTIVE,
      name: "todo 0",
    };
    const mockAUpdatedTodo: ITodo = {
      _id: 0,
      status: TODO_STATUS.COMPLETED,
      name: "todo 0",
    };
    const UPDATE_A_TODO = gql`
      mutation UpdateATodoById($id: Int!, $isChecked: Boolean!) {
        updateATodoStatus(_id: $id, isChecked: $isChecked) {
          _id
          status
          name
        }
      }
    `;
    const mockUpdateATodoResponse: ITodo = mockAUpdatedTodo;
    todosAPI.updateATodoStatus = jest.fn(() =>
      Promise.resolve(mockUpdateATodoResponse)
    );

    const res = await testServer.executeOperation(
      {
        query: UPDATE_A_TODO,
        variables: {
          id: mockATodo._id,
          isChecked: true,
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
      expect(res.body.singleResult.data.updateATodoStatus).toEqual(
        mockAUpdatedTodo
      );
      expect(res.body.singleResult.errors).toEqual(undefined);
    }
  });

  it("mutation update all todos", async () => {
    const mockTodos: ITodo[] = [
      {
        _id: 0,
        status: TODO_STATUS.COMPLETED,
        name: "todo 0",
      },
      {
        _id: 1,
        status: TODO_STATUS.ACTIVE,
        name: "todo 1",
      },
    ];
    const mockUpdatedAllTodos: ITodo[] = [
      {
        _id: 0,
        status: TODO_STATUS.COMPLETED,
        name: "todo 0",
      },
      {
        _id: 1,
        status: TODO_STATUS.COMPLETED,
        name: "todo 1",
      },
    ];
    const UPDATE_ALL_TODOS = gql`
      mutation UpdateAllTodosStatus($updateIds: [Int]!, $isChecked: Boolean!) {
        updateAllTodosStatus(updateIds: $updateIds, isChecked: $isChecked) {
          _id
          status
          name
        }
      }
    `;

    const mockUpdatedAllTodoResponse: ITodo[] = mockUpdatedAllTodos;
    todosAPI.updateAllTodosStatus = jest.fn(() =>
      Promise.resolve(mockUpdatedAllTodoResponse)
    );

    const res = await testServer.executeOperation(
      {
        query: UPDATE_ALL_TODOS,
        variables: {
          updateIds: [mockTodos[0]._id, mockTodos[1]._id],
          isChecked: true,
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
      expect(res.body.singleResult.data.updateAllTodosStatus).toEqual(
        mockUpdatedAllTodos
      );
      expect(res.body.singleResult.errors).toEqual(undefined);
    }
  });
});
