import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import { IconButton } from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Button} from '@material-ui/core';
import { Checkbox } from '@mui/material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/task-user-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
}

export function Todolist(props: PropsType) {
    const tasksObj = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)



    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }
    let allTodolistTasks= tasksObj;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }


    return <div>
        <h3>  <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}><Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title)=>{
            dispatch(addTaskAC(title,props.id));
        }}/>
        <ul>
            {
                tasksForTodolist.map((t) => {
                    const onRemoveHandler = () => {
                        dispatch(removeTaskAC(t.id, props.id));
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
                    };
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                    };
                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox  defaultChecked color="secondary" onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}
                        />
                        <IconButton onClick={onRemoveHandler}><Delete/>
                        </IconButton>
                    </div>;
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

