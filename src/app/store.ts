import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "features/todolistList/model/tasks/task-reducer";
import {todolistsReducer} from "features/todolistList/model/todolists/todolists-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "app/appReducer";
import {authReducer} from "features/auth/model/auth-reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispach = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
