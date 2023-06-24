import { createAction, props } from "@ngrx/store";
import {Newuser, Users} from '../../Interface'



export const addUser = createAction('[NewUser]- AddUser',props<{user:Newuser}>())
export const addUserSuccess = createAction('[AddUserSuccess]-AddUserSuccess',props<{succMess:string}>())
export const addUserFailure = createAction('[AddUserFailure]-AddUserFailure',props<{failMess:string}>())


