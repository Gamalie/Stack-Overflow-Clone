import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddedUserSuccess, LogInuser, LoggedInUserSuccess, NewUsers, Users } from 'src/app/Interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient) { }

  addUser(newUser:NewUsers):Observable<AddedUserSuccess>{
    console.log(newUser)
    return this.http.post<AddedUserSuccess>('http://localhost:4000/user',newUser)
  }

  logInUser(logInuser:LogInuser):Observable<LoggedInUserSuccess>{
    return this.http.post<LoggedInUserSuccess>('http://localhost:4000/user/login',logInuser)
  }

}





