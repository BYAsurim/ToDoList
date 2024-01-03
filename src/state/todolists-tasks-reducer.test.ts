import {AddTodoListAC, RemoveTodoListAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {taskReducer} from "./task-reducer";
import {StateTasksType} from "../App";

test('ids should be equals', () => {
    const startTasksState: StateTasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
test('property with todolistId should be deleted', () => {
    const startState: StateTasksType = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                addedDate: new Date(),
                order: 0,
                deadline: null,
                todoListId: 'todolistId1',
                description: null,
                priority: 1,
                status: 1,
                startDate: null

            },
            {
                id: '1',
                title: 'JS',
                addedDate: new Date(),
                order: 0,
                deadline: null,
                todoListId: 'todolistId1',
                description: null,
                priority: 1,
                status: 1,
                startDate: null

            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                addedDate: new Date(),
                order: 0,
                deadline: null,
                todoListId: 'todolistId1',
                description: null,
                priority: 1,
                status: 1,
                startDate: null

            },
            {
                id: '1',
                title: 'milk',
                addedDate: new Date(),
                order: 0,
                deadline: null,
                todoListId: 'todolistId1',
                description: null,
                priority: 1,
                status: 1,
                startDate: null

            }
        ]
    }

    const action = RemoveTodoListAC('todolistId2')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
