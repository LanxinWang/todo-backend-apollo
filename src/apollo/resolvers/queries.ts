import { QueryResolvers } from '__generated__/resolvers-types';

const queries: QueryResolvers = {
  Query: {
    todos: (_, __, contextValue) => {
      return contextValue.dataSources.todosAPI.getTodos();
    },
  },
};

export default queries;
