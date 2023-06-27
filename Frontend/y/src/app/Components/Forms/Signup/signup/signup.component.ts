import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from '@ngrx/store'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Appstate } from 'src/app/States/appState';
import { addUser } from 'src/app/States/Actions/usersAction';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsersService } from 'src/app/Services/Users/users.service';
import { NewUsers, Users } from 'src/app/Interface';
import { Observable } from 'rxjs';
import { addError } from 'src/app/States/Reducers/usersReducer';

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
  constructor(private router:Router,private store:Store<Appstate>){
  }

 user!:Observable<NewUsers>
 error$!:Observable<string>

  ngOnInit(){
  this.error$= this.store.select(addError)
    
  this.form = new FormGroup({
    Name:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.required,Validators.email]),
    Password:new FormControl('',[Validators.required]) 
  })
  // console.log(this.error$);
}
error= this.error$

onSubmit(){
  this.store.dispatch(addUser({user:this.form.value}))
  console.log('yes')
  this.form.reset()
  this.router.navigate(['/signin'])
}


}
