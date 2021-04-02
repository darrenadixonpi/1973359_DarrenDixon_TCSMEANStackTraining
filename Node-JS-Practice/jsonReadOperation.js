let fs = require("fs");
let empObj = {};
/*

fs.readFile("emp.json",(err,data)=>{
    if(!err){
        empObj = JSON.parse(data.toString());
        console.log(empObj);
    }else{
        console.log("Oh no error!")
    }
});

*/

empObj = fs.readFileSync("emp.json").toString();
console.log(empObj);

