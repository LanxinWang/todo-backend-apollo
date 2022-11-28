import { ApolloServer } from '@apollo/server';
import { TodosDataSource as TodosDataAPI } from './apollo/datasources.js';
import { readFileSync } from 'fs';
import resolvers from './apollo/resolvers/index.js';
import { connectDb } from './mongoose/conn.js';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
const typeDefs = readFileSync('src/apollo/schema.graphql', { encoding: 'utf-8' });

export interface ContextValue {
    dataSources: {
      todosAPI: TodosDataAPI;
    }
  }

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

connectDb();

await server.start();
app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async () => {
      return {
        dataSources: {
          todosAPI: new TodosDataAPI(),
        }
      }
    }
  }),
);

app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);