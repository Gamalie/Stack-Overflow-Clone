import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddedUserSuccess, LogInuser, LoggedInUserSuccess, Newuser, Users } from 'src/app/Interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient) { }

 

  // Users:Users[]=[
  //   {
  //     UserId:1,
  //     UserName:'user1',
  //     Role:"admin",
  //     Email:'user@1gmail.com',
  //     Password:'132678'
  //   },
  //   {
  //     UserId:2,
  //     UserName:'user2',
  //     Role:"user",
  //     Email:'user@2gmail.com',
  //     Password:'132678'
  //   },
  //   {
  //     UserId:3,
  //     UserName:'user3',
  //     Role:"admin",
  //     Email:'user@3gmail.com',
  //     Password:'132678'
  //   },
  //   {
  //     UserId:4,
  //     UserName:'user4',
  //     Role:"admin",
  //     Email:'user@4gmail.com',
  //     Password:'132678'
  //   },
  //   {
  //     UserId:5,
  //     UserName:'user5',
  //     Role:"admin",
  //     Email:'user@5gmail.com',
  //     Password:'132678'
  //   }
  // ]

  addUser(newUser:Newuser):Observable<AddedUserSuccess>{
    return this.http.post<AddedUserSuccess>('http://localhost:4000/user',newUser)
  }

  loginUser(logInuser:LogInuser):Observable<LoggedInUserSuccess>{
    return this.http.post<LoggedInUserSuccess>('http://localhost:4000/user/login',logInuser)
  }


  // User Test

  user!:Users
  oneUser!:Users[]

}

//   registerUsers(users:Users):Observable<Users[]>{
//     this.Users.push(users)
//     return of(this.Users)
//   }

//   userLogIn(){

//   }

//   getAllUsers():Observable<Users[]>{
//     return of(this.Users)
//   }

//   getOneUser(id:number):Observable<Users>{
//     this.user=this.Users.find(user=>user.UserId===id) as Users
//      return of(this.user) 
//   }
 
//   deleteOneUser(id:number):Observable<Users[]>{
//     let index=this.Users.indexOf(this.Users.find(user=>user.UserId===id) as Users)
//      let newUsers:Users[]=this.Users.splice(index,1) 
//      return of(newUsers) 
//   }

// }



