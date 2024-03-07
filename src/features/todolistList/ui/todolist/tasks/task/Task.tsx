import React, {ChangeEvent, useCallback} from 'react';
import s from "./task.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "components/editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useAppDispach} from "app/store";
import {removeTaskTC, updateTaskTC} from "features/todolistList/model/tasks/task-reducer";
import {TasksType} from "../../../../api/tasks/tasksApi";
import { TaskStatuses } from 'common/enums/common.enums';


type TaskPropsType = {
    task: TasksType
    todolistId: string
    disabled: boolean
}

export const Task: React.FC<TaskPropsType> = ({
                                                  task,
                                                  todolistId,
                                                  disabled,

                                              }) => {

    const dispatch = useAppDispach()


    const deleteTasksHandler = () => {
        dispatch(removeTaskTC(task.id, todolistId))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistId, task.id, {status}))
    }
    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTC(todolistId, task.id, {title}))
    }, [todolistId, task.id])

    return (
        <div className={task.status ? s.isDone : ''}>
            <Checkbox
                disabled={disabled}
                color={'primary'}
                checked={task.status === TaskStatuses.Completed}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={task.title} onClick={changeTaskTitleHandler}/>
            <IconButton onClick={deleteTasksHandler} disabled={disabled}>
                <Delete/>
            </IconButton>
        </div>)
};

