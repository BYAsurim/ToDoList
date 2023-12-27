import React, {ChangeEvent, useState} from 'react'
import {tasksAPI, todolistAPI} from "../api/todolist-api";

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
    const [state, setState] = useState<any>(null)
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
    const updateTodolistHandler = async () => {
        const res = await todolistAPI.upDateTodolistTitle(id, title)
        setState(res.data)
        setId('')
        setTitle('')
    }

    return <>
        <input onChange={handleIdChange} style={{marginRight: '10px'}} value={id} placeholder={'todoId'}/>
        <input onChange={handleTitleChange} style={{marginRight: '10px'}} value={title} placeholder={'new todo title'}/>
        <button onClick={updateTodolistHandler}>update todolist title</button>

        <div>{JSON.stringify(state)}</div>
    </>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')

    const getTaskHandler = () => {
        tasksAPI.getTasks(id)
            .then((res) => {
                setState(res.data)
            })
    }
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    return <>
        <input onChange={handleIdChange} style={{marginRight: '10px'}} value={id} placeholder={'todoId'}/>
        <button onClick={getTaskHandler}> get tasks</button>

        <div>{JSON.stringify(state)}</div>
    </>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [id, setId] = useState<string>('')
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }
    const addTaksHandler = () => {
        tasksAPI.addTasks(id, title)
            .then((res) => {
                setState(res.data.data)
            })
        setTitle('')
    }

    return <>
        <input onChange={handleIdChange} value={id} style={{marginRight: '10px'}} placeholder={'todoId'}/>
        <input onChange={handleTitleChange} value={title} style={{marginRight: '10px'}} placeholder={'task title'}/>
        <button onClick={addTaksHandler}>add task</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const handleTodoIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value)
    }
    const handleTaskIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const deleteTaskHandler = async () => {
        const res = await tasksAPI.removeTask(todoId, taskId)
        setState(res.data)
        setTodoId('')
        setTaskId('')
    }

    return <>
        <input onChange={handleTodoIdChange} style={{marginRight: '10px'}} value={todoId} placeholder={'todoId'}/>
        <input onChange={handleTaskIdChange} style={{marginRight: '10px'}} value={taskId} placeholder={'taskId'}/>
        <button onClick={deleteTaskHandler}>delete task</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const handleTodoIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value)
    }
    const handleTaskIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const updateTaskHandler = async () => {
        const res = await tasksAPI.upDateTaskTitle(todoId, taskId, title)
        setState(res.data)
        setTodoId('')
        setTaskId('')
        setTitle('')
    }

    return <>
        <input onChange={handleTodoIdChange} style={{marginRight: '10px'}} value={todoId} placeholder={'todoId'}/>
        <input onChange={handleTaskIdChange} style={{marginRight: '10px'}} value={taskId} placeholder={'taskId'}/>
        <input onChange={handleTitleChange} style={{marginRight: '10px'}} value={title} placeholder={'task title'}/>
        <button onClick={updateTaskHandler}>update task</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
