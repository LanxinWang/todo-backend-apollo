import { Todo, AddATodoMutationResponse, DeleteATodoMutationResponse, } from './__generated__/resolvers-types';

export class TodosDataSource {
    todos: Todo[] = [
        {
            _id: '0',
            status: 'active',
            name: 'todo 1',
        },
        {
            _id: '1',
            status: 'completed',
            name: 'todo 2',
        },
        ];

    getTodos() {
        // simulate fetching a list of Todos
        console.log("get todos:", this.todos);
        return this.todos;
        };

    async addATodo(todo: Todo): Promise<AddATodoMutationResponse> {
        this.todos.push(todo);
        console.log("after push todos:",this.todos);
        return {
            code: '200',
            success: true,
            message: 'New todo added!',
            todo: todo,
        };
    };

    async deleteATodo(_id: Todo["_id"]): Promise<DeleteATodoMutationResponse> {
        let selectedTodo = await this.findATodoById(_id);
        if (!selectedTodo) {
            return {
                code: '200',
                success: true,
                message: 'there is no todo found by this id',
            };
        }
        selectedTodo.status = "deleted";
        console.log("after delete todos:",this.todos);
        return {
            code: '200',
            success: true,
            message: 'deleted todo by id!',
            todo: selectedTodo,
        };
    }

    async findATodoById(_id: Todo["_id"]): Promise<Todo | undefined> {
        const result = await this.todos.find(todo => todo._id === _id)
        return result
    }

}
