import {StateTasksType} from "../App";
import {AddTodoListAC, RemoveTodoListAC, SetTodolistsType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {tasksAPI, TaskStatuses, TasksType, UpdateDomainTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "./store";

type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof RemoveTodoListAC>
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>


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
            // const newTask: TasksType = {
            //     id: action.taskId,
            //     title: action.title,
            //     addedDate: new Date(),
            //     order: 0,
            //     deadline: null,
            //     todoListId: action.todoId,
            //     description: null,
            //     priority: 1,
            //     status: 1,
            //     startDate: null
            //
            // }
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        // case 'CHANGE-TASK-STATUS':
        //     return {
        //         ...state, [action.todoId]:
        //             state[action.todoId].map(t => t.id === action.taskId
        //                 ? {...t, isDone: action.isDone}
        //                 : t)
        //     }
        // case 'CHANGE-TASK-TITLE':
        //     return {
        //         ...state, [action.todoId]:
        //             state[action.todoId].map(t => t.id === action.taskId
        //                 ? {...t, title: action.title}
        //                 : t)
        //     }
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

// export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoId: string) => ({
//     type: 'CHANGE-TASK-STATUS',
//     todoId,
//     taskId,
//     isDone
// } as const)
//
// export const changeTaskTitleAC = (title: string, todoId: string, taskId: string) => ({
//     type: 'CHANGE-TASK-TITLE',
//     todoId,
//     title,
//     taskId
// } as const)

export const updateTaskAC = (todoId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: 'UPDATE-TASK',
    todoId,
    taskId,
    model
} as const)


//thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const removeTaskTC = (taskId: string, todoId: string) => async (dispatch: Dispatch) => {
    try {
        await tasksAPI.removeTask(todoId, taskId)
        dispatch(removeTaskAC(taskId, todoId))
    } catch (e) {

    }
}
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
        const res = await tasksAPI.addTasks(todolistId, title)
        dispatch(addTaskAC(res.data.data.item))
    } catch (e) {

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
            dispatch(updateTaskAC(todolistId, taskId, res.data.data.item))

        }
    } catch (e) {

    }

}
