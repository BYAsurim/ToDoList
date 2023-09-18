import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterType} from "./App";
import s from './Todolist.module.css'

type PropsType = {
    title: string
    tasks: Array<TasksType>
    error: string
    setError: (error: string) => void
    deleteTask: (taskId: string) => void
    changeFilter: (value: filterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTastTitle] = useState('')

    const allClickHandler = () => {
        props.changeFilter('all')
    }
    const activeClickHandler = () => {
        props.changeFilter('active')
    }
    const completedClickHandler = () => {
        props.changeFilter('completed')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e) {
            setNewTastTitle(e.currentTarget.value)
        }
        // props.setError('')
    }
    const addTaskHandler = () => {
        props.addTask(newTaskTitle)
        setNewTastTitle('')
    }
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTastTitle('')
        }
    }


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={onChangeHandler}
                           onKeyPress={onKeyPressEnter}
                           className={props.error ?  s.errorInput : ''}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {props.error &&
                        <div className={s.error}>error</div>
                    }

                </div>
                <ul>
                    {

                        props.tasks.map((t) => {
                            const deleteTasksClickHandler = () => {
                                props.deleteTask(t.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatus = e.currentTarget.checked
                                props.changeTaskStatus(t.id, newStatus)
                            }

                            return (<li key={t.id}><input type="checkbox"
                                                          checked={t.isDone}
                                                          onChange={changeTaskStatusHandler}
                            />
                                <span>{t.title}</span>
                                <button onClick={deleteTasksClickHandler}>X</button>
                            </li>)
                        })
                    }
                </ul>
                <div>
                    <button onClick={allClickHandler}>All</button>
                    <button onClick={activeClickHandler}>Active</button>
                    <button onClick={completedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};

