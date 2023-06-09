import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Box, Container, Grid, IconButton, Paper, Typography} from '@mui/material';
import {Button, Toolbar} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-user-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {useCallback} from 'react';
import {addTaskAC} from './state/task-user-reducer';


export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch();

    const addTask= useCallback ( function (title:string,todolistId: string ){
        const action=addTaskAC(title,todolistId);
        dispatch(action)
    },[dispatch]);
    const changeFilter= useCallback( function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action);
    },[dispatch]);
    const removeTodolist= useCallback( function (todolistId: string) {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    },[dispatch]);
    const changeTodolistTitle= useCallback(function (id: string, newTitle: string,) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action);
    },[dispatch]);
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    },[dispatch]);

    return (
        <div className="App">
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
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        addTask={addTask}
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

export default AppWithRedux;
