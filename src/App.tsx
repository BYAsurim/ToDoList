import React, {useCallback, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {BasicAppBar} from "./BasicAppBar";


export type filterType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: filterType
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type StateTasksType = {
    [key: string]: Array<TasksType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState<StateTasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    // const [tasks, setTasks] = useState<Array<TasksType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Redax", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false}
    // ])
    // const [filter, setFilter] = useState<filterType>('all')
    // const [error, setError] = useState('')
    const deleteTask = (todolistId: string, taskId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId))
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})

    }
    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
        // if (title.trim() !== '') {
        //     setTasks([...tasks, {id: v1(), title, isDone: false}])
        //     setError('')
        // }
        // if (title.trim() === '') {
        //     setError('error')
        // }
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: [...tasks[todolistId].map(el => el.id === taskId ?
                {...el, title} : el)]
        })
    }
    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodoList = useCallback ((newTitle: string) => {
        let newTodoLIstId = v1()
        let newTodo: TodolistsType = {id: newTodoLIstId, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodoLIstId]: []})

    }, [])
    const changeTodoListTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
    }

    //
    // let filteredTasks = tasks
    // if (filter === 'active') {
    //     filteredTasks = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //     filteredTasks = tasks.filter(t => t.isDone)
    // }
    // const changeFilter = (value: filterType) => {
    //     setFilter(value)
    // }
    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <Grid container>
                    <Paper style={{padding:'10px', marginTop:'5px'}}>
                    <AddItemForm addTaskHandler={addTodoList}/>
                    </Paper>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let filteredTasks = tasks[todolist.id]
                            if (todolist.filter === 'active') {
                                filteredTasks = tasks[todolist.id].filter(t => !t.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = tasks[todolist.id].filter(t => t.isDone)
                            }
                            const changeFilter = (value: filterType, todolistId: string) => {
                                let todolist = todolists.find(todolist => todolist.id === todolistId)
                                if (todolist) {
                                    todolist.filter = value
                                    setTodolists([...todolists])
                                }
                            }
                            return <Grid item key={todolist.id}>
                                <Paper style={{padding:'10px'}}>
                                <Todolist
                                    // id={todolist.id}
                                    // title={todolist.title}
                                    todolist={todolist}
                                    tasks={filteredTasks}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                    // error={error}
                                    // setError={setError}
                                    // filter={todolist.filter}
                                    removeTodoList={removeTodoList}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

