/*
    Darren Dixon
    April 9th, 2021
    Task Planner
    Task Module JS File
*/
exports.addTask = function addTask(tasks,task){
    let duplicate = false;
    tasks.forEach(function(element){
        if(task.taskID === element.taskID){
            duplicate = true;
        }
    });
    if(!duplicate){
        tasks.push(task);
    }
    else{
        console.log("Duplicate task ID!");
    }
};

exports.deleteTask = function deleteTask(tasks,taskID){
    let index = 0;
    tasks.forEach(function (element){
        if(taskID === element.taskID){
            tasks.splice(index);
            console.log("Task successfully deleted");
            return;
        }
        index++;
    });
};