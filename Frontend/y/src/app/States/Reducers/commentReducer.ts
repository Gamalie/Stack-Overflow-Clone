import {createFeatureSelector, createReducer, createSelector,on} from '@ngrx/store'
import { Comment } from 'src/app/Interface'
import * as CommentAction from '../Actions/commentsAction'


export interface CommentReducer{
    comments:Comment[],
    getComment:string,
    getCommentSucc:Comment[]
    success:string
    fail:string
}

const initialState:CommentReducer={
    comments:[],
    getComment:'',
    getCommentSucc:[],
    success:'',
    fail:''
}

export const getCommentState = createFeatureSelector<CommentReducer>('comment')
export const getComment = createSelector(getCommentState,(state)=>state.comments)
export const getCommentError = createSelector(getCommentState,(state)=>state.fail)



export const commentReducer = createReducer(
    initialState,

    on( CommentAction.success,(state,action):CommentReducer=>{//for add successfully
            return{
                ...state,
                success:action.succMess,
                fail:''
            }}),
    on(CommentAction.fail,(state,action)=>{//for add or get failure
        return {
            ...state,
            success:'',
            fail:action.failMess
        }}),
    on(CommentAction.getCommentSucc,(state,action)=>{
        return{
            ...state,
            getCommentSucc:action.comment,
            fail:''
        }}),
    
)