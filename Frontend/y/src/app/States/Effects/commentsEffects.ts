import {Injectable} from '@angular/core'
import {Actions,createEffect, ofType} from '@ngrx/effects'
import { CommentsServiceService } from 'src/app/Services/Comments/comments-service.service'
import * as CommentAction from '../Actions/commentsAction'
import { catchError, map, mergeMap,of } from 'rxjs'


@Injectable()


export class CommentEffects{
    constructor(private actions$:Actions, private commentService:CommentsServiceService){
    }

    addComment$ =createEffect(()=>
    this.actions$.pipe(
        ofType(CommentAction.addComment),
        mergeMap(action=>this.commentService.addComment(action.id,action.comment).pipe(
            map(comment=>{
                console.log('one commment')
                return CommentAction.success({succMess:comment.message})
            }),
            catchError(err=> of(CommentAction.fail({failMess:err.message})))
        ))))

    getComments$ = createEffect(()=>
            this.actions$.pipe(
                ofType(CommentAction.getComment),
                mergeMap(action=>this.commentService.getComment(action.id).pipe(
                    map(comment=>{
                        console.log(comment);
                        
                        return CommentAction.getCommentSucc({comment})
                    }),
                    catchError(err=> of(CommentAction.fail({failMess:err.message})))
                ))
            )
    )
}