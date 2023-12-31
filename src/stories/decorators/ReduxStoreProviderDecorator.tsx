import React from 'react'
import { Provider } from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {todolistsReducer} from "../../state/todolists-reducer";
import {taskReducer} from "../../state/task-reducer";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})
const todolistId1 = v1()
const todolistId2 = v1()

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all',order:0, addedDate: new Date()},
        {id: todolistId2, title: 'What to buy', filter: 'all', order:0, addedDate: new Date() }
    ] ,
    tasks: {
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
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}