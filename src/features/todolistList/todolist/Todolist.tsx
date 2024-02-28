import React, {memo, useCallback, useEffect} from 'react';
import s from 'features/todolistList/todolist/Todolist.module.css'
import AddItemForm from "AddItemForm";
import {EditableSpan} from "EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {filterType} from "app/App";
import {fetchTasksTC} from "state/task-reducer";
import {useAppDispach} from "app/store";
import {TasksType} from "api/todolist-api";
import {TodolistDomainType} from "state/todolists-reducer";
import {Tasks} from "features/todolistList/todolist/tasks/Tasks";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TasksType>
    changeFilter: (value: filterType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
    removeTodoList: (todolistId: string) => void
}


export const Todolist = memo(({todolist, removeTodoList, changeTodoListTitle, changeFilter, addTask, tasks}: Props) => {
    const dispatch = useAppDispach()

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, []);

    const allClickHandler = useCallback(() => {
        changeFilter('all', todolist.id)
    }, [changeFilter, todolist.id])
    const activeClickHandler = useCallback(() => {
        changeFilter('active', todolist.id)
    }, [changeFilter, todolist.id])
    const completedClickHandler = useCallback(() => {
        changeFilter('completed', todolist.id)
    }, [changeFilter, todolist.id])

    const addTaskHandler = useCallback((newTaskTitle: string) => {
        addTask(todolist.id, newTaskTitle)
    }, [addTask, todolist.id])

    const removeTodoListHandler = () => {
        removeTodoList(todolist.id)
    }

    const changeTodoListTitleCb = useCallback((title: string) => {
        changeTodoListTitle(todolist.id, title)
    }, [changeTodoListTitle, todolist.id])


    return (
        <div>
            <div>
                <div className={s.todoTitle}>
                    <h3><EditableSpan title={todolist.title} onClick={changeTodoListTitleCb}/></h3>
                    <IconButton onClick={removeTodoListHandler} disabled={todolist.entityStatus === "loading"}>
                        <Delete/>
                    </IconButton>
                </div>
                <div>
                    <AddItemForm addTaskHandler={addTaskHandler} disabled={todolist.entityStatus === "loading"}/>
                </div>
                <Tasks todolist={todolist} tasks={tasks}/>
                <div>
                    <Button onClick={allClickHandler}
                            variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                            color={'primary'}>All</Button>
                    <Button onClick={activeClickHandler}
                            variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                            color={'primary'}>Active</Button>
                    <Button onClick={completedClickHandler}
                            variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                            color={'primary'}>Completed</Button>
                </div>
            </div>
        </div>
    );
});

