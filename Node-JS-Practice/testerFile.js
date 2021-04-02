/*
    Darren Dixon
    April 2nd, 2021
    User Log
    Import file
*/
//IMPORT main file
let userInput = require("./logUserInput");

//FILEPATH for your user-data file
let userDataFile = "projectTest2.json";

let user = new userInput.LogUserInput(userDataFile);
user.storeUserInfo();