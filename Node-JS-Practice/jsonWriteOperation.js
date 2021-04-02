let fs = require("fs");
let empObj = '{"id": 100,"name": "Ravi","salary": 12000}'

empJSON = JSON.parse(empObj);
console.log(`Id is ${empJSON.id}`);

var empString = JSON.stringify(empJSON);
fs.writeFile("emp.json",empString,(err)=>{
    if(!err){
        console.log("We did it right!");
    }else{
        console.log("NOPE");
    }
});

