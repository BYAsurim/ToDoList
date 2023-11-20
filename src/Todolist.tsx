import React, {ChangeEvent, memo, useCallback} from 'react';
import {filterType, TasksType} from "./App";
import s from './Todolist.module.css'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistsType} from "./AppWithRedux";

type PropsType = {
    // id: string
    // title: string
    todolist:TodolistsType
    tasks: Array<TasksType>
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: filterType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
    filter: filterType;
    removeTodoList: (todolistId: string) => void
}


export const Todolist = memo((props: PropsType) => {
    console.log('Todolist')

    const allClickHandler = useCallback (() => {
       props.changeFilter('all', props.todolist.id)
    },[props.changeFilter, props.todolist.id])
    const activeClickHandler = useCallback (() => {
        props.changeFilter('active', props.todolist.id)
    },[props.changeFilter, props.todolist.id])
    const completedClickHandler = useCallback (() => {
        props.changeFilter('completed', props.todolist.id)
    },[props.changeFilter, props.todolist.id])

    const addTaskHandler = useCallback((newTaskTitle: string) => {
        props.addTask(props.todolist.id, newTaskTitle)
    },[props.addTask, props.todolist.id])

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todolist.id)
    }
    const changeTaskTitleHandler = (taskId: string, title: string) => {
        props.changeTaskTitle(props.todolist.id, taskId, title)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todolist.id, title)
    }

    // const changeFilter = (value: filterType, todolistId: string) => {
    //     dispatch(ChangeTodoListFilterAC(todolistId, value))
    // }

   let filteredTasks = props.tasks
    if (props.todolist.filter === 'active') {
        filteredTasks = props.tasks.filter(t => !t.isDone)
    }
    if (props.todolist.filter === 'completed') {
        filteredTasks = props.tasks.filter(t => t.isDone)
    }



    return (
        <div>
            <div>
                <div className={s.todoTitle}>
                    {/*<h3>{props.title}</h3>*/}
                    <h3><EditableSpan title={props.todolist.title} onClick={changeTodoListTitle}/></h3>
                    {/*<button onClick={removeTodoListHandler}>x</button>*/}
                    <IconButton onClick={removeTodoListHandler}>
                        <Delete/>
                    </IconButton>
                </div>
                <div>
                    <AddItemForm addTaskHandler={addTaskHandler}/>
                </div>
                <div>
                    {

                        filteredTasks.map((t) => {
                            const deleteTasksClickHandler = () => {
                                props.deleteTask(props.todolist.id, t.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatus = e.currentTarget.checked
                                props.changeTaskStatus(props.todolist.id, t.id, newStatus)
                            }

                            return (
                                <div key={t.id} className={t.isDone ? s.isDone : ''}>
                                    <Checkbox
                                        color={'primary'}
                                        checked={t.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <EditableSpan title={t.title} onClick={(title: string) => {
                                        changeTaskTitleHandler(t.id, title)
                                    }}/>
                                    <IconButton onClick={deleteTasksClickHandler}>
                                        <Delete/>
                                    </IconButton>
                                </div>)
                        })
                    }
                </div>
                <div>
                    {/*<button onClick={allClickHandler} className={props.filter === 'all' ? s.activeFilter : ''}>All</button>*/}
                    {/*<button onClick={activeClickHandler} className={props.filter === 'active' ? s.activeFilter  : ''}>Active</button>*/}
                    {/*<button onClick={completedClickHandler} className={props.filter === 'completed' ? s.activeFilter  : ''}>Completed</button>*/}
                    <Button onClick={allClickHandler}
                            variant={props.filter === 'all' ? 'outlined' : 'text'}
                            color={'primary'}>All</Button>
                    <Button onClick={activeClickHandler}
                            variant={props.filter === 'active' ? 'outlined' : 'text'}
                            color={'primary'}>Active</Button>
                    <Button onClick={completedClickHandler}
                            variant={props.filter === 'completed' ? 'outlined' : 'text'}
                            color={'primary'}>Completed</Button>
                </div>
            </div>
        </div>
    );
});

