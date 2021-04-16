/*
    Darren Dixon
    April 16th, 2021
    Chatlog
    Chat Model File
*/
//MONGOOSE module
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//DEFINE schema
let ChatSchema = mongoose.Schema({
    _id:Number,
    name:String,
    message:String
});

//DEFINE model
let ChatModel = mongoose.model("",ChatSchema,"chatlog");

//EXPORT model
module.exports = ChatModel;