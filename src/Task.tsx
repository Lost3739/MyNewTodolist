import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/task-user-reducer';
import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo( (props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId));
    };
    const onChangeTitleHandler = useCallback ((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    }, [props.task.id,props.todolistId]);
    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox defaultChecked color="secondary" onChange={onChangeStatusHandler} checked={props.task.isDone}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}
        />
        <IconButton onClick={onClickHandler}><Delete/>
        </IconButton>
    </div>

})