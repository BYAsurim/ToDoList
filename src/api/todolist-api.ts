import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e7e3f008-e2dc-4435-835d-1184d4097cbd',
    },
})

export const todolistAPI = {
    getTodolists() {
        return instance.get('todo-lists')
    },
    addTodolist(title:string){
        return instance.post('todo-lists', {title} )
    },
    removeTodolist(id:string){
        return instance.delete(`todo-lists/${id}`)
    },
    upDateTodolistTitle(id:string, title:string){
        return instance.put(`todo-lists/${id}`, {title})
    }
}