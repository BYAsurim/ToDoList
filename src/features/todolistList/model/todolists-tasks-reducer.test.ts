import {AddTodoListAC, RemoveTodoListAC, TodolistDomainType, todolistsReducer} from "./todolists/todolists-reducer";
import {taskReducer} from "./tasks/task-reducer";
import {StateTasksType} from "../../../app/App";

test('ids should be equals', () => {
    const startTasksState: StateTasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []
    const newTodoList = {
        id: 'todolistId3',
        title: 'title',
        filter: 'all',
        order: 0,
        addedDate: new Date()
    }
    const action = AddTodoListAC(newTodoList)

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
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
