import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup,Validators,FormBuilder,ReactiveFormsModule} from '@angular/forms'
import { Observable } from 'rxjs';
import { Questions } from 'src/app/Interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/States/appState';
import { addQuestion, deleteQuestion, getAQuestion, getUserQuestions, updateQuestion } from 'src/app/States/Actions/questionActions';
import { getAllUserQuestions, getOneQuestion } from 'src/app/States/Reducers/questionReducer';

@Component({
  selector: 'app-addor-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './addor-update.component.html',
  styleUrls: ['./addor-update.component.css']
})
export class AddorUpdateComponent implements OnInit{

  form!:FormGroup
questions!:Observable<Questions[]>
question!:Observable<Questions>
action:'ADD' |'UPDATE' ='ADD'
quest_id =''
userQuestions!:Observable<Questions[]>
tag_Value:string[]=['']    

  constructor(private store:Store<Appstate>,private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){

  }

  ngOnInit(){
this.form = this.formBuilder.group({
  Title:['',[Validators.required]],
  Body :['',[Validators.required]],
  Tags:['',[Validators.required]]
})


if(this.route.snapshot.params['Id']){
  this.action = 'UPDATE'
  this.getOwnQuestion()
  this.question.subscribe(
    data =>{
      this.form.setValue({
        Title:data.Title,
        Body:data.Body,
        Tags:data.Tags
      }

      )
    }
  )
}

this.form.reset()
this.getUserQuestion()
  }


  onSubmit(action:'ADD'| 'UPDATE'){
    if(action=== 'ADD') {if(this.form.get('Tags')){
      this.tag_Value = this.form.get('Tags')!.value.split(',')
      this.store.dispatch(addQuestion({question:{...this.form.value,Tags:this.tag_Value}}))}
    }
  
    
    
    else{this.store.dispatch(updateQuestion({id:this.route.snapshot.params['Id'],question:{...this.form.value,Tags:this.tag_Value}}))}
    
  }
  addQuestion(){
    this.router.navigate(['/addorupdate'])
  }

  getOwnQuestion(){
    this.quest_id =this.route.snapshot.params['Id'] //selector name in reducer
    this.store.dispatch(getAQuestion({id:this.quest_id}))
    // console.log(this.quest_id)
    this.question = this.store.select(getOneQuestion)
   
  }

  goToOneQuestion(id:string){
    this.store.dispatch(getAQuestion({id}))
    this.question = this.store.select(getOneQuestion) //selector name in reducer
    console.log(id)
    this.router.navigate([`/question`,id])
  }


  getUserQuestion(){
    this.store.dispatch(getUserQuestions())
    this.userQuestions = this.store.select((state)=>state.question.getQuestByUserSucc)
    this.userQuestions.subscribe((s)=>{
      // console.log(s)
    })
  }


  deleteQuestion(id:string){
    this.store.dispatch(deleteQuestion({id}))

  }

}
