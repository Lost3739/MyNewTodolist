import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './task-user-reducer';
import {todolistsReducer} from './todolists-user-reducer';


const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

// type AppRootState = {
//     todolists:Array<TodolistType>
//     tasks:TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;
