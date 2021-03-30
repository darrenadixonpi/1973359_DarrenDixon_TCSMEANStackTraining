import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTrackerComponent } from 'src/app/task-tracker/task-tracker.component';

const routes: Routes = [
  {path:"tasklist",component:TaskTrackerComponent},
  {path: "", redirectTo:"tasklist",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
