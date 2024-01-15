import {filterType} from "../app/App";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../features/Application/appReducer";

type ActionType = ReturnType<typeof RemoveTodoListAC> |
    ReturnType<typeof AddTodoListAC> |
    ReturnType<typeof ChangeTodoListTitleAC> |
    ReturnType<typeof ChangeTodoListFilterAC> |
    SetTodolistsType

export type SetTodolistsType = ReturnType<typeof SetTodolistsAC>

export type TodolistDomainType = TodolistType & {
    filter: filterType
}

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({
                ...tl, filter: "all"
            }))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            // const newTodoList: TodolistDomainType = {
            //     id: action.todolistId,
            //     title: action.title,
            //     filter: 'all',
            //     order: 0,
            //     addedDate: new Date()
            // }
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state
    }
}

export const SetTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS' as const, todolists})
export const RemoveTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const AddTodoListAC = (todolist: TodolistType) => (
    {
        type: 'ADD-TODOLIST',
        todolist
    } as const)
export const ChangeTodoListTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)

export const ChangeTodoListFilterAC = (id: string, filter: filterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)

export const fetchTodolists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(SetTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })


}
export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.addTodolist(title)
        if(res.data.resultCode === 0){
            dispatch(AddTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        }else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        }

    } catch (e) {

    }
}
export const removeTodolistTC = (todolistID: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await todolistAPI.removeTodolist(todolistID)
        dispatch(RemoveTodoListAC(todolistID))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {

    }
}
export const updateTodolistTitleTC = (todolistID: string, title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await todolistAPI.upDateTodolistTitle(todolistID, title)
        dispatch(ChangeTodoListTitleAC(todolistID, title))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {

    }
}
