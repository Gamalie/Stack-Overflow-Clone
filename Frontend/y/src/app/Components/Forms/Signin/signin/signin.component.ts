import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/Users/users.service';
import { Router } from '@angular/router';

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
  constructor(private userservice:UsersService,private router:Router){
  }
  ngOnInit(){
  this.form = new FormGroup({
    user_email:new FormControl('',[Validators.required,Validators.email]),
    user_password:new FormControl('',[Validators.required]) 
  })
}

  onSubmit(){
    this.userservice.loginUser(this.form.value).subscribe(
      res=>{
        // this.errorMessage=null
        // this.authenticationService.login(res)
        // console.log(res.role);

        if(res.role==='user'){
          console.log('user')
          // this.router.navigate(['/products'])
        }
        else if(res.role==='admin'){
          console.log('admin')
          // this.router.navigate(['/admin'])
        }
      },
      err=>{
        this.errorMessage =err.message 
      }
    )
    console.log(this.form)
  this.form.reset()
  }
}


