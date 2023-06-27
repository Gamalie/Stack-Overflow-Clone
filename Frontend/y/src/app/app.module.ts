import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Components/Forms/Signup/signup/signup.component';
import { SigninComponent } from './Components/Forms/Signin/signin/signin.component';
import { HomeComponent } from './Components/home/home.component';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './Components/Questions/questions/questions.component';
import { AddorUpdateComponent } from './Components/Forms/AddOrUpdate/addor-update/addor-update.component';
import { AnswersComponent } from './Components/Answers/answers/answers.component';
import { UsersComponent } from './Components/Users/users/users.component';
import { AdminComponent } from './Components/admin/admin.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './States/Effects/usersEffects';
import { userReducer } from './States/Reducers/usersReducer';
import { questionReducer } from './States/Reducers/questionReducer';
import { QuestionEffects } from './States/Effects/questionsEffect';

@NgModule({
  declarations: [
    AppComponent,
   
    // AnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SignupComponent,
    SigninComponent,
    HttpClientModule,
    HomeComponent,
    CommonModule,
    QuestionsComponent,
    AddorUpdateComponent,
    AnswersComponent,
    UsersComponent,
    StoreModule.forRoot({user:userReducer,question:questionReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UsersEffects,QuestionEffects])
    // AdminComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
