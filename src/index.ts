import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { TodosDataSource } from './datasources.js';
import { readFileSync } from 'fs';
import resolvers from './resolvers/index.js';
import { connectDb } from './db/conn.js';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export interface MyContext {
    dataSources: {
      todosAPI: TodosDataSource;
    }
  }

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

connectDb;

const { url } = await startStandaloneServer(server,{
  context: async () => {
    return {
      dataSources: {
        todosAPI: new TodosDataSource(),
      }
    }
  }
});

  
console.log(`Server ready at: ${url}`);