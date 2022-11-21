// Use our automatically generated Todo and AddTodoMutationResponse types
// for type safety in our data source class

export class TodosDataSource {
  // Our example static data set
  Todos: { _id: string; status: string; name: string }[] = [
    {
      _id: '0',
      name: 'todo 1',
      status: 'active',
      
    },
    {
      _id: '1',
      name: 'todo 2',
      status: 'completed'
      
    },
  ];

  getTodos() {
    // simulate fetching a list of Todos
    return this.Todos;
  }

}
