import {Dispatch} from "redux";
import axios from "axios";
import {setAppErrorAC} from "app/appReducer";

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
    let errorMessage = "Some error occurred";

    if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage;

    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`;
    } else {
        errorMessage = JSON.stringify(err);
    }
    dispatch(setAppErrorAC(errorMessage))

};