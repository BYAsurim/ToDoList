import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {BasicAppBar} from "./BasicAppBar";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    fetchTodolists,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispach} from "./state/store";


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


export function AppWithRedux() {
    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, StateTasksType>(state => state.tasks)
    const dispatch = useAppDispach()

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(title, todolistId, taskId))
    }, [dispatch])
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(RemoveTodoListAC(todolistId))
    }, [dispatch])
    const addTodoList = useCallback((newTitle: string) => {
        const action = AddTodoListAC(newTitle)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
        dispatch(ChangeTodoListTitleAC(todolistId, title))
    }, [dispatch])
    const changeFilter = useCallback((value: filterType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(todolistId, value))
    }, [dispatch])
    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <Grid container>
                    <Paper style={{padding: '10px', marginTop: '5px'}}>
                        <AddItemForm addTaskHandler={addTodoList}/>
                    </Paper>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let tasksForTodolist = tasks[todolist.id]
                            // if (todolist.filter === 'active') {
                            //     filteredTasks = tasks[todolist.id].filter(t => !t.isDone)
                            // }
                            // if (todolist.filter === 'completed') {
                            //     filteredTasks = tasks[todolist.id].filter(t => t.isDone)
                            // }
                            // const changeFilter = (value: filterType, todolistId: string) => {
                            //     dispatch(ChangeTodoListFilterAC(todolistId, value))
                            // }

                            return <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        // id={todolist.id}
                                        // title={todolist.title}
                                        todolist={todolist}
                                        tasks={tasksForTodolist}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
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



