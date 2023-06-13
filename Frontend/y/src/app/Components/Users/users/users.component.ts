import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private userService:UsersService){

  }

  getOneUser(){
    
  }

}
