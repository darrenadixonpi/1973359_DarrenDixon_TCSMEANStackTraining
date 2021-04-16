/*
    Darren Dixon
    04/15/2021
    MongoDB With Website
    Main JS File
*/
//npm install express body-parser mongoose
const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const port = 9999;
const db = "nodeDB";

//DB URL Details
const url = "mongodb://localhost:27017/"+db;

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//DB connection without warning
const mongooseDbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(url,mongooseDbOption); //ready to connect

//Connect the db
mongoose.connection;

//link to router module
var CourseRouter = require("./Backend/router/course.router.js");
var mainRouter = require("./Backend/router/main.router.js");

//Middleware
app.use("/course",CourseRouter);
app.use("/",mainRouter);

app.listen(port,()=>console.log(`Server running on port number ${port}`));
