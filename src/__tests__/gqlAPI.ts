
export const GET_TODOS = `
query GetTodos {
    getTodos {
        code
        todo {
          _id
          name
          status
        }
    }
}
`;

export const ADD_A_TODO = `
mutation AddATodo($id: Int!, $status: String!, $name: String!) {
    addATodo(_id: $id, status: $status, name: $name) {
        code
        message
        todo {
            _id
            status
            name
        }
    }
}
`;

export const DELETE_A_TODO =  `
mutation DeleteATodo($id: Int!) {
    deleteATodo(_id: $id) {
        code
        message
        todo {
            _id
            status
            name
        }
    }
}

`

export const DELETE_ALL_COMPLETED_TODOS =  `
mutation DeleteAllCompletedTodos( $deletedIds: [Int]!) {
    deleteAllCompletedTodos(deletedIds: $deletedIds) {
        code
        message
        todo {
            _id
            status
            name
        }
    }
}
`

export const UPDATE_A_TODO =  `
mutation UpdateATodoById($id: Int!, $isChecked: Boolean!) {
    updateATodoStatus(_id: $id, isChecked: $isChecked) {
        code
        message
        todo {
            _id
            status
            name
        }
    }
}
`

export const UPDATE_ALL_TODOS =  `
mutation UpdateAllTodosStatus( $updateIds: [Int]!, $isChecked: Boolean!) {
    updateAllTodosStatus(updateIds: $updateIds, isChecked: $isChecked) {
        code
        message
        todo {
            _id
            status
            name
        }
    }
}
`
