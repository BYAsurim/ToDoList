import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redax", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    const [filter, setFilter] = useState<filterType>('all')
    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const addTask = (title:string)=>{
        setTasks([...tasks, {id:v1(), title, isDone:false}])
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
                      addTask={addTask}
            />
        </div>
    );
}

export default App;

