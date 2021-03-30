/*
Darren Dixon
Task Tracker
March 29th, 2021
TaskTracker Component
*/
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/task.model';
import { TaskService } from 'src/app/task-server.service';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {

  public tasks:Array<Task>=[];
  public tempTask = new Task("","","","");
   body = document.getElementById("taskBody");
  public displayedColumns: string[] = ['id','name','info','deadline','delete'];

  constructor(public taskServer:TaskService) { }

  ngOnInit(): void {
    this.rePopulateTasks();
  }

  //RETRIEVE tasks from the task service
  rePopulateTasks():void{
    this.tasks = [];
    this.taskServer.retrieveTasks().subscribe(data=>this.tasks=data,error=>console.log(error));
  }

  //ADD a task
  addTask(task:NgForm):void{
    //get task form input
    let tempTask=this.tempTask;
    Object.keys(task.value).forEach(function(element){
      tempTask[element] = task.value[element];
      //alert(tempTask[element]);
    });
    //console.log(tempTask);
    if(this.tasks === null){
      this.tasks = [];
    }
    this.tasks.push(tempTask);
    //console.log(this.tasks);
    this.taskServer.storeTasks(this.tasks[this.tasks.length-1]);
    this.rePopulateTasks();
  }

  //REMOVE a task
  removeTask(task:Task):void{
    let tasks = this.tasks;
    let index = 0;
    tasks.forEach(function(element){
      if(task.id === element.id){
        tasks.splice(index,1);
      }
      index++;
    });
    this.tasks = tasks;
    this.taskServer.deleteTask(task);
    this.rePopulateTasks();
  }
}
