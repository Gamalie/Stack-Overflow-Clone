import { Injectable } from '@angular/core';
import { LoggedInUserSuccess } from '../Interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  token!:string |null
  message!:string| null
  userId!:string | null

  constructor() {

   }
   login(res:LoggedInUserSuccess){

    localStorage.setItem('message',res.message)
    localStorage.setItem('token',res.token)
    localStorage.setItem('user_id',res.User_id)
    localStorage.setItem('role',res.Role)
   }


   logout(){
    localStorage.clear()
   }

   isLoggedIn(){
    
    let token = localStorage.getItem('token')
    this.token = token? token:null

    return this.token?true:false
   }
}
