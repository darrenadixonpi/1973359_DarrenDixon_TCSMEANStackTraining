/*
    Darren Dixon
    04/15/2021
    MongoDB With Website
    Course Controller File
*/
let CourseModel = require("../model/course.model.js");

//Retrieve all Course details
const getAllCourseDetails = async (req,res)=>{
    let courseArray = [];
    await CourseModel.find({},(error,data)=>{
        if(!error){
            //GET course data
            courseArray = data;
            //SORT course data
            courseArray.sort(function(a,b){
                return (a._id - b._id);
            });

            //DISPLAY table
            let tableHTML = `<table style="border:1px solid black;margin:auto;text-align:center;"> 
                <thead><tr>
                    <th style="border:1px solid black;">Course ID</th>
                    <th style="border:1px solid black;">Name</th>
                    <th style="border:1px solid black;">Description</th>
                    <th style="border:1px solid black;">Price</th>
                </tr></thead>`;

            courseArray.forEach((course)=>{
                tableHTML += `
                <tr>
                    <td style="border:1px solid black;">${course._id}</td>
                    <td style="border:1px solid black;">${course.c_name}</td>
                    <td style="border:1px solid black;">${course.description}</td>
                    <td style="border:1px solid black;">${course.price}</td>
                </tr>`;
            });

            tableHTML += `</table>`;

            //button for the user to go back to display page
            const buttonHTML = `
            <div style="text-align:center;">
                <a href="../displayCourses">Go Back</a>
            </div>`

            //SEND result
            //console.log(tableHTML);
            res.send(tableHTML+buttonHTML);
            //res.send(courseArray);

        }else{
            console.log(error);
            res.status(204).send();
        }
    });
};

//Add Course details
const addCourse = (req,res)=>{
    let course = new CourseModel({
        _id:req.body.courseID,c_name:req.body.name,description:req.body.description,price:req.body.price});
    course.save((error,result)=>{
        if(!error){
            console.log("Record inserted successfully!");
            res.status(204).send();
        }else{
            console.log(error.message);
            res.status(204).send();
        }
    });
};

//Update course details
const updateCourse = (req,res)=>{
    CourseModel.updateOne({_id:req.body.courseID},{$set:{price:req.body.price}},(error,data)=>{
        if(!error){
            console.log("Record update successfully!");
            res.status(204).send();
        }else{
            console.log(error.message);
            res.status(204).send();
        }
    });
};

//Delete course details
const deleteCourse = (req,res)=>{
    CourseModel.deleteOne({_id:parseInt(req.body.courseID)},(error,data)=>{
        if(!error){
            console.log("Record deleted successfully!");
            res.status(204).send();
        }else{
            console.log(error.message);
            res.status(204).send();
        }
    });
};

//exports
module.exports={getAllCourseDetails, addCourse, updateCourse, deleteCourse};