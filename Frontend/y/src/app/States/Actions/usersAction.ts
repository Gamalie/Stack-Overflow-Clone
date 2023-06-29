import { createAction, props } from "@ngrx/store";
import {LogInuser, NewUsers, UpdateProfile, Users} from '../../Interface'



export const addUser = createAction('[NewUser]- AddUser',props<{user:NewUsers}>())
export const addUserSuccess = createAction('[AddUserSuccess]-AddUserSuccess',props<{succMess:string}>())
export const addUserFailure = createAction('[AddUserFailure]-AddUserFailure',props<{failMess:string}>())


export const logInUser =createAction('[NewUser] - LogInUser',props<{logInUser:LogInuser}>())
export const logInUserSuccess = createAction('[LogInUserSuccess]-LogInUserSuccess',props<{succMess:string}>())
export const logInUserFailure = createAction('[LogInUserFailure]-LogInUserFailure',props<{failMess:string}>())

export const updateProfile = createAction('[UserProfile]- UpdateProfile',props<{id:string,userProfile:UpdateProfile}>())
export const updateUserSuccess = createAction('[UpdateUserSuccess]-UpdateUserSuccess',props<{succMess:string}>())
export const updateUserFailure = createAction('[UpdateUserFailure]-UpdateUserFailure',props<{failMess:string}>())

export const getAllUsers = createAction('[GetAllUsers]- GetAllUsers')
export const getUserSuccess = createAction('[GetUserSuccess]-GetUserSuccess',props<{users:Users[]}>())
export const getUserFailure = createAction('[GetUserFailure]-GetUserFailure',props<{failMess:string}>())

export const getOneUser = createAction('[GetOneUser]-GetOneUser',props<{id:string}>())
export const oneUserSuccess = createAction('[OneUserSuccess]-OneUserSuccess',props<{succMess:string}>())
export const oneUserFailure = createAction('[OneUserFailure]-OneUserFailure',props<{failMess:string}>())

export const deleteUser = createAction('[DeletedUser]- DeletedUser',props<{id:string}>())
export const deleteUserSucc = createAction('[DeleteUserSuccess]-DeleteUserSuccess',props<{succMess:string}>())
export const deleteUserFail = createAction('[DeleteUserFail]-DeleteUserFail',props<{failMess:string}>())





