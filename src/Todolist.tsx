import React, {ChangeEvent, useState} from 'react';
import {filterType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (taskId: string) => void
    changeFilter: (value: filterType) => void
    addTask: (title: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTastTitle] = useState('')

    const allClickHandler = () =>{props.changeFilter('all')}
    const activeClickHandler = () =>{props.changeFilter('active')}
    const completedClickHandler = () =>{props.changeFilter('completed')}
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewTastTitle(e.currentTarget.value)
    }
    const addTaskHandler = ()=>{
        props.addTask(newTaskTitle)
        setNewTastTitle('')
    }


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={onChangeHandler}/>
                    <button onClick={addTaskHandler}>+</button>
                </div>
                <ul>
                    {

                        props.tasks.map((t) => {
                            const deleteTasksClickHandler = () => {
                                props.deleteTask(t.id)
                            }

                            return (<li key={t.id}><input type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                                <button onClick={deleteTasksClickHandler}>X</button>
                            </li>)
                        })
                    }
                </ul>
                <div>
                    <button onClick={allClickHandler}>All</button>
                    <button onClick={activeClickHandler} >Active</button>
                    <button onClick={completedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};

