import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Questions, Users } from 'src/app/Interface'
import { adminDeleteQuestion, deleteQuestion, getAllQuestion, getAQuestion } from 'src/app/States/Actions/questionActions';
import { getAllQuestions, getOneQuestion } from 'src/app/States/Reducers/questionReducer';
import { Appstate } from 'src/app/States/appState';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  
  questions!:Observable<Questions[]>
  question!:Observable<Questions>
  quest_id=''
  constructor(private router:Router,private store:Store<Appstate>,private route:ActivatedRoute){

}

ngOnInit(){
  this.store.dispatch(getAllQuestion())//action name
  this.questions = this.store.select(getAllQuestions)//selector name
  console.log(this.questions)
  
  this.store.dispatch(getAllQuestion())
}

goToOneQuestion(id:string){
  this.question = this.store.select(getOneQuestion) //selector name in reducer
  this.store.dispatch(getAQuestion({id}))
  console.log(id)
  this.router.navigate([`/question`,id])
}

addOrUpdate(){
  this.router.navigate(['/addorupdate'])
}


deleteQuestion(id:string){
  this.store.dispatch(adminDeleteQuestion({id}))

}


}
