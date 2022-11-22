import { MutationResolvers } from '__generated__/resolvers-types';

const mutations: MutationResolvers = {
  Mutation: {
    addATodo: async (_, { _id, status, name }, { dataSources }) => {
      return await dataSources.todosAPI.addATodo({ _id, status, name });
    },
    deleteATodo: async (_, { _id }, { dataSources }) => {
        return await dataSources.todosAPI.deleteATodo(_id);
      },
    deleteAllCompletedTodos: async (_, {deletedIds}, { dataSources }) => {
    return await dataSources.todosAPI.deleteAllCompletedTodos(deletedIds);
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
