import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType} from 'app/store';
import {todolistsReducer} from "state/todolists-reducer";
import {taskReducer} from "state/task-reducer";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {appReducer, RequestStatusType} from "app/appReducer";
import {authReducer} from "features/auth/auth-reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
const todolistId1 = v1()
const todolistId2 = v1()

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, entityStatus: "idle", addedDate: new Date()},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, entityStatus: "idle", addedDate: new Date()}
    ],
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
    },
    app: {
        status: 'loading' as RequestStatusType,
        error: null as string | null
    },
    auth:{
        isLoggedIn: false
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}