import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

function App() {

    const [tasks,setTasks] = useState<Array<TasksType>>( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redax", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ])

    const deleteTask = (taskId:number) => {
    setTasks(tasks.filter(t => t.id !== taskId))
    }


    return (
        <div className="App">
          <Todolist title={'What to learn???'}
                    tasks={tasks}
                    deleteTask = {deleteTask}
          />
        </div>
    );
}

export default App;

