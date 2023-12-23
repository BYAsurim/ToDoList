import React, {ChangeEvent, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolistsHandler = () => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }


    return <>
        <button onClick={getTodolistsHandler}> get todolist</button>

        <div>{JSON.stringify(state)}</div>
    </>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('')

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTodolistHandler = () => {
        todolistAPI.addTodolist(title)
            .then((res) => {
                setState(res.data.data)
            })
        setTitle('')
    }

    return <>
        <input onChange={handleTitleChange} value={title} style={{marginRight: '10px'}}/>
        <button onClick={addTodolistHandler}>add todolist</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')

    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }
    const deleteTodolistHandler = async () => {
        const res = await todolistAPI.removeTodolist(id)
        setState(res.data)
        setId('')
    }

    return <>
        <input onChange={handleIdChange} style={{marginRight: '10px'}} value={id}/>
        <button onClick={deleteTodolistHandler}>delete todolist</button>
        <div>{JSON.stringify(state)}</div>
    </>


}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const deleteTodolistHandler = async () => {
        const res = await todolistAPI.upDateTodolistTitle(id, title)
        setState(res.data)
        setId('')
        setTitle('')
    }

    return <>
        <input onChange={handleIdChange} style={{marginRight: '10px'}} value={id} placeholder={'todoId'}/>
        <input onChange={handleTitleChange} style={{marginRight: '10px'}} value={title} placeholder={'new todo title'}/>
        <button onClick={deleteTodolistHandler}>update todolist title</button>

        <div>{JSON.stringify(state)}</div>
    </>


}

