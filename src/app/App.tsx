import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import AddItemForm from "../AddItemForm";
import {Container, Grid, LinearProgress, Paper} from "@mui/material";
import {BasicAppBar} from "../BasicAppBar";
import {
    addTodolistTC,
    ChangeTodoListFilterAC,
    fetchTodolists,
    removeTodolistTC,
    updateTodolistTitleTC
} from "../state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../state/task-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispach} from "./store";
import {TaskStatuses, TasksType} from "../api/todolist-api";
import {RequestStatusType} from "../features/Application/appReducer";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackbar";


export type filterType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: filterType
}
export type StateTasksType = {
    [key: string]: Array<TasksType>
}


export function App() {
    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, StateTasksType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispach()

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        // dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        // dispatch(changeTaskTitleAC(title, todolistId, taskId))
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [])
    const removeTodoList = useCallback((todolistId: string) => {
        // dispatch(RemoveTodoListAC(todolistId))
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
        // const action = AddTodoListAC(newTitle)
        // dispatch(action)
    }, [])
    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
        // dispatch(ChangeTodoListTitleAC(todolistId, title))
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [])
    const changeFilter = useCallback((value: filterType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(todolistId, value))
    }, [])
    return (
        <div className="App">
            <ErrorSnackbar/>
            <BasicAppBar/>
            {status === 'loading' && <LinearProgress/>}
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

                            return <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolist={todolist}
                                        tasks={tasksForTodolist}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
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



