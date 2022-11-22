import { AddTodoMutationResponse, Todo } from './__generated__/resolvers-types';

export class TodosDataSource {
  todos: { _id: string; status: string; name: string }[] = [
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

  getTodos(): Todo[] {
    // simulate fetching a list of Todos
    return this.todos;
  };

  async addTodo(todo: Todo): Promise<AddTodoMutationResponse> {
    this.todos.push(todo);
    console.log(this.todos);

    return {
      code: '200',
      success: true,
      message: 'New todo added!',
      todo: this.todos[this.todos.length - 1],
    };
  }

}
