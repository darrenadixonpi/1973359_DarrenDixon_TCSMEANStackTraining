/*
Darren Dixon
Task Tracker
March 29th, 2021
Task Service
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http:HttpClient) { }

  retrieveTasks():Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:3000/tasks');
  }

  storeTasks(task:Task):void{
    this.http.post(`http://localhost:3000/tasks`,task).subscribe(data=>console.log(data),data=>console.log(data));
  }

  deleteTask(task:Task):void{
    this.http.delete(`http://localhost:3000/tasks/${task.id}`).subscribe(data=>console.log(data),data=>console.log(data));
  }
}
