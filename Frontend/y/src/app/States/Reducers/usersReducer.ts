import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import {Users} from 'src/app/Interface'
import * as UserAction from '../Actions/usersAction'
// import {AppState} from '../appState'

export interface UserReducer{
    users:Users[]
    addUserSuccess:string
    addUserFailure:string
    logInUserSuccess:string
    logInUserFailure:string,
    getUserSuccess:Users[]
    getUserFailure:string
    updateUserSuccess:string
    updateUserFailure:string,
    deleteUserSucc:string
    deleteUserFail:string

}

const intialState:UserReducer ={
    users:[],
    addUserSuccess:'',
    addUserFailure:'',
    logInUserSuccess:'',
    logInUserFailure:'',
    getUserSuccess:[],
    getUserFailure:'',
    updateUserSuccess:'',
    updateUserFailure:'',
    deleteUserSucc:'',
    deleteUserFail:''
}

export const getUserState = createFeatureSelector<UserReducer>('users')
export const addError = createSelector(getUserState,(state)=>state.addUserFailure)
export const getAllUser = createSelector(getUserState,(state)=>state.users)
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
    }}),

    on(UserAction.logInUserSuccess,(state,action)=>{
        return{
            ...state,
            logInUserSuccess:action.succMess,
            logInUserFailure:''

        }
    }),

    on(UserAction.logInUserFailure,(state,action)=>{
        return{
            ...state,
            logInUserSuccess:'',
            logInUserFailure:action.failMess
        }
    }),
    on(UserAction.getUserSuccess,(state,action)=>{
        return{
            ...state,
            users:action.users,
            getUserFailure:''

        } }),
    on(UserAction.getUserFailure,(state,action)=>{
        return{
            ...state,
            getUserSuccess:[],
            getUserFailure:action.failMess
        }}),

    on(UserAction.updateUserSuccess,(state,action)=>{
        return{
            ...state,
            updateUserSuccess:action.succMess,
            updateUserFailure:''
        }
    }),
    on(UserAction.updateUserFailure,(state,action)=>{
        return{
            ...state,
            updateUserSuccess:'',
            updateUserFailure:action.failMess
        }
    }),
    on(UserAction.deleteUserSucc,(state,action)=>{
        return{
            ...state,
            deleteUserSucc:action.succMess,
            deleteUserFail:''
        }
    }),
    on(UserAction.deleteUserFail,(state,action)=>{
        return{
            ...state,
            deleteUserSucc:'',
            deleteUserFail:action.failMess
        }
    })

)