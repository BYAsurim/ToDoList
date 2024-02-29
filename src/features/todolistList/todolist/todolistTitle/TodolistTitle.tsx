import React from 'react';
import s from "./TodolistTitle.module.css";
import {EditableSpan} from "EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {removeTodolistTC, TodolistDomainType, updateTodolistTitleTC} from "state/todolists-reducer";
import {useAppDispach} from "app/store";

type Props = {
    todolist: TodolistDomainType
}
export const TodolistTitle = ({todolist}: Props) => {
    const dispatch = useAppDispach()

    const changeTodoListTitle =(title: string) => {
        dispatch(updateTodolistTitleTC(todolist.id, title))
    }
    const removeTodoList = () => {
        dispatch(removeTodolistTC(todolist.id))
    }

    return (
        <div className={s.todoTitle}>
            <h3><EditableSpan title={todolist.title} onClick={changeTodoListTitle}/></h3>
            <IconButton onClick={removeTodoList} disabled={todolist.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </div>
    );
};

