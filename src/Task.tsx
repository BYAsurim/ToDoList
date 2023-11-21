import React, {ChangeEvent, useCallback} from 'react';
import s from "./Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./App";

type TaskPropsType = {
    task:TasksType
    deleteTask: (todolistId: string, taskId: string) => void
    todolistId: string
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = ({
    task,
    deleteTask,
    todolistId,
    changeTaskStatus,
    changeTaskTitle
                                              }) => {

    const deleteTasksClickHandler = () => {
        deleteTask(todolistId, task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
       changeTaskStatus(todolistId, task.id, newStatus)
    }
    const changeTaskTitleHandler =  useCallback ((title: string) => {
        changeTaskTitle(todolistId, task.id, title)
    },[todolistId, changeTaskTitle, task.id])

    return (
        <div className={task.isDone ? s.isDone : ''}>
            <Checkbox
                color={'primary'}
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={task.title} onClick={changeTaskTitleHandler}/>
            <IconButton onClick={deleteTasksClickHandler}>
                <Delete/>
            </IconButton>
        </div>)
};

