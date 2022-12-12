import { ApolloServer } from "@apollo/server";
import { TodosDataSource as TodosDataAPI } from "./apollo/datasources/todoDataSource";
import { readFileSync } from "fs";
import resolvers from "./apollo/resolvers/index";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { connectDb } from "./mongoose/conn";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

export interface ContextValue {
  dataSources: {
    todosAPI: TodosDataAPI;
  };
}

const app = express();
const httpServer = http.createServer(app);
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer<ContextValue>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
  await server.start();
  connectDb();
};

startServer().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        return {
          dataSources: {
            todosAPI: new TodosDataAPI(),
          },
        };
      },
    })
  );
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
