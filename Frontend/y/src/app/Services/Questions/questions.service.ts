import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Users, Questions, Answer } from 'src/app/Interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuestionsService {

//   action: 'allQuestions' | 'oneQuestion' = 'oneQuestion'
//   index!: number;
//   constructor(private router:Router){

//   }


//   Users:Users[]=[
//     {
//       UserId:1,
//       UserName:'user1',
//       Role:"admin",
//       Email:'user@1gmail.com',
//       Password:'132678'
//     },
//     {
//       UserId:2,
//       UserName:'user2',
//       Role:"user",
//       Email:'user@2gmail.com',
//       Password:'132678'
//     },
//     {
//       UserId:3,
//       UserName:'user3',
//       Role:"admin",
//       Email:'user@3gmail.com',
//       Password:'132678'
//     },
//     {
//       UserId:4,
//       UserName:'user4',
//       Role:"admin",
//       Email:'user@4gmail.com',
//       Password:'132678'
//     },
//     {
//       UserId:5,
//       UserName:'user5',
//       Role:"admin",
//       Email:'user@5gmail.com',
//       Password:'132678'
//     }
//   ]

//  Questions:Questions[]=[
//     {
//     UserId:2,
//     QuestionId:1,
//     Title:'Best Coding Language?',
//     Body:'Regardless of your liking and taste try to choose...',
//     Vote:3,
//     Answers:1,
//     Tag:[{
//       TagBody:'Javascript'
//       },
//         {
//         TagBody:'Python'
//           }
//       ]
//     },
//     {
//       UserId:2,
//       QuestionId:2,
//       Title:'I keep getting this bug in Python "pycharm..?"',
//       Body:'Pycharm is stopping evrytime I type my methods.What could be the problem',
//       Vote:20,
//       Answers:6,
//       Tag:[{
//         TagBody:'Java'
//           },
//           {
//           TagBody:'Javascript'
//             }
//         ]
        
          
//       },
//       {
//         UserId:3,
//         QuestionId:3,
//         Title:'My server has stopped sending responses',
//         Body:'I have been sending  a get request but there is no response, what could be the problem',
//         Vote:7,
//         Answers:3,
//         Tag:[{
//           TagBody:'C++'
//             },
//             {
//             TagBody:'React'
//               }
//           ]
//         }
// ]

// Answers:Answer[]=[
//     {  
//       QuestionId:1,
//       AnswerId:1,
//       Body:"I think the a new version of the language is what you need",
//       Vote:5
//     },
//     { 
//       QuestionId:1,
//       AnswerId:2,
//       Body:"What if you uninstall and install again",
//       Vote:1
//     }
// ]

  // question!:Observable<Questions[]>
//   user:Users[]=[]
//   question!:Questions[]
  
//   ngOnInit():Observable<Questions[]>{
//     this.question = this.Questions
//     return of(this.question)
//   }

// Question!:Questions
// singleQuestion(id:number):Observable<Questions>{
//     this.Question=this.Questions.find(quest=>quest.QuestionId===id)as Questions
//     this.router.navigate(['/question'])
//     return of(this.Question)
//   }

  // updateQuestion(id:number):Observable<Questions[]>{
  //   this.Question=this.Questions.find(quest=>quest.QuestionId===id)as Questions

  //   return (this.Question[])

  // }

//   deleteQuestion(id:number):Observable<Questions[]>{
//     this.index= this.Questions.indexOf(this.Questions.find(quest=>quest.QuestionId===id) as Questions)
//     let deleteQuest:Questions[]=this.Questions.splice(this.index,1) 
//        return of(deleteQuest)
//   }
// }

// User Test

// user!:Users
// oneUser!:Users[]

// registerUsers(users:Users):Observable<Users[]>{
//   this.Users.push(users)
//   return of(this.Users)
// }

// userLogIn(){

// }

// getAllUsers():Observable<Users[]>{
//   return of(this.Users)
// }

// getOneUser(id:number):Observable<Users>{
//   this.user=this.Users.find(user=>user.UserId===id) as Users
//    return of(this.user) 
// }

// deleteOneUser(id:number):Observable<Users[]>{
//   let index=this.Users.indexOf(this.Users.find(user=>user.UserId===id) as Users)
//    let newUsers:Users[]=this.Users.splice(index,1) 
//    return of(newUsers) 
// }

