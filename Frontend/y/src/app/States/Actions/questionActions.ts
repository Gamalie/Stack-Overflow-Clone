import {createAction,props} from '@ngrx/store'
import {Questions,Tag} from '../../Interface'


export const getAllQuestion = createAction('[GetAllQuetsions] - GetAllQuetsions')
export const getQuestSuccess = createAction('[GetQuestSuccess]-GetQuestSuccess',props<{questions:Questions[]}>())
export const getQuestFailure = createAction('[GetQuestFailure]-GetQuestFailure',props<{failMess:string}>())



export const getAQuestion = createAction('[GetOneQuestion]-GetOneQuestion',props<{id:string}>())
export const getOneQuestSuccess = createAction('[GetOneQuestSuccess]-GetOneQuestSuccess',props<{question:Questions}>())
export const getOneQuestFailure = createAction('[GetOneQuestFailure]-GetQuestFailure',props<{failMess:string}>())


export const addQuestion = createAction('[AddQuestion]-AddQuestion',props<{question:Questions}>())
export const addQuestionSuccess = createAction('[AddQuestionSuccess]-AddQuestionSuccess',props<{succMess:string}>())
export const addQuestionFailure = createAction('[AddQuestionFailure]-AddQuestionFailure',props<{failMess:string}>())


export const updateQuestion = createAction('[UpdateQuestion]-UpdateQuestion',props<{id:string,question:Questions}>())
export const updateQuestionSuccess = createAction('[UpdateQuestionSuccess]-UpdateQuestionSuccess',props<{succMess:string}>())
export const updateQuestionFailure = createAction('[UpdateQuestionFailure]-UpdateQuestionFailure',props<{failMess:string}>())

export const getUserQuestions = createAction('[GetUserQuestion]-GetUserQuestion')
export const getUserQuestSuccess = createAction('[GetUserQuestSuccess]-GetUserQuestSuccess',props<{questions:Questions[]}>())
export const getUserQuestFailure = createAction('[GetUserQuestFailure]-GetUserFailure',props<{failMess:string}>())

export const deleteQuestion = createAction('[DeleteQuestion]-DeleteQuestion',props<{id:string}>())
export const deleteQuestionSuccess = createAction('[DeleteQuestionSuccess]-DeleteQuestionSuccess',props<{succMess:string}>())
export const deleteQuestionFail = createAction('[DeleteQuestionFail]-DeleteQuestionFail',props<{failMess:string}>())