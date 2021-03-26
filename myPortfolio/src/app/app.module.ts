/*
Darren Dixon
MyPortfolio
March 24th, 2021
App Module
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyportfolioComponent } from './myportfolio/myportfolio.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyAuthGuard } from './MyAuthGuard';
import { userList } from './userInfoData-module';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    SignuppageComponent,
    DashboardComponent,
    MyportfolioComponent,
    AboutmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [MyAuthGuard,userList],
  bootstrap: [AppComponent]
})
export class AppModule { }
