import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsersService } from 'src/app/Services/Users/users.service';

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
  constructor(private usersService:UsersService){
  }
  ngOnInit(){
  this.form = new FormGroup({
    user_name:new FormControl('',[Validators.required]),
    user_email:new FormControl('',[Validators.required,Validators.email]),
    user_password:new FormControl('',[Validators.required]) 
  })
}
error=''
onSubmit(){
  this.usersService.addUser(this.form.value).subscribe(
    res=>{
      console.log(res.message)
    },
    err=>{
      this.error=this.erroMessage = err.message
    }
  )
  console.log(this.form)
  this.form.reset()
}

adduser(){
  
}
}
