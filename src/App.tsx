import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type filterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redax", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    const [filter, setFilter] = useState<filterType>('completed')
    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    const changeFilter = (value: filterType) => {
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist title={'What to learn???'}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

