import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users, Questions, Answer } from 'src/app/Interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appstate } from 'src/app/States/appState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getOneQuestion } from 'src/app/States/Reducers/questionReducer';
import { getAQuestion } from 'src/app/States/Actions/questionActions';
// import { QuestionsService } from 'src/app/Services/Questions/questions.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  question!:Observable<Questions>
  quest_id=''
  constructor(private router:Router,private store:Store<Appstate>,private route:ActivatedRoute){

  } 

 ngOnInit(){
    this.quest_id =this.route.snapshot.params['Id'] //selector name in reducer
    this.store.dispatch(getAQuestion({id:this.quest_id}))
    console.log(this.quest_id)
    this.question = this.store.select(getOneQuestion)

   
  }

  // question=this.questionService.Question
  

  }


