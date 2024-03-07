import {LoginDataType} from "../ui/Login";
import {instance} from "../../../common/api";
import {ResponseType} from '../../../common/types'

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post(`auth/login`, data)
    },
    me() {
        return instance.get<ResponseType<ResponseMeType>>(`auth/me`)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    }
}

//types

export type ResponseMeType = {
    id: number,
    email: string,
    login: string

}