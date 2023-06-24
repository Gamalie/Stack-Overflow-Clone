import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import {Users} from 'src/app/Interface'
import * as UserAction from '../Actions/usersAction'
// import {AppState} from '../appState'

export interface UserReducer{
    users:Users[]
    addUserSuccess:string
    addUserFailure:string

}

const intialState:UserReducer ={
    users:[],
    addUserSuccess:'',
    addUserFailure:''
}

export const getUserState = createFeatureSelector<UserReducer>('users')
export const addError = createSelector(getUserState,(state)=>state.addUserFailure)
export const userReducer = createReducer(
    intialState,


    on(UserAction.addUserSuccess,(state,action):UserReducer=>{
        return {
            ...state,
            addUserSuccess:action.succMess,
            addUserFailure:'',
        }}),
        
    on(UserAction.addUserFailure,(state,action):UserReducer=>{
    return {
        ...state,
        addUserSuccess:'',
        addUserFailure:action.failMess,
    }})

)