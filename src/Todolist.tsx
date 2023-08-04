import React from 'react';

type PropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (taskId: number) => void
}

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {

                        props.tasks.map((t) => {
                            const deleteTasksClickHandler = () => {
                                props.deleteTask(t.id)
                            }

                            return (<li key={t.id}><input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={deleteTasksClickHandler}>X</button>
                            </li>)
                        })
                    }
                    {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

