/*
Darren Dixon
Simply Blogging
March 16th, 2021 
Add-Blog script
*/
//function used to add the newly-created-blog onto the webpage.
function getBlogData(){
    //initializing counters for number of blogs and number of rows
    //the rows will have 3 columns
    var blogCount = 0;
    var rowCount = 0;

    //retrieve blog data from local storage
    var blogData = JSON.parse(localStorage.getItem("blogData"));
    var tempBlog = {};
    var tempBlogTitle = "";
    var tempBlogArticles = "";
    var tempBlogImage = "";

    //for each blog object, add it to the table HTML
    blogData.forEach(function(element){
        blogCount++;
        rowCount = Math.floor((blogCount-1) / 3);
        tempBlog = JSON.parse(element);
        tempBlogTitle = tempBlog.blogTitle;
        tempBlogArticles = tempBlog.blogArticles;
        tempBlogImage = tempBlog.blogImage;

        //column and row of the blog display
        var tempRow = "";
        var tempCol = "";
        //if blogCount % 3 == 0, 1 or 2, it is the third, first, or second column of a row.
        switch(blogCount % 3){
            case 0:
                //console.log("row"+rowCount.toString());
                tempRow = document.getElementById("row"+rowCount.toString());
                tempCol = document.createElement("div");
                tempCol.className = "col-sm";
                break;

            case 1:
                //console.log("row"+rowCount.toString());
                tempRow = document.createElement("div");
                tempRow.className = "row";
                tempRow.id = "row"+rowCount.toString();
                tempCol = document.createElement("div");
                tempCol.className = "col-sm";
                break;

            case 2:
                //console.log("row"+rowCount.toString());
                tempRow = document.getElementById("row"+rowCount.toString());
                tempCol = document.createElement("div");
                tempCol.className = "col-sm";
                break;
        }

        //This is where we will add the blog HTML onto the container tag.
        var blogContent = document.getElementById("blogContent");

        //container for the whole blog
        var tempBlogDiv = document.createElement("div");
        tempBlogDiv.className = "container border";

        //blog title
        var tempBlogTitleElement = document.createElement("h5");
        tempBlogTitleElement.textContent = tempBlogTitle;

        //blog articles
        var tempBlogArticlesElement = document.createElement("p");
        tempBlogArticlesElement.textContent = tempBlogArticles;

        //blog image
        var tempBlogImageElement = document.createElement("img");
        tempBlogImageElement.src = tempBlogImage;
        tempBlogImageElement.className = "img-thumbnail";

        //add the elements to the blog container
        //we need a div container to contain the title element because of Bootstrap styling
        tempTitleContainer = document.createElement("div");
        tempTitleContainer.appendChild(tempBlogTitleElement);
        tempBlogDiv.appendChild(tempTitleContainer);
        //hr element is to leave a clean line between the blog title and the rest of the blog
        tempBlogDiv.appendChild(document.createElement("hr"));
        tempBlogDiv.appendChild(tempBlogArticlesElement);
        tempBlogDiv.appendChild(tempBlogImageElement);

        //add the blog container to the blog-container-container
        tempCol.appendChild(tempBlogDiv);
        //If blogCount % 3 == 0, 1 or 2, it is the third, first, or second column of a row.
        switch(blogCount % 3){
            case 0:
                tempRow.appendChild(tempCol);
                break;

            case 1:
                tempRow.appendChild(tempCol);
                blogContent.appendChild(tempRow);
                break;

            case 2:
                tempRow.appendChild(tempCol);
                break;
        }   
        /* THIS IS A BAD WAY TO CODE, PLEASE DO NOT DO THIS...
        blogContent.innerHTML += 
        "<div class=\"blog\"><span>"
        +tempBlogTitle+"</span><p>"+tempBlogArticles+"</p><img src=\""+tempBlogImage+"\"></img></div>";
        */
    });

}

//if there is any blog data, display it
if(localStorage.getItem("blogData") != null){
    getBlogData();
}

//debugging
//localStorage.setItem("test", "5");
//document.getElementById("totalblog").innerHTML += localStorage.getItem("test");