import {createAction,props} from '@ngrx/store'
import {Answer} from '../../Interface'

export const addAnswers = createAction('[AddAnswer]- AddAnswer',props<{id:string,answer:Answer}>())
export const addAnswerSuccess = createAction('[AddAnswerSuccess]-AddAnswerSuccess',props<{answer:Answer[]}>())

export const getAllAnswers = createAction('[getAnswers]-getAnswers',props<{id:string}>())
export const getAllAnswerSuccess = createAction('[GetAllAnswerSuccess]-GetAllAnswerSuccess',props<{answer:Answer[]}>())


export const markAsPreferred = createAction('[MarkAsPreferred]-MarkAsPreferred',props<{id:string}>())

export const upvoteAnswer = createAction('[UpVoteAnswer]-UpVoteAnswer',props<{id:string}>())

export const downVoteAnswer = createAction('[DownVote]-DownVote',props<{id:string}>())


export const success = createAction('[Success]-Success',props<{succMess:string}>())
export const fail = createAction('[Failure]-Failure',props<{failMess:string}>())