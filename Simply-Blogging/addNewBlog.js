/*
Darren Dixon
Simply Blogging
March 16th, 2021 
Add-Blog script
*/
//function to load blog image

//We must declare blogImage as a global variable to be used in multiple functions
var blogImage = "";

/*
Reads blog image input as a URL to store it into the blogObject.
We must do this because the image will normally return a blog/null
URL when using the ObjectURL function, and this does not work as intended...
*/
function loadBlogImage(tempBlogImage){
    

    var imageInput = document.querySelector("#blogImage");
    //console.log(imageInput);
    var imageFile = imageInput.files[0];
    //console.log(imageFile);
    var imageReader = new FileReader();

    //function to read the image input data and store it as a URL
    imageReader.onload = function(){
        //console.log("File Reader is running.");
        blogImage = imageReader.result;
        //console.log(blogImage);
    };
    //This will run the function above /\/\
    imageReader.readAsDataURL(imageFile);
}

//create Blog object and populate it
function addBlog(){
    //empty blog object
    var blogObject = {};

    //const blogImage = imageInput.files;

    //declare blog-variables and get their values
    var blogTitle = document.getElementById("blogTitle").value;
    var blogArticles = document.getElementById("blogArticles").value;
    //var blogImage = URL.createObjectURL(imageFile);
    //console.log(blogImage);

    //store them in the object
    blogObject.blogTitle = blogTitle;
    blogObject.blogArticles = blogArticles;
    blogObject.blogImage = blogImage;
    //console.log(blogObject);
    return blogObject;
}

//store blog object into the array of other blog objects from the session
function storeBlogData(){
    var blogObject = addBlog();
    //if the blog data exists, read and add onto it
    if(localStorage.getItem("blogData") != null){
        //console.log("Is not null.");
        var tempBlogArray = JSON.parse(localStorage.getItem("blogData"));
        tempBlogArray.push(JSON.stringify(blogObject));
        localStorage.setItem("blogData",JSON.stringify(tempBlogArray));
     //otherwise, create the blog object array
    }else{
        //console.log("Is null.");
        var tempBlogArray = [];
        tempBlogArray.push(JSON.stringify(blogObject));
        localStorage.setItem("blogData",JSON.stringify(tempBlogArray));
    }
}

//When a new blog gets added, add the blog!
document.getElementById("addBlog").onclick=function(){storeBlogData();}

//localStorage.setItem("test", "5");