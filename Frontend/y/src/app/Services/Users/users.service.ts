import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddedUserSuccess, DeleteUserSuccess, LogInuser, LoggedInUserSuccess, NewUsers, UpdateProfileSuccess, UserProfile, Users } from 'src/app/Interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token=localStorage.getItem('token') as string
  userId=localStorage.getItem('user_id')

  constructor(private http:HttpClient) { }

  addUser(newUser:NewUsers):Observable<AddedUserSuccess>{
    // console.log(newUser)
    return this.http.post<AddedUserSuccess>('http://localhost:4000/user',newUser)
  }

  logInUser(logInuser:LogInuser):Observable<LoggedInUserSuccess>{
    return this.http.post<LoggedInUserSuccess>('http://localhost:4000/user/login',logInuser)
  }

  updateUser(id:string,updateUser:UserProfile):Observable<UpdateProfileSuccess>{
console.log(id)
    return this.http.post<UpdateProfileSuccess>(`http://localhost:4000/user/${id}`,updateUser,{headers: new HttpHeaders().set('token',this.token)})
  }

  getAllUsers():Observable<Users[]>{
    
    return this.http.get<Users[]>(`http://localhost:4000/user`,{headers: new HttpHeaders().set('token',this.token)})
  }

  deleteUsers(id:string):Observable<DeleteUserSuccess>{
    console.log('one two three')
    return this.http.delete<DeleteUserSuccess>(`http://localhost:4000/user/${id}`,{headers: new HttpHeaders().set('token',this.token)})
  }

 

}





