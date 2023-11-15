import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
