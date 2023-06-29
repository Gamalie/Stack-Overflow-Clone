import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store'
import {AddedQuestionSuccess, DeleteUserSuccess, DeletedQuestionSuccess, Questions, UpdateQuestionSuccess} from 'src/app/Interface'
import * as QuestionAction from '../Actions/questionActions'


export interface QuestionReducer{
    questions:Questions[]
    question:Questions
    getQuestionsSucc:string
    getQuestionsFail:string
    getQuestionSucc:string
    getQuestionFail:string,
    addQuestionFail:string,
    addQuestionSucc:AddedQuestionSuccess,
    getQuestByUserSucc:Questions[],
    getQuestByUserFail:string,
    updateQuestionSuccess:UpdateQuestionSuccess,
    updateQuestionFailure:string,
    deleteQuestionSuccess:DeletedQuestionSuccess,
    deleteQuestionFail:string

}

const initialState:QuestionReducer = {
    questions:[],
    question:{
        User_id: '',
        Id: '',
        Title: '',
        Body: '',
        Tags: [],
        Is_deleted: 0
    },
    getQuestionsSucc:'',
    getQuestionsFail:'',
    getQuestionSucc:'',
    getQuestionFail:'',
    addQuestionFail:'',
    addQuestionSucc:{message:''},
    getQuestByUserSucc:[],
    getQuestByUserFail:'',
    updateQuestionSuccess:{message:''},
    updateQuestionFailure:'',
    deleteQuestionSuccess:{message:''},
    deleteQuestionFail:''
}


export const getQuestionState = createFeatureSelector<QuestionReducer>('question')
export const getAllQuestions = createSelector(getQuestionState,(state)=>state.questions)
export const getAllUserQuestions = createSelector(getQuestionState,(state)=>state.questions)
export const getOneQuestion = createSelector(getQuestionState,(state)=>state.question)
export const getUserQuestions = createSelector(getQuestionState,(state)=>state.questions)
export const getQuestionsError = createSelector(getQuestionState,(state)=>state.getQuestionFail)
export const deleteQuestionSuccessfully = createSelector(getQuestionState,(state)=>state.deleteQuestionSuccess)
export const updatedQuestionSuccessfully = createSelector(getQuestionState,(state)=>state.updateQuestionSuccess)
export const addedQuestionSuccessfully = createSelector(getQuestionState,(state)=>state.addQuestionSucc)
export const questionReducer = createReducer(
            initialState,
            on(QuestionAction.getQuestSuccess,(state,action):QuestionReducer=>{
                return{
                    ...state,
                    questions:action.questions,
                    getQuestionsFail:''
                }
            }),
            on(QuestionAction.getQuestFailure,(state,action)=>{
                return{
                    ...state,
                    questions:[],
                    getQuestionsFail:action.failMess
                }
            }),
            on(QuestionAction.getOneQuestSuccess,(state,action)=>{
                //console.log('state')
                return{
                    ...state,
                    question:action.question,
                    getQuestionFail:''

                }
            }),
            on(QuestionAction.getOneQuestFailure,(state,action)=>{
                return{
                    ...state,
                    getQuestionSucc:'',
                    getQuestionFail:action.failMess
                }
            }),
            on(QuestionAction.addQuestionSuccess,(state,action):QuestionReducer=>{
                return {
                    ...state,
                    addQuestionSucc:action.succMess,
                    addQuestionFail:'',
                }}),
                
            on(QuestionAction.addQuestionFailure,(state,action):QuestionReducer=>{
            return {
                ...state,
                addQuestionSucc:{message:''},
                addQuestionFail:action.failMess,
            }}),
            on(QuestionAction.getUserQuestSuccess,(state,action):QuestionReducer=>{
                return{
                    ...state,
                    getQuestByUserSucc:action.questions,
                    getQuestionsFail:''
                }
            }),
            on(QuestionAction.getUserQuestFailure,(state,action)=>{
                return{
                    ...state,
                    getQuestByUserSucc:[],
                    getQuestionsFail:action.failMess
                }
            }),
            on(QuestionAction.updateQuestionSuccess,(state,action):QuestionReducer=>{
                return{
                    ...state,
                    updateQuestionSuccess:action.succMess,
                    updateQuestionFailure:''
                }
            }),
            on(QuestionAction.updateQuestionFailure,(state,action)=>{
                return{
                    ...state,
                    updateQuestionSuccess:{message:''},
                    updateQuestionFailure:action.failMess
                }
            }),
            on(QuestionAction.deleteQuestionSuccess,(state,action):QuestionReducer=>{
                return{
                    ...state,
                    questions:state.questions,
                    deleteQuestionSuccess:action.succMess,
                    deleteQuestionFail:''
                }
            }),
            on(QuestionAction.deleteQuestionFail,(state,action):QuestionReducer=>{
                return{
                    ...state,
                    deleteQuestionSuccess:{message:''},
                    deleteQuestionFail:action.failMess
                }
            }),


)
