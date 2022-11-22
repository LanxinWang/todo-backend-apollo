import { MutationResolvers } from '__generated__/resolvers-types';

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  Mutation: {
    // Below, we mock adding a new book. Our data set is static for this
    // example, so we won't actually modify our data.
    addATodo: async (_, { _id, status, name }, { dataSources }) => {
      return await dataSources.todosAPI.addATodo({ _id, status, name });
    },
    deleteATodo: async (_, { _id }, { dataSources }) => {
        return await dataSources.todosAPI.deleteATodo(_id);
      },
    deleteAllCompletedTodos: async (_, __, { dataSources }) => {
    return await dataSources.todosAPI.deleteAllCompletedTodos();
    },
    updateATodoStatus: async (_, { _id, isChecked }, { dataSources }) => {
        return await dataSources.todosAPI.updateATodoStatus(_id, isChecked);
      },
    updateAllTodosStatus: async (_, { updateIds, isChecked }, { dataSources }) => {
    return await dataSources.todosAPI.updateAllTodosStatus(updateIds, isChecked);
    },
  },
};

export default mutations;
