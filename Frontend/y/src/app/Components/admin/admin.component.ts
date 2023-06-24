import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions, Users } from 'src/app/Interface';
// import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  
  // constructor(private questionService:QuestionsService,private userService:UsersService){}

  questions!:Questions[]
  users!:Observable<Users[]>
  ngOnInit(){
    // this.questions= this.questionService.Questions
    // this.users= this.userService.getAllUsers()
  }

  


}
