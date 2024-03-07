import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";
import {useAppDispach, useAppSelector} from "app/store";
import {logoutTC} from "features/auth/model/auth-reducer";


export const BasicAppBar = () => {
    const isLeggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispach()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <NavLink to={'/'} style={{textDecoration: 'none', color: '#fff'}}>Todolist</NavLink>
                    </Typography>
                    {
                        isLeggedIn
                            ? <Button color="secondary" onClick={logoutHandler}
                                      style={{textDecoration: 'none', color: '#fff'}}>
                                Logout
                            </Button>
                            : <Button color="secondary">
                                <NavLink to={'/login'} style={{textDecoration: 'none', color: '#fff'}}>
                                    Login
                                </NavLink>
                            </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
