import {createAction,props} from '@ngrx/store'
import {Comment} from '../../Interface'

export const addComment = createAction('[AddComment]-AddComment',props<{id:string,comment:Comment}>())
export const getComment = createAction('[GetComment]-GetComment',props<{id:string}>())
export const getCommentSucc = createAction('[GetCommentSucc]- GetCommentSucc',props<{comment:Comment[]}>())

export const success = createAction('[Success]-Success',props<{succMess:string}>())
export const fail = createAction('[Failure]-Failure',props<{failMess:string}>())