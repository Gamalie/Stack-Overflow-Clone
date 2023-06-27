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
   










}