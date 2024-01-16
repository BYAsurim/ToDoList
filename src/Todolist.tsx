import React, {memo, useCallback, useEffect} from 'react';
import s from './Todolist.module.css'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {filterType} from "./app/App";
import {Task} from "./Task";
import {fetchTasksTC} from "./state/task-reducer";
import {useAppDispach} from "./app/store";
import {TaskStatuses, TasksType} from "./api/todolist-api";
import {TodolistDomainType} from "./state/todolists-reducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TasksType>
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: filterType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
    removeTodoList: (todolistId: string) => void
}


export const Todolist = memo((props: PropsType) => {
    const dispatch = useAppDispach()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, []);

    const allClickHandler = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const activeClickHandler = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const completedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    const addTaskHandler = useCallback((newTaskTitle: string) => {
        props.addTask(props.todolist.id, newTaskTitle)
    }, [props.addTask, props.todolist.id])

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todolist.id)
    }

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todolist.id, title)
    }, [props.changeTodoListTitle, props.todolist.id])
    const disabled = props.todolist.entityStatus === 'loading'

    let filteredTasks = props.tasks
    if (props.todolist.filter === 'active') {
        filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <div>
                <div className={s.todoTitle}>
                    <h3><EditableSpan title={props.todolist.title} onClick={changeTodoListTitle}/></h3>
                    <IconButton onClick={removeTodoListHandler} disabled={disabled}>
                        <Delete/>
                    </IconButton>
                </div>
                <div>
                    <AddItemForm addTaskHandler={addTaskHandler} disabled={disabled}/>
                </div>
                <div>
                    {

                        filteredTasks.map(task => {
                                return <Task
                                    key={task.id}
                                    task={task}
                                    todolistId={props.todolist.id}
                                    disabled={disabled}
                                    deleteTask={props.deleteTask}
                                    changeTaskStatus={props.changeTaskStatus}
                                    changeTaskTitle={props.changeTaskTitle}

                                />
                            }
                        )
                    }
                </div>
                <div>
                    <Button onClick={allClickHandler}
                            variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                            color={'primary'}>All</Button>
                    <Button onClick={activeClickHandler}
                            variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                            color={'primary'}>Active</Button>
                    <Button onClick={completedClickHandler}
                            variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                            color={'primary'}>Completed</Button>
                </div>
            </div>
        </div>
    );
});

