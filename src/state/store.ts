import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatchType =ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispach = useDispatch<AppDispatchType>;

// @ts-ignore
window.store = store
