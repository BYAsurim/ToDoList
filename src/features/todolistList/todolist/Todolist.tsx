import React, {memo, useEffect} from 'react';
import AddItemForm from "AddItemForm";
import {addTaskTC, fetchTasksTC} from "state/task-reducer";
import {useAppDispach} from "app/store";
import {TasksType} from "api/todolist-api";
import {TodolistDomainType} from "state/todolists-reducer";
import {Tasks} from "features/todolistList/todolist/tasks/Tasks";
import {TodolistFilterButton} from "features/todolistList/todolist/todolistFilterButton/TodolistFilterButton";
import {TodolistTitle} from "features/todolistList/todolist/todolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TasksType>
}


export const Todolist = memo(({todolist, tasks}: Props) => {

    const dispatch = useAppDispach()

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, []);

    const addTask = (title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }


    return (
        <div>
            <div>
                <TodolistTitle todolist={todolist}/>
                <AddItemForm addTaskHandler={addTask} disabled={todolist.entityStatus === "loading"}/>
                <Tasks todolist={todolist} tasks={tasks}/>
                <TodolistFilterButton todolist={todolist}/>
            </div>
        </div>
    );
});

