import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import {BasicAppBar} from "BasicAppBar";
import {useAppDispach, useAppSelector} from "./store";
import {TasksType} from "api/todolist-api";
import {ErrorSnackbar} from "components/errorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "features/auth/Login";
import {TodolistList} from "features/todolistList/TodolistList";
import {meTC} from "features/auth/auth-reducer";


export type filterType = 'all' | 'active' | 'completed'

export type StateTasksType = {
    [key: string]: Array<TasksType>
}


export function App() {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispach()

    useEffect(() => {
        dispatch(meTC())
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <BasicAppBar/>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>

        </div>
    );
}



