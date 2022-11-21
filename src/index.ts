import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Todo {
    _id: String
    status: String
    name: String
  }

  type Query {
    todos: [Todo]
  }
`;

const todos = [
    {
      _id: '0',
      status: 'active',
      name: 'todo 1',      
    },
    {
      _id: '1',
      status: 'completed',
      name: 'todo 2',
    }
  ];

const resolvers = {
    Query: {
      todos: () => todos,
    },
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);