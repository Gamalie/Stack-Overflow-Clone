import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Users, Questions, Answer, AddedQuestionSuccess, UpdateQuestionSuccess, DeletedQuestionSuccess} from 'src/app/Interface';

@Injectable({
  providedIn: 'root'
})
export class 
QuestionsService {

  token=localStorage.getItem('token') as string
  userId=localStorage.getItem('user_id')
  constructor(private router:Router, private http:HttpClient){

  }

  addQuestion(question:Questions):Observable<AddedQuestionSuccess>{
    // console.log(question)
    return this.http.post<AddedQuestionSuccess>(`http://localhost:4000/question`,question,{headers: new HttpHeaders().set('token',this.token)})
  }

  getAllQuestions():Observable<Questions[]>{
    // console.log(this.token)
        return this.http.get<Questions[]>('http://localhost:4000/question',{headers: new HttpHeaders().set('token',this.token)})
  }

  getToOneQuestion(questId:string):Observable<Questions>{
    return this.http.get<Questions>(`http://localhost:4000/question/onequest/${questId}`,{headers: new HttpHeaders().set('token',this.token)})
  }

  getOwnQuestion(questId:string):Observable<Questions>{
    return this.http.get<Questions>(`http://localhost:4000/question/onequest/${questId}`,{headers: new HttpHeaders().set('token',this.token)})
  }

  getQuestionByUserId():Observable<Questions[]>{
    // console.log('Userid....')
    return this.http.get<Questions[]>(`http://localhost:4000/question/user`,{headers: new HttpHeaders().set('token',this.token)})
  }

  updateQuestion(question_id:string,question:Questions):Observable<UpdateQuestionSuccess>{
    return this.http.put<UpdateQuestionSuccess>(`http://localhost:4000/question/${question_id}`,question,{headers: new HttpHeaders().set('token',this.token)})
  }

  deleteQuestion(question_id:string):Observable<DeletedQuestionSuccess>{
    console.log(question_id)
      return this.http.delete<DeletedQuestionSuccess>(`http://localhost:4000/question/${question_id}`,{headers: new HttpHeaders().set('token',this.token)})
  }

  deleteQuestionAdmin(question_id:string):Observable<DeletedQuestionSuccess>{
    console.log('admin delete')
    return this.http.delete<DeletedQuestionSuccess>(`http://localhost:4000/question/admin/${question_id}`,{headers: new HttpHeaders().set('token',this.token)})
  }
}


