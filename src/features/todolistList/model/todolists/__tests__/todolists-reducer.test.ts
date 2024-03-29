import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    TodolistDomainType,
    todolistsReducer
} from '../todolists-reducer'
import {v1} from 'uuid'
import {filterType} from "../../../../../app/App";


let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[]
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, entityStatus: "idle", addedDate: new Date()},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, entityStatus: "idle", addedDate: new Date()}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const newTodoList = {
        id: 'todolistId3',
        title: 'title',
        filter: 'all',
        order: 0,
        addedDate: new Date()
    }

    const endState = todolistsReducer(startState, AddTodoListAC(newTodoList))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('title')
})
test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    let newFilter: filterType = 'completed'

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})



