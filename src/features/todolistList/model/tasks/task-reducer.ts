import {StateTasksType} from "app/App";
import {AddTodoListAC, ClearTodolistsDataAC, RemoveTodoListAC, SetTodolistsType} from "../todolists/todolists-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "app/store";
import {setAppStatusAC} from "app/appReducer";
import {handleServerAppError} from "common/utils/handleServerAppError";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {tasksAPI, TasksType, UpdateDomainTaskModelType} from "../../api/tasks/tasksApi";
import {TaskStatuses} from "../../../../common/enums/common.enums";

type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof RemoveTodoListAC>
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof ClearTodolistsDataAC>


const initialState: StateTasksType = {}
export const taskReducer = (state = initialState, action: ActionType): StateTasksType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK': {
            return {
                ...state, [action.todoId]:
                    state[action.todoId].map(t => t.id === action.taskId
                        ? {...t, ...action.model}
                        : t
                    )
            }
        }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                return stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'CLEAR-TODOLISTS-DATA':
            return {}
        default:
            return state
    }
}
export const setTasksAC = (todolistId: string, tasks: Array<TasksType>) => ({
    type: 'SET-TASKS' as const,
    todolistId,
    tasks
})

export const removeTaskAC = (taskId: string, todoId: string) => ({
    type: 'REMOVE-TASK',
    todoId,
    taskId
} as const)

export const addTaskAC = (task: TasksType) => ({
    type: 'ADD-TASK',
    task
} as const)

export const updateTaskAC = (todoId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: 'UPDATE-TASK',
    todoId,
    taskId,
    model
} as const)


//thunk
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await tasksAPI.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        handleServerNetworkError(e, dispatch)
    }
}
export const removeTaskTC = (taskId: string, todoId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await tasksAPI.removeTask(todoId, taskId)
        dispatch(removeTaskAC(taskId, todoId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        handleServerNetworkError(e, dispatch)
    }
}
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await tasksAPI.addTasks(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        handleServerNetworkError(e, dispatch)
    }

}
type UpdateTaskModelType = {
    title?: string,
    description?: null,
    status?: TaskStatuses,
    priority?: number,
    deadline?: null,
    startDate?: null,
}
export const updateTaskTC = (todolistId: string, taskId: string, taskModel: UpdateTaskModelType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {

    try {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const updateTaskModel: UpdateDomainTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                deadline: task.deadline,
                startDate: task.startDate,
                ...taskModel
            }
            const res = await tasksAPI.upDateTask(todolistId, taskId, updateTaskModel)
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, res.data.data.item))
            } else {
                dispatch(setAppStatusAC('failed'))
                handleServerAppError(res.data, dispatch)
            }
        }
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        handleServerNetworkError(e, dispatch)
    }

}
