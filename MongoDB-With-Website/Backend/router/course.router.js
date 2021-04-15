/*
    Darren Dixon
    04/15/2021
    MongoDB With Website
    Course Router File
*/
const express = require("express");
const router = express.Router(); //router reference
const CourseController = require("../controller/course.controller.js");

router.get("/getAllCourseDetails",CourseController.getAllCourseDetails);
router.post("/deleteCourse",CourseController.deleteCourse);
router.post("/updateCourse",CourseController.updateCourse);
router.post("/addCourse",CourseController.addCourse);

module.exports=router;