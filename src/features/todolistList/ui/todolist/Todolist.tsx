import React, {memo, useEffect} from 'react';
import {addTaskTC, fetchTasksTC} from "features/todolistList/model/tasks/task-reducer";
import {useAppDispach} from "app/store";
import {TodolistDomainType} from "features/todolistList/model/todolists/todolists-reducer";
import {Tasks} from "features/todolistList/ui/todolist/tasks/Tasks";
import {TodolistFilterButton} from "features/todolistList/ui/todolist/todolistFilterButton/TodolistFilterButton";
import {TodolistTitle} from "features/todolistList/ui/todolist/todolistTitle/TodolistTitle";
import {AddItemForm} from "../../../../components";
import {TasksType} from "../../api/tasks/tasksApi";

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

