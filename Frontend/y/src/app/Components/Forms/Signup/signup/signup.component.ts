import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from '@ngrx/store'
import { Appstate } from 'src/app/States/appState';
import { addUser } from 'src/app/States/Actions/usersAction';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsersService } from 'src/app/Services/Users/users.service';
import { NewUsers, Users } from 'src/app/Interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!:FormGroup
  erroMessage=''
  constructor(private usersService:UsersService,private store:Store<Appstate>){
  }

 user!:Observable<NewUsers>

  ngOnInit(){
  this.form = new FormGroup({
    user_name:new FormControl('',[Validators.required]),
    user_email:new FormControl('',[Validators.required,Validators.email]),
    user_password:new FormControl('',[Validators.required]) 
  })
}
error=''
onSubmit(){
  this.store.dispatch(addUser({user:this.form.value})) 
  console.log(this.form)
  this.form.reset()
}


}
