/*
Darren Dixon
Team Budget Planning
March 15th, 2021 
Program Managers script
*/
//create Team Budget object and populate it
function addBudget(){
    //empty budget object
    var teamBudgetObject = {};

    //declare budget-variables and get their values
    var clientName = document.getElementById("clientName").value;
    var projectName = document.getElementById("projectName").value;
    var budget = document.getElementById("budget").value;

    //store them in the object
    teamBudgetObject.clientName = clientName;
    teamBudgetObject.projectName = projectName;
    teamBudgetObject.budget = budget;
    console.log(teamBudgetObject);
    return teamBudgetObject;
}

//store Team Budget object into the array of other team budget objects from the session
function storeTeamBudgetData(){
    var teamBudgetObject = addBudget();
    //if the budget data exists, read and add onto it
    if(localStorage.getItem("teamBudgetData") != null){
        console.log("Is not null.");
        var tempBudgetArray = JSON.parse(localStorage.getItem("teamBudgetData"));
        tempBudgetArray.push(JSON.stringify(teamBudgetObject));
        localStorage.setItem("teamBudgetData",JSON.stringify(tempBudgetArray));
     //otherwise, create the Team Budget object array
    }else{
        console.log("Is null.");
        var tempBudgetArray = [];
        tempBudgetArray.push(JSON.stringify(teamBudgetObject));
        localStorage.setItem("teamBudgetData",JSON.stringify(tempBudgetArray));
    }
}

//When a new budget gets added, add the budget!
document.getElementById("addBudget").onclick=function(){storeTeamBudgetData();}

//localStorage.setItem("test", "5");