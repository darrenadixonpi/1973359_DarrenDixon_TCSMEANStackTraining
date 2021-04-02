let fs = require("fs");
var msg = "This is Asynchronous message with fs module.";
fs.writeFile("infoAsync.txt",msg,(err)=>{
    if(!err){
        console.log("Data storage complete!");
    }else{
        console.log("Unable to store data."+err);
    }
});
console.log("Here I am!");