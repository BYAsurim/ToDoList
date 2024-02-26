import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import AddItemForm from "../../AddItemForm";
import {Todolist} from "Todolist";
import {addTaskTC, removeTaskTC, updateTaskTC} from "state/task-reducer";
import {TaskStatuses} from "api/todolist-api";
import {
    addTodolistTC,
    ChangeTodoListFilterAC,
    fetchTodolists,
    removeTodolistTC,
    updateTodolistTitleTC
} from "state/todolists-reducer";
import {filterType} from "app/App";
import {useAppDispach, useAppSelector} from "app/store";
import {Navigate} from "react-router-dom";

export const TodolistList = () => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispach()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [])
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
    }, [])
    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [])
    const changeFilter = useCallback((value: filterType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(todolistId, value))
    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <>
            <Container fixed>
                <Grid container>
                    <Paper style={{padding: '10px', margin: '5px 0 10px 0 '}}>
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
        </>
    );
};

