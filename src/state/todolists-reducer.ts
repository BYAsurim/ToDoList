import {v1} from "uuid";
import {filterType} from "../App";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

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
            const newTodoList: TodolistDomainType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                order: 0,
                addedDate: new Date()
            }
            return [...state, newTodoList]
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
export const AddTodoListAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
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
    todolistAPI.getTodolists()
        .then(res => dispatch(SetTodolistsAC(res.data)))

}
