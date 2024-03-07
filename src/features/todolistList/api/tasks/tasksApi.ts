import {ResponseType} from '../../../../common/types'
import {instance} from "../../../../common/api";

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

//types
export  type ResponseTasksType = {
    items: Array<TasksType>,
    totalCount: number,
    error: string | null
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