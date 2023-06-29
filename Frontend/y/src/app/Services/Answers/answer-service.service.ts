import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AcceptsAnswerSuccess, AddedAnswerSuccess, Answer, DownvoteAnswerSuccess, UpvoteAnswerSuccess } from 'src/app/Interface';

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {
  token=localStorage.getItem('token') as string
  userId=localStorage.getItem('user_id')
  constructor(private router:Router, private http:HttpClient) { }

  addAnswer(id:string,answer:Answer):Observable<AddedAnswerSuccess>{
    return this.http.post<AddedAnswerSuccess>(`http://localhost:4000/answer/${id}`,answer,{headers: new HttpHeaders().set('token',this.token)})

  }

  getAnswers(id:string):Observable<Answer[]>{
    return this.http.get<Answer[]>(`http://localhost:4000/answer/${id}`,{headers: new HttpHeaders().set('token',this.token)})
  }


  markAccepted(id:string):Observable<AcceptsAnswerSuccess>{
    return this.http.put<AcceptsAnswerSuccess>(`http://localhost:4000/answer/${id}`,{},{headers: new HttpHeaders().set('token',this.token)})

  }

  upvoteAnswer(id:string):Observable<UpvoteAnswerSuccess>{
    return this.http.put<UpvoteAnswerSuccess>(`http://localhost:4000/answer/upvote/${id}`,{},{headers: new HttpHeaders().set('token',this.token)})

  }

  downvoteAnswer(id:string):Observable<DownvoteAnswerSuccess>{
    return this.http.put<DownvoteAnswerSuccess>(`http://localhost:4000/answer/downvote/${id}`,{},{headers: new HttpHeaders().set('token',this.token)})

  }
}
