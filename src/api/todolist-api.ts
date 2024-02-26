import axios from 'axios'
import {LoginDataType} from "features/auth/Login";


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
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    removeTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    upDateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    }
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    addTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TasksType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    upDateTask(todolistId: string, taskId: string, model: UpdateDomainTaskModelType) {
        return instance.put<ResponseType<{ item: TasksType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post(`auth/login`, data)
    },
    me() {
        return instance.get<ResponseType<ResponseMeType>>(`auth/me`)
    },
    logout(){
        return instance.delete<ResponseType>(`auth/login`)
    }

}

export type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}
export type ResponseType<D = {}> = {
    data: D,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    resultCode: number
}
export  type ResponseTasksType = {
    items: Array<TasksType>,
    totalCount: number,
    error: string | null
}
export type ResponseMeType = {
    id: number,
    email: string,
    login: string

}
export type TasksType = {
    id: string,
    title: string,
    description: null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: null,
    deadline: null,
    addedDate: Date
}
export type UpdateDomainTaskModelType = {
    title: string,
    description: null,
    status: number,
    priority: number,
    deadline: null,
    startDate: null,
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
