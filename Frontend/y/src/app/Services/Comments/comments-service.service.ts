import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddedCommentSuccess, Comment } from 'src/app/Interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {
  token=localStorage.getItem('token') as string
  constructor(private router:Router, private http:HttpClient) { }

addComment(id:string,comment:Comment):Observable<AddedCommentSuccess>{
  return this.http.post<AddedCommentSuccess>(`http://localhost:4000/comment/${id}`,comment,{headers: new HttpHeaders().set('token',this.token)})

}

getComment(id:string):Observable<Comment[]>{
  return this.http.get<Comment[]>(`http://localhost:4000/comment/${id}`,{headers: new HttpHeaders().set('token',this.token)})
}

}
