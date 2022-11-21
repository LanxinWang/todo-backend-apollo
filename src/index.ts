import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { TodosDataSource } from 'datasources';
import { readFileSync } from 'fs';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export interface MyContext {
    dataSources: {
      todosAPI: TodosDataSource;
    }
  }

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