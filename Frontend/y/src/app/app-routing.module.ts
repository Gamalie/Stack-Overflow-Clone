import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './Components/home/home.component';
import { QuestionsComponent } from './Components/Questions/questions/questions.component';
import { SignupComponent } from './Components/Forms/Signup/signup/signup.component';
import { SigninComponent } from './Components/Forms/Signin/signin/signin.component';
import { AddorUpdateComponent } from './Components/Forms/AddOrUpdate/addor-update/addor-update.component';
import { AnswersComponent } from './Components/Answers/answers/answers.component';
import { UsersComponent } from './Components/Users/users/users.component';
import { AdminComponent } from './Components/admin/admin.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'',component:HomeComponent},
  {path:'question',component:QuestionsComponent},
  {path:'addorupdate',component:AddorUpdateComponent},
  {path:'answerquestion',component:AnswersComponent},
  {path:'users',component:UsersComponent},
  {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
