/*
    Darren Dixon
    04/15/2021
    Call Record Analysis
    Main JS File
*/
//load modules
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;  //create reference
const url = "mongodb://localhost:27017/callsDB";
const mongooseDbOption = { //to avoid warnings
    useNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect(url,mongooseDbOption); //ready to connect
let db = mongoose.connection; //connect to database
let jsonFilePath = "call_data.json";

//read from JSON file
const callsJSON = JSON.parse(fs.readFileSync(jsonFilePath));
//console.log(JSON.stringify(callsJSON));

db.on("error",(err)=>console.log(err));
db.once("open",()=>{

    //define schema
    let CallSchema = mongoose.Schema({
        _id:Number,
        source:String,
        destination:String,
        sourceLocation:String,
        destinationLocation:String,
        callDuration:String,
        roaming:String,
        callCharge:String
    });
    //create the model
    db.createCollection("Calls");
    let Call = mongoose.model("",CallSchema,"Calls");

    
    //creating reference
    callsJSON.forEach((call)=>{
        let c = new Call(call);
        c.save((error,result)=>{
            if(!error){
                console.log("Record inserted successfully"+result);
            }else{
                console.log(error);
            }
            mongoose.disconnect();
        });
    });
});
