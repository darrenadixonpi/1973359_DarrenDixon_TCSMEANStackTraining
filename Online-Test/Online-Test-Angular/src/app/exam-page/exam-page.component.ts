/*
Darren Dixon
Online Test
March 29th, 2021
Exam Component
*/
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExamDownloadService } from '../exam-download.service';
import { Exam } from '../exam.model';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {

  public exam = new Exam("",[]);
  //public questions:Array<Question>=[];

  constructor(public examDownload:ExamDownloadService) { }

  ngOnInit():void {
    this.examDownload.loadExam().subscribe(data=>this.exam=data,error=>console.log(error));
    //console.log(this.exam);
  }

  gradeExam(exam:NgForm):void{
    //Need index for interation and to get questions
    //before iterating through the exam input objects
    let questions = this.exam.questions;
    let curQuestion = 0; 
    let correctAnswers = 0;
    let examResults = document.getElementById("examResults") as HTMLElement;
    //NgForm.value is just an object, so we can
    //iterate through its keys to look for all
    //of the user-input
    Object.keys(exam.value).forEach(function(choice){
      let question = questions[curQuestion];
      let answerChosen = exam.value[choice];
      let correctAnswer = question.choices[question.correctAnswer];
      //If the answer is right, GREEN!
      if(answerChosen == correctAnswer){
        //alert("You got this one right!");
        let element:HTMLElement = document.getElementById(question.question+answerChosen) as HTMLElement;
        element.innerText += "You picked the right answer!";
        element.style.color = "green";
        correctAnswers++;
        //Otherwise, RED!
      }else{
        //alert(`You picked ${answerChosen} and the correct answer was ${correctAnswer}`);
        let element:HTMLElement = document.getElementById(question.question+answerChosen) as HTMLElement;
        let element2:HTMLElement = document.getElementById(question.question+correctAnswer) as HTMLElement;
        element.innerText += "You picked the wrong answer!";
        element.style.color = "red";
        element2.innerText += "This is the right one!";
        element2.style.color = "green";
      }
      curQuestion++;
    })
    //PASS OR FAIL
    let passLimit = Math.floor(this.exam.questions.length*0.75);
    if(correctAnswers >= passLimit){
      examResults.innerText = "";
      examResults.style.color = "green";
      examResults.innerText += `You passed: ${correctAnswers}/${passLimit}`;
    }else{
      examResults.innerText = "";
      examResults.style.color = "red";
      examResults.innerText += `You failed: ${correctAnswers}/${passLimit}`;
    }
  }

  //RESET Exam elements to default
  resetExam(){
    let examResults = document.getElementById("examResults") as HTMLElement;
    let cElement:HTMLElement;
    //reset each element containing the "rightness" of an answer
    this.exam.questions.forEach(function (q){
      q.choices.forEach(function (c){
        cElement = document.getElementById(q.question+c) as HTMLElement;
        cElement.innerText = "";
      })
    })
    examResults.innerText = "";
  }
}
