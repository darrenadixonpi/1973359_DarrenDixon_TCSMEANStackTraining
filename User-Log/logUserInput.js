/*
    Darren Dixon
    April 2nd, 2021
    User Log
    Main file
*/
//node debug fileName.js : USES debugger; statement
//node fileName.js : IGNORES debugger; statement
//DEBUGGER: step (shows logic), cont (runs code until next debugger statement), next (goes to next debugger statement)
            //watch('variableName') watches that variable, use watchers command to display all watchers
//CURRENT VALIDATERS: "string","number","gender","email"
let readSync = require("readline-sync");


module.exports.LogUserInput = class LogUserInput{

    constructor(fileOutput,info,validaters){
        this.fileOutput = fileOutput;
        //if user did not define info or validaters, use default
        if(info === undefined || validaters === undefined){
            console.log("If you want to put your own information types in, \nyou must provide both the info that the questions represent and \ntheir input validaters(string, number, etc). \nSee imported file for validater suggestions.");
            this.info = ["id","first name","last name", "age", "gender", "email"];
            this.validaters = ["number","string","string","number","gender","email"];
            debugger;
        //otherwise populate info and validaters with user-defined info and validaters
        }else{
            this.info = info;
            this.validaters = validaters;
            debugger;
        }
        this.userInfo = {};
    }

    //GET the user's information
    getUserInfo(){
        //variables for validation
        let userInfo = this.userInfo;
        let infoCount = 0;
        let input;
        let validaters = this.validaters;
        //for each info type we are looking for, get input
        this.info.forEach(function(element){
            //validater
            switch(validaters[infoCount]){
                case "string": {
                    do{
                        console.log(`${element} must be a ${validaters[infoCount]}`);
                        input = readSync.question(`Please enter your ${element}: `);
                        debugger;
                    }while(!isNaN(input))
                };
                break;
                case "number": {
                    console.log(`${element} must be a ${validaters[infoCount]}`);
                    input = readSync.questionInt(`Please enter your ${element}: `);
                    debugger;
                };
                break;
                case "gender": {
                    do{
                        console.log(`${element} must be M, F, O, Male, Female, or Other.`);
                        input = readSync.question(`Please enter your ${element}: `);
                        debugger;
                    }while(input !== "M" && input !== "F" && input !== "O" && input !== "Male" && input !== "Female" && input !== "Other")
                };
                break;
                case "email": {
                    console.log(`${element} must be a valid ${validaters[infoCount]}.`);
                    input = readSync.questionEMail(`Please enter your ${element}: `);
                    debugger;
                };
                break;
            }
            userInfo[element]=input;
            debugger;
            infoCount++;
        });
        //get date and time of when user info was gathered
        let curDate = new Date();
        userInfo["date"] = curDate.toLocaleDateString();
        userInfo["time"] = curDate.toLocaleTimeString();
        debugger;
        this.userInfo = userInfo;
    }

    //STORE user information in the user-provided filename
    storeUserInfo(){
        //import file system module and get user info
        let fs = require("fs");
        this.getUserInfo();
        debugger;
        let userInfo = JSON.stringify(this.userInfo);

        //grab the original user data from the user-defined file and append new user data
        let userDataArray;
        let fileOutput = this.fileOutput;
        //if the file exists, read from it, otherwise skip
        try{
            if(fs.existsSync(fileOutput)){
                userDataArray = fs.readFileSync(fileOutput).toString();
                userDataArray = JSON.parse(userDataArray);
            }
        }catch(err){
            console.error(err);
        }
        debugger;
        //if there is no file or if the file is empty, make an empty userDataArray
        if(userDataArray === undefined){
            userDataArray = [];
        }
        debugger;
        let userJSON = JSON.parse(userInfo);
        debugger;
        userDataArray.push(userJSON);
        debugger;
        //string formatter: if we use regular stringify() on userDataArray, it is all in one line.
        let userString = "";
        let curUser = 0;
        userString += "[\n\t";
        userDataArray.forEach(function(element){
            userString+=JSON.stringify(element);
            curUser++;
            //if not the last object, add a comma
            if(curUser !== userDataArray.length){
                userString+=",\n\t";
            }else{
                userString+="\n";
            }
        })
        userString += "]";
        debugger;

        fs.writeFile(fileOutput,userString,(err)=>{
            if(!err){
                console.log(`User data successfully written to ${fileOutput}`);
            }else{
                console.log(`Error in storing user data: ${err}`);
            }
        });
    }

}