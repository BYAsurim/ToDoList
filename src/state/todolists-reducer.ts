import {v1} from "uuid";
import {filterType, TodolistsType} from "../App";

type ActionType = ReturnType<typeof RemoveTodoListAC> |
    ReturnType<typeof AddTodoListAC> |
    ReturnType<typeof ChangeTodoListTitleAC> |
    ReturnType<typeof ChangeTodoListFilterAC>


const initialState: Array<TodolistsType> = [];

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistsType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state
    }
}

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
