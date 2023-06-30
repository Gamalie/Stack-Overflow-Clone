import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/States/appState';
import { Users } from 'src/app/Interface';
import { Observable } from 'rxjs';
import { deleteUser, getAllUsers } from 'src/app/States/Actions/usersAction';

import { getAllUserQuestions } from 'src/app/States/Reducers/questionReducer';
import { getAllUser } from 'src/app/States/Reducers/usersReducer';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{
  users!:Observable<Users[]>
  constructor(private router:Router,private store:Store<Appstate>,private route:ActivatedRoute){

  }

  ngOnInit(){

    this.store.dispatch(getAllUsers())  //action name
    this.users = this.store.select(getAllUser)//selector name
    
   
  }

  deleteUser(id:string){
    this.store.dispatch(deleteUser({id}))
    console.log('now')
  }

  addOrUpdate(){
    this.router.navigate(['/addorupdate'])
  }
  

}
