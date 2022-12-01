import { ApolloServer, GraphQLResponse } from '@apollo/server';
import { readFileSync } from 'fs';
import { TodosDataSource as TodosDataAPI } from '../../apollo/datasources/todoDataSource.js';
import resolvers from '../../apollo/resolvers/index.js';
import { ITodo, TODO_STATUS } from '../../types/index.js';

const typeDefs = readFileSync('src/apollo/schema.graphql', { encoding: 'utf-8' }); 
const todosAPI = new TodosDataAPI(); 
  
// ensure our server's context is typed correctly
interface ContextValue {
  dataSources: {
    todosAPI: TodosDataAPI;
  }
}
  
// create a test server to test against, using our production typeDefs,
// resolvers, and dataSources.
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

describe("resolvers", () => {
  it('query get todos', async () => {
    const mockTodos:ITodo[] = 
        [
        {
          _id: 0,
          status: TODO_STATUS.ACTIVE,
          name: "todo 0"
        },
        {
          _id: 1,
          status: TODO_STATUS.ACTIVE,
          name: "todo 1"
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
    const  mockGetTodosResponse: Promise<ITodo[]> = new Promise(resolve => mockTodos );
    todosAPI.getTodos = jest.fn(() => mockGetTodosResponse);
  
    // run the query against the server and snapshot the output
    const res: GraphQLResponse<Record<string,ITodo[]>> = await server.executeOperation(
      {
        query: GET_TODOS,
      },
      {
        contextValue: {
          dataSources: {
            todosAPI,
          },
        },
      },
    );
    // expect(res.body.kind.data?.todos).toEqual(mockTodos);
  });
})
