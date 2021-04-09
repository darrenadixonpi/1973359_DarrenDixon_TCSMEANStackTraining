/*
    Darren Dixon
    April 9th, 2021
    Task Planner
    Main JS File
*/
const http = require("http");
const fs = require("fs");
const url = require("url");
const taskModule = require("./task_module");
const port = 9999;

//Don't forget to run with nodemon task_planner.js !

let server = http.createServer((req,res)=> {
    //console.log(req.url)
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    if(req.url != "/favicon.ico"){
        res.write(`
        <form style="border:1px solid black; width:300px;margin:auto;text-align:center;">
            <h3>Add Task</h3><hr/>
            Employee ID: <input type="number" name="empID" id="empID"/><br/>
            Task ID: <input type="number" name="taskID" id="taskID"/><br/>
            Description: <input type="text" name="taskInfo" id="taskInfo"/><br/>
            Deadline: <input type="date" name="deadline" id="deadline"/><br/>
            <button type="submit" value="Add" formaction="/store" method="get">Add</button>
            <button type="reset" value="Clear">Clear</button><br/>
        </form><br/>

        <form style="border:1px solid black; width:300px;margin:auto;text-align:center;">
            <h3>Delete Task</h3><hr/>
            Task ID: <input type="text" name="taskID" id="taskID"/><br/>
            <button type="submit" value="Delete" formaction="/delete" method="get">Delete</button>
            <button type="reset" value="Clear">Clear</button><br/>
        </form><br/>

        <form style="border:1px solid black; width:300px;margin:auto;text-align:center;">
            <h3>Display Tasks</h3><hr/>
            <button type="submit" value="Display" formaction="/display">Display</button>
        </form><br/>
        `);
        if(req.url.includes("/store")){
            let data = url.parse(req.url,true).query;
            // take the value from url 
            // convert to object
            let task = {};
            task.empID = data.empID;
            task.taskID = data.taskID;
            task.taskInfo = data.taskInfo;
            task.deadline = data.deadline;
            //console.log(task);  
            // read from json file
            let tasksString = fs.readFileSync("tasks.json");
            let tasks = JSON.parse(tasksString);
            //console.log(tasks);
            // store records in object using push method
            taskModule.addTask(tasks,task);
            //convert to string
            tasksString = JSON.stringify(tasks); 
            // store using fs module. 
            fs.writeFileSync("tasks.json",tasksString);
        }else if(req.url.includes("/delete")){
            let data = url.parse(req.url,true).query;
            // read from file 
            let tasksString = fs.readFileSync("tasks.json");
            // convert to json
            let tasks = JSON.parse(tasksString);
            // check value using iterator or loop
            // delete task
            // if id not present display error
            taskModule.deleteTask(tasks,data.taskID);
            // store in file using fs module.
            tasksString = JSON.stringify(tasks);
            fs.writeFileSync("tasks.json",tasksString); 

        }else if(req.url.includes("/display")){
            // read from file 
            let tasksString = fs.readFileSync("tasks.json");
            // convert to json 
            let tasks = JSON.parse(tasksString);
            let table = `
            <table id=tasksTable style="width:400px;margin:auto;border:1px solid black;text-align:center;">
                <thead><tr>
                    <th style="border:1px solid black;">Emp ID</th>
                    <th style="border:1px solid black;">Task ID</th>
                    <th style="border:1px solid black;">Description</th>
                    <th style="border:1px solid black;">Deadline</th>
                </tr></thead>`;
            tasks.forEach(function(element){
                table += `
                <tr>
                    <td style="border:1px solid black;">${element.empID}</td>
                    <td style="border:1px solid black;">${element.taskID}</td>
                    <td style="border:1px solid black;">${element.taskInfo}</td>
                    <td style="border:1px solid black;">${element.deadline}</td>
                </tr>`;
            });
            table += `</table>`;
           res.end(table);
        }
    }
    //res.end(`<div style="text-align:center;">Mess with your tasks!</div>`);
});

server.listen(port,()=>console.log(`Server running on port number ${port}`));