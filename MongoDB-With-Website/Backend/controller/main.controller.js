/*
    Darren Dixon
    04/15/2021
    MongoDB With Website
    Main Controller File
*/
//modules
const path = require("path");

//Retrieve main page
const getMainPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","..","Frontend","webpages","index.html"));
}

//Retrieve Display Courses page
const getDisplayCoursesPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","..","Frontend","webpages","displayCourses.html"));
}

//Retrieve Add Course page
const getAddCoursePage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","..","Frontend","webpages","addCourse.html"));
}

//Retrieve Update Course page
const getUpdateCoursePage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","..","Frontend","webpages","updateCourse.html"));
}

//Retrieve Delete Course page
const getDeleteCoursePage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","..","Frontend","webpages","deleteCourse.html"));
}

//exports
module.exports={getMainPage,getDisplayCoursesPage,getAddCoursePage,getUpdateCoursePage,getDeleteCoursePage};