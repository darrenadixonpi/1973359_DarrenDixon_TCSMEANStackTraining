/*
Darren Dixon
Team Budget Planning
March 15th, 2021 
Finance Teams script
*/
//script used to populate the Finance Teams budget table.
function getBudgetData(){
    var teamBudgetData = JSON.parse(localStorage.getItem("teamBudgetData"));
    var tempTeam = "";
    var tempClientName = "";
    var tempProjectName = "";
    var tempBudget = "";

    //for each budget object, add it to the table HTML
    teamBudgetData.forEach(function(element){
        tempTeam = JSON.parse(element);
        tempClientName = tempTeam.clientName;
        tempProjectName = tempTeam.projectName;
        tempBudget = tempTeam.budget;
        totalBudget += parseInt(tempBudget);
        table.innerHTML += "<tr><td>"+tempClientName+"</td><td>"+tempProjectName+"</td><td>"+tempBudget+"</td></tr>";
    });

    document.getElementById("totalBudget").innerHTML += totalBudget;
}

//set total budget to 0 and assign budget table element
var table = document.getElementById("budgetTable");
var totalBudget = 0;

//if there is any team budget data, display it
if(localStorage.getItem("teamBudgetData") != null){
    getBudgetData();
}

//debugging
//localStorage.setItem("test", "5");
//document.getElementById("totalBudget").innerHTML += localStorage.getItem("test");