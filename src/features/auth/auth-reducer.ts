import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "app/appReducer";
import {LoginDataType} from "features/auth/Login";
import {authAPI} from "api/todolist-api";
import {handleServerAppError} from "common/utils/handleServerAppError";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC('failed'))
        }

    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}
export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>
