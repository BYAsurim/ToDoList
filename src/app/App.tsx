import React, {useEffect} from 'react';
import './App.css';
import {Container, LinearProgress} from "@mui/material";
import {BasicAppBar} from "BasicAppBar";
import {fetchTodolists} from "state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispach} from "./store";
import {TasksType} from "api/todolist-api";
import {RequestStatusType} from "app/appReducer";
import {ErrorSnackbar} from "components/errorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "features/auth/Login";
import {TodolistList} from "features/todolistList/TodolistList";


export type filterType = 'all' | 'active' | 'completed'

export type StateTasksType = {
    [key: string]: Array<TasksType>
}


export function App() {
    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])


    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispach()


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



