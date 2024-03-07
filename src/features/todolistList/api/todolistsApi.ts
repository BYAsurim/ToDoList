import {ResponseType} from '../../../common/types'
import {instance} from "../../../common/api";

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    removeTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    upDateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    }
}

// types
export type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}