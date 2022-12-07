import { ApolloServer } from "@apollo/server";
import { TodosDataSource } from "../../apollo/datasources/todoDataSource";
import resolvers from "../../apollo/resolvers";
import { readFileSync } from "fs";

export const todosAPI = new TodosDataSource();

const typeDefs = readFileSync("schema.graphql", {
  encoding: "utf-8",
});
// ensure our server's context is typed correctly
interface ContextValue {
  dataSources: {
    todosAPI: TodosDataSource;
  };
}

// create a test server to test against, using our production typeDefs,
// resolvers, and dataSources.
export const testServer = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});
