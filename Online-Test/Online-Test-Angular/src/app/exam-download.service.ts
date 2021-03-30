/*
Darren Dixon
Online Test
March 29th, 2021
Exam Service
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamDownloadService {

  constructor(public http:HttpClient) { }

  loadExam():Observable<Exam>{
    return this.http.get<Exam>("/assets/exam-questions.json");
  }  

}
