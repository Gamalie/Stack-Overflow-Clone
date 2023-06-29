import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { QuestionsService } from 'src/app/Services/Questions/questions.service'
import * as QuestionAction from '../Actions/questionActions'
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs'
import {Questions} from '../../Interface'


@Injectable()

export class QuestionEffects{
    constructor(private actions$:Actions, private questionService:QuestionsService){
       
    }

    getAllQuestions$ = createEffect(()=>
    this.actions$.pipe(
        ofType(QuestionAction.getAllQuestion),
        mergeMap(action=>this.questionService.getAllQuestions()
        .pipe(
            // tap(s=>console.log(s)
            map(questions=>{
                return  QuestionAction.getQuestSuccess({questions})
            }),
            catchError(err=> of(QuestionAction.getQuestFailure({failMess:err.message})))
            ))
            ))



        getOneQuestion$ = createEffect(()=>
        this.actions$.pipe(
            
            ofType(QuestionAction.getAQuestion),
            mergeMap(action=>this.questionService.getToOneQuestion(action.id)
            .pipe(
                // tap(s=>console.log(s)),
                map(question=>{
                    console.log(question)
                    return  QuestionAction.getOneQuestSuccess({question})
                }),
                catchError(err=> of(QuestionAction.getOneQuestFailure({failMess:err.message})))
                ))
                ))

               
        


                getOwnQuestion$ = createEffect(()=>
                this.actions$.pipe(
                    
                    ofType(QuestionAction.getAQuestion),
                    mergeMap(action=>this.questionService.getOwnQuestion(action.id)
                    .pipe(
                        // tap(s=>console.log(s)),
                        map(question=>{
                            return  QuestionAction.getOneQuestSuccess({question})
                        }),
                        catchError(err=> of(QuestionAction.getOneQuestFailure({failMess:err.message})))
                        ))
                        ))

                        addQuestion$ = createEffect(()=>
                        this.actions$.pipe(
                            ofType(QuestionAction.addQuestion),
                            mergeMap(action=>this.questionService.addQuestion(action.question)
                            .pipe(
                                // tap(s=>console.log(s)
                                map(succMess=>{
                                    return  QuestionAction.addQuestionSuccess({succMess})
                                }),
                                catchError(err=> of(QuestionAction.getQuestFailure({failMess:err.message})))
                                ))
                                ))


                updateQuestion$=createEffect(()=>
                this.actions$.pipe(
                    ofType(QuestionAction.updateQuestion),
                    mergeMap(action=>this.questionService.updateQuestion(action.id,action.question)
                    .pipe(
                        map(succMess=>{
                            return QuestionAction.updateQuestionSuccess({succMess})
                        }),
                        catchError(err=> of(QuestionAction.updateQuestionFailure({failMess:err})))
                        )),
                        switchMap(()=>[QuestionAction.getAllQuestion()])
                        ))


                        getUserQuestions$ = createEffect(()=>
                        this.actions$.pipe(
                            ofType(QuestionAction.getUserQuestions),
                            mergeMap(action=>this.questionService.getQuestionByUserId()
                            .pipe(
                                map(questions=>{
                                    // console.log(questions)
                                    return  QuestionAction.getUserQuestSuccess({questions})
                                }),
                                catchError(err=> of(QuestionAction.getQuestFailure({failMess:err.message})))
                                ))
                                ))


                                deleteOwnQuestion$ = createEffect(()=>
                                this.actions$.pipe(
                                    
                                    ofType(QuestionAction.deleteQuestion),
                                    mergeMap(action=>this.questionService.deleteQuestion(action.id)
                                    .pipe(
                                        tap(s=>console.log(s)),
                                        map(succMess=>{
                                            return  QuestionAction.deleteQuestionSuccess({succMess})
                                        }),
                                        catchError(err=> of(QuestionAction.getOneQuestFailure({failMess:err.message})))
                                        ))
                                        ))


                                        deleteQuestionAdmin$ = createEffect(()=>
                                        this.actions$.pipe(
                                            ofType(QuestionAction.adminDeleteQuestion),
                                            mergeMap(action=>this.questionService.deleteQuestionAdmin(action.id)
                                            .pipe(
                                                tap(s=>console.log(s)),
                                                map(succMess=>{
                                                    return  QuestionAction.deleteQuestionSuccess({succMess})
                                                }),
                                                catchError(err=> of(QuestionAction.getOneQuestFailure({failMess:err.message})))
                                                ))
                                                ))


}  