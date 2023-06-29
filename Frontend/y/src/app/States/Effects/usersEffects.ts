import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType } from '@ngrx/effects'
import * as UserAction from '../Actions/usersAction'
import { UsersService } from "src/app/Services/Users/users.service";
import { Observable, catchError, map, mergeMap, of, switchMap, tap } from "rxjs";

@Injectable()
export class UsersEffects{

    constructor(private actions$:Actions,private userService:UsersService){ }

    addUsers$=createEffect(()=>
    this.actions$.pipe(
        ofType(UserAction.addUser),
        mergeMap(action=>this.userService.addUser(action.user)
        .pipe(
            tap(s=>console.log(s)),
            map(users=>{
                return  UserAction.addUserSuccess({succMess:users.message})
            }),
            catchError(err=> of(UserAction.addUserFailure({failMess:err.message})))
            ))
            ))

    logInUser$=createEffect(()=>
        this.actions$.pipe(
            ofType(UserAction.logInUser),
            switchMap(action=>this.userService.logInUser(action.logInUser)
            .pipe(
                map(users=>{
                    localStorage.setItem('token',users.token)
                    return UserAction.logInUserSuccess({succMess:users.message})
                }),
                catchError(err=>of(UserAction.logInUserFailure({failMess:err.message})))
            ))
        ))

    
    updateProfile$ =createEffect(()=>
    this.actions$.pipe(
        ofType(UserAction.updateProfile),
        mergeMap(action=>this.userService.updateUser(action.id,action.userProfile).
        pipe(
            map(users=>{
                return UserAction.updateUserSuccess({succMess:users.message})
            }),
            catchError(err=> of(UserAction.updateUserFailure({failMess:err.message})))
        ))
    ))

    
   getAllUsers$ = createEffect(()=>
   this.actions$.pipe(
    ofType(UserAction.getAllUsers),
    mergeMap(action=>this.userService.getAllUsers()
    .pipe(
        map(users=>{
            return UserAction.getUserSuccess({users})
        }),
        catchError(err=> of(UserAction.getUserFailure({failMess:err.message})))
    ))
   ))



   deleteUser$ = createEffect(()=>
   this.actions$.pipe(
    ofType(UserAction.deleteUser),
    mergeMap(action=>this.userService.deleteUsers(action.id)
    .pipe(
        map(
            users=>{
            console.log(users)
            return UserAction.deleteUserSucc({succMess:users.message})
        },
        (err:any) => console.log(err)),
        catchError(err=> {
            console.log(err);
            
            return of(UserAction.deleteUserFail({failMess:err.message}))
        })
    ))
   ))










}