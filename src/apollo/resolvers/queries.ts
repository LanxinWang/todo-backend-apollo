import { QueryResolvers } from "__generated__/resolvers-types";

const queries: QueryResolvers = {
  Query: {
    todos: (_, __, { dataSources }) => {
      return dataSources.todosAPI.F();
    },
  },
};

export default queries;
