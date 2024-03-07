import React, {useCallback} from 'react';
import {Button} from "@mui/material";
import {filterType} from "app/App";
import {ChangeTodoListFilterAC, TodolistDomainType} from "features/todolistList/model/todolists/todolists-reducer";
import {useAppDispach} from "app/store";

type Props = {
    todolist: TodolistDomainType
}
export const TodolistFilterButton = ({todolist}: Props) => {
    const dispatch = useAppDispach()

    const changeFilter = useCallback((value: filterType) => {
        dispatch(ChangeTodoListFilterAC(todolist.id, value))
    }, [])

    return (
        <div>
            <Button onClick={() => changeFilter('all')}
                    variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    color={'primary'}>All</Button>
            <Button onClick={() => changeFilter('active')}
                    variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}>Active</Button>
            <Button onClick={() => changeFilter('completed')}
                    variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    color={'primary'}>Completed</Button>
        </div>
    );
};

