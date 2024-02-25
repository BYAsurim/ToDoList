import {Dispatch} from "redux";
import {setAppErrorAC} from "app/appReducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC("Some error occurred"));
    }
};

export type ResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>;
    data: D;
};