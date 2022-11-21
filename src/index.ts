import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  type Todo {
    title: String
    author: String
  }

  case, the "Todos" query returns an array of zero or more Todos (defined above).
  type Query {
    Todos: [Todo]
  }
`;

const todos = [
    {
      _id: '0',
      name: 'todo 1',
      status: 'active',
      
    },
    {
      _id: '1',
      name: 'todo 2',
      status: 'completed'
      
    },
  ];