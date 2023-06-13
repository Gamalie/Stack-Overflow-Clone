import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users, Questions, Answer } from 'src/app/Interface';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {

  constructor(private router:Router,private questionService:QuestionsService ){

  } 

  question=this.questionService.Question
  

  }


