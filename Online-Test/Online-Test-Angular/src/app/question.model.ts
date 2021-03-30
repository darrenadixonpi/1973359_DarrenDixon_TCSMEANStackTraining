/*
Darren Dixon
Online Test
March 29th, 2021
Question Interface
*/
//QUESTION INTERFACE - Used to store a question
export class Question{
    constructor(
        public question:string,
        public choices:string[],
        public correctAnswer:number
    ){}
}