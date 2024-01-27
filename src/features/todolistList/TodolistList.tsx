import React, {useCallback} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import AddItemForm from "../../AddItemForm";
import {Todolist} from "../../Todolist";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/task-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {
    addTodolistTC,
    ChangeTodoListFilterAC,
    removeTodolistTC, TodolistDomainType,
    updateTodolistTitleTC
} from "../../state/todolists-reducer";
import {filterType, StateTasksType} from "../../app/App";
import {AppRootStateType, useAppDispach} from "../../app/store";
import {useSelector} from "react-redux";

export const TodolistList = () => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, StateTasksType>(state => state.tasks)
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

