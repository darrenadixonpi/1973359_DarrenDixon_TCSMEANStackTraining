/*
Darren Dixon
Online Test
March 29th, 2021
Exam Interface
*/
import { Question } from "./question.model";

//EXAM INTERFACE - Used to store an exam
export class Exam{
    constructor(
        public title:string,
        public questions:Question[]
    ){}
}