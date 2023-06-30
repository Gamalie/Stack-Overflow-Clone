import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/Services/Users/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/States/appState';
import { getAllUsers, updateProfile } from 'src/app/States/Actions/usersAction';
import { getAllUser } from 'src/app/States/Reducers/usersReducer';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  form!:FormGroup
  userId=''
  
  constructor(private userService:UsersService, private formBuilder:FormBuilder, private store:Store<Appstate>,private router:Router,private route:ActivatedRoute){

  }


  ngOnInit(){
    this.form = this.formBuilder.group({
      Picture:['',[Validators.required]],
      Username:['',[Validators.required]],
      Title:['',[Validators.required]],
      About_me:['',[Validators.required]]
    })
}


onSubmit(){
  this.userId! = this.route.snapshot.params['User_id']
  this.store.dispatch(updateProfile({id:this.userId,userProfile:this.form.value}))
  console.log('updated')
}


addOrUpdate(){
  this.router.navigate(['/addorupdate'])
}

home(){
  this.router.navigate([''])
}

signOut(){
  this.router.navigate(['/signin'])
}

}
