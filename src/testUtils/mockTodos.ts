
import { ITodo, TODO_STATUS } from '../types/index.js'
import { Todo} from '../__generated__/resolvers-types.js'

export function getMockTodos(): ITodo[] {
  return [
    {
      _id: 0,
      status: TODO_STATUS.ACTIVE,
      name: "todo 0"
    },
    {
      _id: 1,
      status: TODO_STATUS.ACTIVE,
      name: "todo 1"
    },
  ]
}