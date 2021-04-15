/*
    Darren Dixon
    04/15/2021
    MongoDB With Website
    Main Router File
*/
const express = require("express");
const router = express.Router(); //router reference
const MainController = require("../controller/main.controller.js");

router.get("/",MainController.getMainPage);
router.get("/displayCourses",MainController.getDisplayCoursesPage);
router.get("/addCourse",MainController.getAddCoursePage);
router.get("/updateCourse",MainController.getUpdateCoursePage);
router.get("/deleteCourse",MainController.getDeleteCoursePage);

module.exports=router;