import {createFeatureSelector,createReducer,createSelector,on } from '@ngrx/store'
import {Answer} from 'src/app/Interface'
import * as AnswerAction from '../Actions/answerActions'


export interface AnswerReducer{
    answers:Answer[],
    answer:Answer,
    getAllAnswerSuccess:Answer[],
    success:string,
    fail:string,
    // addAnswerSuccess:Answer[]
}

const initialState:AnswerReducer={
    answers:[],
    answer:{
        QuestionId:'',
        Answer_id:'',
        Body:'',
        Votes:0,
        Title:''
    },
    getAllAnswerSuccess:[],
    success:'',
    fail:''
} 


export const getAnswerState = createFeatureSelector<AnswerReducer>('answer')
export const getAnswer = createSelector(getAnswerState,(state)=>state.answers)
export const getAnswerError =createSelector(getAnswerState,(state)=>state.fail)


export const answerReducer = createReducer(
        initialState,

        on(AnswerAction.success,(state,action):AnswerReducer=>{ //success for add ,markedaspreferred,upvote and downvote
            return {
                ...state,
                success:action.succMess,
                fail:''
            }}
        ),

        on(AnswerAction.fail,(state,action):AnswerReducer=>{//success for add ,markedaspreferred,upvote and downvote
            return {
                ...state,
                success:'',
                fail:action.failMess
            }
        }
        ),
        on(AnswerAction.getAllAnswerSuccess,(state,action):AnswerReducer=>{
            return {
                ...state,
                answers:action.answer,
                fail:''
            }}
        ),
        on(AnswerAction.fail,(state,action):AnswerReducer=>{
            return {
                ...state,
                success:'',
                fail:action.failMess
            }}
        ),
        on(AnswerAction.success,(state,action):AnswerReducer=>{ //success for add ,markedaspreferred,upvote and downvote
            return {
                ...state,
                success:action.succMess,
                fail:''
            }}
        ),





)