import React, {ChangeEvent, useCallback} from 'react';
import s from "./Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "./api/todolist-api";


type TaskPropsType = {
    task: TasksType
    deleteTask: (todolistId: string, taskId: string) => void
    todolistId: string
    disabled: boolean
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = ({
                                                  task,
                                                  deleteTask,
                                                  todolistId,
                                                  disabled,
                                                  changeTaskStatus,
                                                  changeTaskTitle
                                              }) => {

    const deleteTasksClickHandler = () => {
        deleteTask(todolistId, task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
        changeTaskStatus(todolistId, task.id, newStatus ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(todolistId, task.id, title)
    }, [todolistId, changeTaskTitle, task.id])

    return (
        <div className={task.status ? s.isDone : ''}>
            <Checkbox
                disabled={disabled}
                color={'primary'}
                checked={task.status === TaskStatuses.Completed}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={task.title} onClick={changeTaskTitleHandler}/>
            <IconButton onClick={deleteTasksClickHandler} disabled={disabled}>
                <Delete/>
            </IconButton>
        </div>)
};

