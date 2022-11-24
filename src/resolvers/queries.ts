import { QueryResolvers } from '__generated__/resolvers-types';

const queries: QueryResolvers = {
  Query: {
    getTodos: async (_, __, contextValue) => {
      return await contextValue.dataSources.todosAPI.getTodos();
    },
  },
};

export default queries;
