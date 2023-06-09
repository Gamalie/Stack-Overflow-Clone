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
import { AdminUsersComponent } from './Components/admin/admin-users/admin-users.component';
import { LandingPageComponent } from './Components/LandingPage/landing-page/landing-page.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'',component:HomeComponent},
  {path:'question/:Id',component:QuestionsComponent},
  {path:'addorupdate',component:AddorUpdateComponent},
  {path:'addorupdate/:Id',component:AddorUpdateComponent},
  {path:'answerquestion',component:AnswersComponent},
  {path:'users',component:UsersComponent},
  {path:'qadmin',component:AdminComponent},
  {path:'uadmin',component:AdminUsersComponent},
  {path:'welcome',component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
