import {StateTasksType} from "../App";

type ActionType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC>|
    ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (taskId: string, todoId: string) => {
    return {
        type: 'REMOVE-TASK',
        todoId,
        taskId
    } as const
}
export const addTaskAC = (title: string, todoId: string) => {
    return {
        type: 'ADD-TASK',
        todoId,
        title
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoId,
        taskId,
        isDone
    } as const
}
export const changeTaskTitleAC = (title: string, todoId: string, taskId:string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoId,
        title,
        taskId
    } as const
}


export const taskReducer = (state: StateTasksType, action: ActionType): StateTasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask = {id: 'taskId', title: action.title, isDone: false}
            return {...state, [action.todoId]: [newTask, ...state[action.todoId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todoId]:
                    state[action.todoId].map(t => t.id === action.taskId
                        ? {...t, isDone: action.isDone}
                        : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todoId]:
                    state[action.todoId].map(t=> t.id === action.taskId
                        ? {...t, title:action.title}
                        : t)}


        default:
            throw new Error('I don\'t understand this type')
    }
}
