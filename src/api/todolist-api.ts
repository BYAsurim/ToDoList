import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e7e3f008-e2dc-4435-835d-1184d4097cbd',
    },
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>>('todo-lists', {title})
    },
    removeTodolist(id: string) {
        return instance.delete<ResponseTodolistType<{}>>(`todo-lists/${id}`)
    },
    upDateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseTodolistType<{}>>(`todo-lists/${id}`, {title})
    }
}

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type ResponseTodolistType<D> = {
    data: D,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    resultCode: number
}