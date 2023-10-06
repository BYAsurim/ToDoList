import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterType, TasksType} from "./App";
import s from './Todolist.module.css'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id:string
    title: string
    tasks: Array<TasksType>
    // error: string
    // setError: (error: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: filterType,todolistId: string) => void
    addTask: (todolistId:string,title: string) => void
    changeTaskStatus: (todolistId:string,taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId:string,taskId: string, title: string) => void
    changeTodoListTitle:(todolistId:string,title: string)=> void
    filter:filterType;
    removeTodoList: (todolistId:string) => void
}



export const Todolist = (props: PropsType) => {

    // const [newTaskTitle, setNewTastTitle] = useState('')

    const allClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const activeClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const completedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e) {
    //         setNewTastTitle(e.currentTarget.value)
    //     }
    //     // props.setError('')
    // }
    const addTaskHandler = (newTaskTitle:string) => {
        props.addTask(props.id ,newTaskTitle)
        // setNewTastTitle('')
    }
    // const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         props.addTask(props.id ,newTaskTitle)
    //         setNewTastTitle('')
    //     }
    // }
    const removeTodoListHandler = ()=>{
    props.removeTodoList(props.id)
    }
    const changeTaskTitleHandler = (taskId: string, title: string)=>{
        props.changeTaskTitle(props.id, taskId, title)
    }
    const changeTodoListTitle = (title:string)=>{
        props.changeTodoListTitle(props.id, title)
    }


    return (
        <div>
            <div>
                <div className={s.todoTitle}>
                {/*<h3>{props.title}</h3>*/}
                   <h3> <EditableSpan title={props.title} onClick={changeTodoListTitle}/></h3>
                <button onClick={removeTodoListHandler}>x</button>
                </div>
                <div>
                    {/*<input value={newTaskTitle} onChange={onChangeHandler}*/}
                    {/*       onKeyPress={onKeyPressEnter}*/}
                    {/*       className={props.error ?  s.errorInput : ''}*/}
                    {/*/>*/}
                    <AddItemForm  addTaskHandler={addTaskHandler} />
                    {/*<button onClick={addTaskHandler}>+</button>*/}
                    {/*{props.error &&*/}
                    {/*    <div className={s.error}>error</div>*/}
                    {/*}*/}

                </div>
                <ul>
                    {

                        props.tasks.map((t) => {
                            const deleteTasksClickHandler = () => {
                                props.deleteTask(props.id ,t.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatus = e.currentTarget.checked
                                props.changeTaskStatus(props.id ,t.id, newStatus)
                            }
                            const RenameTaskTitle = ()=>{

                            }

                            return (<li key={t.id} className={t.isDone ? s.isDone : ''}>
                                <input type="checkbox"
                                                          checked={t.isDone}
                                                          onChange={changeTaskStatusHandler}
                            />
                                {/*<span>{t.title}</span>*/}
                                <EditableSpan title={t.title} onClick={(title:string)=>{changeTaskTitleHandler(t.id,title)}}/>
                                <button onClick={deleteTasksClickHandler}>X</button>
                            </li>)
                        })
                    }
                </ul>
                <div>
                    <button onClick={allClickHandler} className={props.filter === 'all' ? s.activeFilter : ''}>All</button>
                    <button onClick={activeClickHandler} className={props.filter === 'active' ? s.activeFilter  : ''}>Active</button>
                    <button onClick={completedClickHandler} className={props.filter === 'completed' ? s.activeFilter  : ''}>Completed</button>
                </div>
            </div>
        </div>
    );
};

