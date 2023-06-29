import {Injectable} from '@angular/core'
import {Actions,createEffect, ofType} from '@ngrx/effects'
import { AnswerServiceService } from 'src/app/Services/Answers/answer-service.service'
import * as AnswerAction from '../Actions/answerActions'
import {catchError, map, mergeMap, of,switchMap,tap} from 'rxjs'
import { Appstate } from '../appState'
import { Store } from '@ngrx/store'



@Injectable()

export class AnswerEffects{
    constructor(private actions$:Actions, private answerService:AnswerServiceService,private store:Store<Appstate>){

    }

    addQuestion$ = createEffect(()=>
        this.actions$.pipe(
         ofType(AnswerAction.addAnswers),
            mergeMap(action=>this.answerService.addAnswer(action.id,action.answer)
            .pipe(
                // tap(s=>console.log(s)
             map(answer=>{
            return  AnswerAction.success({succMess:answer.message})
            }),
            catchError(err=> of(AnswerAction.fail({failMess:err.message})))
            ))
            ))

     getAnswers$ = createEffect(()=>
        this.actions$.pipe(      
        ofType(AnswerAction.getAllAnswers),
            mergeMap(action=>this.answerService.getAnswers(action.id)
            .pipe(
                tap(s=>console.log(s)),
                map(answer=>{
                    console.log(answer)
                    return  AnswerAction.getAllAnswerSuccess({answer})
            }),
            catchError(err=> of(AnswerAction.fail({failMess:err.message})))
             ))
            ))

    markAsAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(AnswerAction.markAsPreferred),
        mergeMap(action=>this.answerService.markAccepted(action.id).pipe(
            tap(s=>console.log(s)),
            map(answer=>{
                return AnswerAction.success({succMess:answer.message})
            }),
            catchError(err=> of(AnswerAction.fail({failMess:err.message})))
        ))
    ))

    upVoteAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(AnswerAction.upvoteAnswer),
        mergeMap(action=>this.answerService.upvoteAnswer(action.id).pipe(
            map(answer=>{
                return AnswerAction.success({succMess:answer.message})
            }),catchError(err=> of(AnswerAction.fail({failMess:err.message})))
        )),
        // tap(action=>AnswerAction.getAllAnswers({id:action.qid})),
    ))

    downVoteAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(AnswerAction.downVoteAnswer),
        mergeMap(action=>this.answerService.downvoteAnswer(action.id).pipe(
            map(answer=>{
                return AnswerAction.success({succMess:answer.message})
            }),
            catchError(err=> of(AnswerAction.fail({failMess:err.message})))
        ))
    ))
}