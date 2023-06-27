import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/Users/users.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/States/appState';
import { logInUser } from 'src/app/States/Actions/usersAction';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  form!:FormGroup
  errorMessage='';
  constructor(private store:Store<Appstate>,private router:Router,private authService:AuthenticationService){
  }
  ngOnInit(){
  this.form = new FormGroup({
    Email:new FormControl('',[Validators.required,Validators.email]),
    Password:new FormControl('',[Validators.required]) 
  })
}

  onSubmit(){
    this.store.dispatch(logInUser({logInUser:this.form.value}))
    
    console.log(this.form)
    this.form.reset()
    this.router.navigate([''])
  }
}


