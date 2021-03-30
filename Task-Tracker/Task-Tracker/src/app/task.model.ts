/*
Darren Dixon
Task Tracker
March 29th, 2021
Task Interface
*/
//TASK INTERFACE - Used to store tasks
export class Task {
    //INDEXING
    [index:string]:string|number;
    constructor(
        public id:string,
        public name:string,
        public info:string,
        public deadline:string
    ){}
}
