import { Component, Directive, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Answer, Questions, Users} from '../../Interface'
import { ActivatedRoute, Router } from '@angular/router';
import {Store} from '@ngrx/store'
import { Appstate } from 'src/app/States/appState';
import {FormsModule} from '@angular/forms'
import { getAllQuestions, getOneQuestion } from 'src/app/States/Reducers/questionReducer';
import {getAQuestion, getAllQuestion} from 'src/app/States/Actions/questionActions'
import { Observable } from 'rxjs';
// import { QuestionsService } from 'src/app/Services/Questions/questions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  questions!:Observable<Questions[]>
  question!:Observable<Questions>
  quest_id=''
  filteredQuestions:string =''
  constructor(private router:Router,private store:Store<Appstate>,private route:ActivatedRoute){

}

ngOnInit(){
  this.questions = this.store.select(getAllQuestions)//selector name
  console.log(this.questions)
  this.store.dispatch(getAllQuestion())//action name
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

userProfile(){
  this.router.navigate(['/users'])
}

signOut(){
  this.router.navigate(['/signin'])
}

}
