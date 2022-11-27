import { GraphQLResolveInfo } from 'graphql';
import { ContextValue } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddATodoMutationResponse = {
  __typename?: 'AddATodoMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  todo?: Maybe<Todo>;
};

export type DeleteATodoMutationResponse = {
  __typename?: 'DeleteATodoMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  todo?: Maybe<Todo>;
};

export type DeleteAllCompletedTodosMutationResponse = {
  __typename?: 'DeleteAllCompletedTodosMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  todo?: Maybe<Array<Maybe<Todo>>>;
};

export type GetTodosQueryResponse = {
  __typename?: 'GetTodosQueryResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  todo?: Maybe<Array<Maybe<Todo>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addATodo?: Maybe<AddATodoMutationResponse>;
  deleteATodo?: Maybe<DeleteATodoMutationResponse>;
  deleteAllCompletedTodos?: Maybe<DeleteAllCompletedTodosMutationResponse>;
  updateATodoStatus?: Maybe<UpdateATodoStatusMutationResponse>;
  updateAllTodosStatus?: Maybe<UpdateAllTodosStatusMutationResponse>;
};


export type MutationAddATodoArgs = {
  _id: Scalars['Int'];
  name: Scalars['String'];
  status: Scalars['String'];
};


export type MutationDeleteATodoArgs = {
  _id: Scalars['Int'];
};


export type MutationDeleteAllCompletedTodosArgs = {
  deletedIds: Array<InputMaybe<Scalars['Int']>>;
};


export type MutationUpdateATodoStatusArgs = {
  _id: Scalars['Int'];
  isChecked: Scalars['Boolean'];
};


export type MutationUpdateAllTodosStatusArgs = {
  isChecked: Scalars['Boolean'];
  updateIds: Array<InputMaybe<Scalars['Int']>>;
};

export type Query = {
  __typename?: 'Query';
  getTodos?: Maybe<GetTodosQueryResponse>;
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['Int'];
  name: Scalars['String'];
  status: Scalars['String'];
};

export type UpdateATodoStatusMutationResponse = {
  __typename?: 'UpdateATodoStatusMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  todo?: Maybe<Todo>;
};

export type UpdateAllTodosStatusMutationResponse = {
  __typename?: 'UpdateAllTodosStatusMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  todo?: Maybe<Array<Maybe<Todo>>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddATodoMutationResponse: ResolverTypeWrapper<AddATodoMutationResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DeleteATodoMutationResponse: ResolverTypeWrapper<DeleteATodoMutationResponse>;
  DeleteAllCompletedTodosMutationResponse: ResolverTypeWrapper<DeleteAllCompletedTodosMutationResponse>;
  GetTodosQueryResponse: ResolverTypeWrapper<GetTodosQueryResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Todo: ResolverTypeWrapper<Todo>;
  UpdateATodoStatusMutationResponse: ResolverTypeWrapper<UpdateATodoStatusMutationResponse>;
  UpdateAllTodosStatusMutationResponse: ResolverTypeWrapper<UpdateAllTodosStatusMutationResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddATodoMutationResponse: AddATodoMutationResponse;
  Boolean: Scalars['Boolean'];
  DeleteATodoMutationResponse: DeleteATodoMutationResponse;
  DeleteAllCompletedTodosMutationResponse: DeleteAllCompletedTodosMutationResponse;
  GetTodosQueryResponse: GetTodosQueryResponse;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Todo: Todo;
  UpdateATodoStatusMutationResponse: UpdateATodoStatusMutationResponse;
  UpdateAllTodosStatusMutationResponse: UpdateAllTodosStatusMutationResponse;
}>;

export type AddATodoMutationResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['AddATodoMutationResponse'] = ResolversParentTypes['AddATodoMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteATodoMutationResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['DeleteATodoMutationResponse'] = ResolversParentTypes['DeleteATodoMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteAllCompletedTodosMutationResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['DeleteAllCompletedTodosMutationResponse'] = ResolversParentTypes['DeleteAllCompletedTodosMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todo?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetTodosQueryResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['GetTodosQueryResponse'] = ResolversParentTypes['GetTodosQueryResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todo?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addATodo?: Resolver<Maybe<ResolversTypes['AddATodoMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddATodoArgs, '_id' | 'name' | 'status'>>;
  deleteATodo?: Resolver<Maybe<ResolversTypes['DeleteATodoMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteATodoArgs, '_id'>>;
  deleteAllCompletedTodos?: Resolver<Maybe<ResolversTypes['DeleteAllCompletedTodosMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteAllCompletedTodosArgs, 'deletedIds'>>;
  updateATodoStatus?: Resolver<Maybe<ResolversTypes['UpdateATodoStatusMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateATodoStatusArgs, '_id' | 'isChecked'>>;
  updateAllTodosStatus?: Resolver<Maybe<ResolversTypes['UpdateAllTodosStatusMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateAllTodosStatusArgs, 'isChecked' | 'updateIds'>>;
}>;

export type QueryResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getTodos?: Resolver<Maybe<ResolversTypes['GetTodosQueryResponse']>, ParentType, ContextType>;
}>;

export type TodoResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateATodoStatusMutationResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['UpdateATodoStatusMutationResponse'] = ResolversParentTypes['UpdateATodoStatusMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateAllTodosStatusMutationResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['UpdateAllTodosStatusMutationResponse'] = ResolversParentTypes['UpdateAllTodosStatusMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todo?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ContextValue> = ResolversObject<{
  AddATodoMutationResponse?: AddATodoMutationResponseResolvers<ContextType>;
  DeleteATodoMutationResponse?: DeleteATodoMutationResponseResolvers<ContextType>;
  DeleteAllCompletedTodosMutationResponse?: DeleteAllCompletedTodosMutationResponseResolvers<ContextType>;
  GetTodosQueryResponse?: GetTodosQueryResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  UpdateATodoStatusMutationResponse?: UpdateATodoStatusMutationResponseResolvers<ContextType>;
  UpdateAllTodosStatusMutationResponse?: UpdateAllTodosStatusMutationResponseResolvers<ContextType>;
}>;

