import {StateTasksType} from "../App";
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";
import {v1} from "uuid";

type ActionType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof AddTodoListAC> |
    ReturnType<typeof RemoveTodoListAC>


const initialState: StateTasksType = {}
export const taskReducer = (state = initialState, action: ActionType): StateTasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask = {id: action.taskId, title: action.title, isDone: false}
            return {...state, [action.todoId]: [newTask, ...state[action.todoId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todoId]:
                    state[action.todoId].map(t => t.id === action.taskId
                        ? {...t, isDone: action.isDone}
                        : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todoId]:
                    state[action.todoId].map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let stateCopy = state
            delete stateCopy[action.id]
            return stateCopy

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoId: string) => ({
    type: 'REMOVE-TASK',
    todoId,
    taskId
} as const)

export const addTaskAC = (title: string, todoId: string) => ({
    type: 'ADD-TASK',
    todoId,
    title,
    taskId: v1()
} as const)

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    todoId,
    taskId,
    isDone
} as const)

export const changeTaskTitleAC = (title: string, todoId: string, taskId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todoId,
    title,
    taskId
} as const)

