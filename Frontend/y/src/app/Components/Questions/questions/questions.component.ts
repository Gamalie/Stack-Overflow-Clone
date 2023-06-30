import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users, Questions, Answer,Comment } from 'src/app/Interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appstate } from 'src/app/States/appState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getOneQuestion } from 'src/app/States/Reducers/questionReducer';
import { getAQuestion } from 'src/app/States/Actions/questionActions';
import { getAnswer } from 'src/app/States/Reducers/answersReducer';
import { addAnswers, downVoteAnswer, getAllAnswerSuccess, getAllAnswers, markAsPreferred, upvoteAnswer } from 'src/app/States/Actions/answerActions';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { addComment, getComment } from 'src/app/States/Actions/commentsAction';
import { getComments } from 'src/app/States/Reducers/commentReducer';
// import { QuestionsService } from 'src/app/Services/Questions/questions.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  question!:Observable<Questions>
  quest_id=''
  ans_id=''
  answer!:Answer[]
  form!:FormGroup
  form1!:FormGroup
  comments!:Observable<Comment[]>
  showComments = false
  constructor(private router:Router,private store:Store<Appstate>,private route:ActivatedRoute){

  } 

 ngOnInit(){
    this.quest_id =this.route.snapshot.params['Id'] //selector name in reducer
    this.question = this.store.select(getOneQuestion)
    this.store.dispatch(getAQuestion({id:this.quest_id}))
    console.log(this.quest_id)

    this.store.dispatch(getAllAnswers({id:this.quest_id}))
    this.store.select(getAnswer).subscribe(res=>{
      console.log(res)
      this.answer = res

     
    })

    this.form1 = new FormGroup({
      Body:new FormControl('',[Validators.required])
    })


    this.form = new FormGroup({
      Title:new FormControl('',[Validators.required]),
      Body:new FormControl('',[Validators.required]) })
  }


  onSubmit(){    
    this.store.dispatch(addAnswers({id:this.quest_id,answer:this.form.value}))
    console.log(this.form)
    this.form.reset() 
  }

  markPreferred(){
    this.ans_id =this.route.snapshot.params['answer_id'] 
    this.store.dispatch(markAsPreferred({id:this.ans_id}))
  }

  upvoteAnswer(id:string){
  this.store.dispatch(upvoteAnswer({id}))
  this.store.dispatch(getAllAnswers({id:this.quest_id}))
  }


  downvoteAnswer(id:string){
  this.store.dispatch(downVoteAnswer({id}))
  this.store.dispatch(getAllAnswers({id:this.quest_id}))
  }

  addComment(id:string){
    console.log('pink')
    this.store.dispatch(addComment({id,comment:this.form1.value}))
    console.log(this.form1)
    this.form1.reset() 
  }


  getComment(id:string){
    this.showComments = !this.showComments
    this.store.dispatch(getComment({id}))
    this.comments=this.store.select(getComments)
  }
  

  addOrUpdate(){
    this.router.navigate(['/addorupdate'])
  }

 home(){
    this.router.navigate([''])
  }
  profile(){
    this.router.navigate(['/users'])
  }
  
  signOut(){
    this.router.navigate(['/users'])
  }

  }


