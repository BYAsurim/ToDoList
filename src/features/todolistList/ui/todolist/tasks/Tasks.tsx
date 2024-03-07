import React from 'react';
import {Task} from "features/todolistList/ui/todolist/tasks/task/Task";
import {TaskStatuses} from "../../../../../common/enums/common.enums";
import { TasksType } from 'features/todolistList/api/tasks/tasksApi';
import { TodolistDomainType } from 'features/todolistList/model/todolists/todolists-reducer';



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

