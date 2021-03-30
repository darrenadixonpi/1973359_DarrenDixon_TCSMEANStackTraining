import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamPageComponent } from './exam-page/exam-page.component';

const routes: Routes = [
  {path:"exam-page",component:ExamPageComponent},
  {path:"home",component:DashboardComponent},
  {path:"",redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
