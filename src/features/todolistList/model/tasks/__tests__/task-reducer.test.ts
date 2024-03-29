import {addTaskAC, removeTaskAC, taskReducer, updateTaskAC} from '../task-reducer'
import {AddTodoListAC} from '../../todolists/todolists-reducer'
import {StateTasksType} from "../../../../../app/App";


let startState: StateTasksType;
beforeEach(() => {
    startState = {
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
                id: '2',
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
                id: '2',
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
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: '1',
        title: 'juce',
        addedDate: new Date(),
        order: 0,
        deadline: null,
        todoListId: 'todolistId1',
        description: null,
        priority: 1,
        status: 1,
        startDate: null

    })

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')

})
test('status of specified task should be changed', () => {
    const modelTask = {
        id: '2',
        title: 'milk',
        addedDate: new Date(),
        order: 0,
        deadline: null,
        todoListId: 'todolistId2',
        description: null,
        priority: 1,
        status: 1,
        startDate: null

    }

    const action = updateTaskAC('todolistId2', '2', modelTask)

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('milk')
    expect(endState['todolistId2'].length).toBe(3)
})


test('new array should be added when new todolist is added', () => {
    const newTodoList = {
        id: 'todolistId3',
        title: 'title',
        filter: 'all',
        order: 0,
        addedDate: new Date()
    }

    const action = AddTodoListAC(newTodoList)

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
