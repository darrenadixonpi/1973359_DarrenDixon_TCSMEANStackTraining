import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';

const routes: Routes = [
  {path:"\signup",component:SignuppageComponent},
  {path:"\login",component:LoginpageComponent},
  {path:"\aboutme",component:AboutmeComponent},
  {path:"\home",component:DashboardComponent},  
  {path:"",redirectTo:"\home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
