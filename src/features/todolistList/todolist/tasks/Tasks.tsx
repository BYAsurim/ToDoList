import React from 'react';
import {Task} from "features/todolistList/todolist/tasks/Task/Task";
import {TodolistDomainType} from "state/todolists-reducer";
import {TaskStatuses, TasksType} from "api/todolist-api";


type Props = {
    todolist: TodolistDomainType
    tasks: Array<TasksType>
}
export const Tasks = ({todolist, tasks}: Props) => {

    const disabled = todolist.entityStatus === 'loading'
    let filteredTasks = tasks
    if (todolist.filter === 'active') {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return (
        <>
            {

                filteredTasks.map(task => {
                        return <Task
                            key={task.id}
                            task={task}
                            todolistId={todolist.id}
                            disabled={disabled}

                        />
                    }
                )
            }
        </>

    );
};

