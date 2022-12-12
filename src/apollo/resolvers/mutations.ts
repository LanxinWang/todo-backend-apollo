import { MutationResolvers, Todo } from "../../__generated__/resolvers-types";

const mutations: MutationResolvers = {
  Mutation: {
    addATodo: (_, { _id, status, name }, { dataSources }): Promise<Todo> => {
      return dataSources.todosAPI.addATodo({ _id, status, name });
    },

    deleteATodo: (_, { _id }, { dataSources }): Promise<Todo> => {
      return dataSources.todosAPI.deleteATodo(_id);
    },

    deleteAllCompletedTodos: (
      _,
      { deletedIds },
      { dataSources }
    ): Promise<Todo[]> => {
      return dataSources.todosAPI.deleteAllCompletedTodos(deletedIds);
    },

    updateATodoStatus: (
      _,
      { _id, isChecked },
      { dataSources }
    ): Promise<Todo> => {
      return dataSources.todosAPI.updateATodoStatus(_id, isChecked);
    },

    updateAllTodosStatus: (
      _,
      { updateIds, isChecked },
      { dataSources }
    ): Promise<Todo[]> => {
      return dataSources.todosAPI.updateAllTodosStatus(updateIds, isChecked);
    },
  },
};

export default mutations;
