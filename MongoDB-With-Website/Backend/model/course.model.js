/*
    Darren Dixon
    04/15/2021
    MongoDB With Website
    Course Model File
*/
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let CourseSchema = mongoose.Schema({
    _id:Number,
    c_name:String,
    description:String,
    price:Number
});

let CourseModel = mongoose.model("",CourseSchema,"Courses");

module.exports = CourseModel;