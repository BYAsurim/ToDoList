import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import AddItemForm from "../../AddItemForm";
import {Todolist} from "features/todolistList/todolist/Todolist";
import {addTodolistTC, fetchTodolists} from "state/todolists-reducer";
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



    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
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

