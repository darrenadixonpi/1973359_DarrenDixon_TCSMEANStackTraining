//load required modules
const app = require("express")();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 9999;

//middleware - module to load before user requests from server
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//static chat array data

let chatLog = [
    {"_id":1,"message":"Test string 1"},
    {"_id":2,"message":"Test string 2"}
];

let users = [
    {"_id":1,"username":"Ravi","password":"Ravi","chatLog":chatLog},
    {"_id":2,"username":"Raj","password":"Raj","chatLog":chatLog}
];

let curUser = "";
let userJSON = {};

//SOCKET.IO
io.on("connection",(socket)=>{
    console.log("Client connected to application...");

    socket.on("data message",(msg)=>{
        userJSON = msg;
    });
});


//get methods
app.get("/",(req,res)=>{
    //console.log(__dirname);
    //console.log(__dirname+"/login.html");
    res.sendFile(__dirname+"/index.html");
});

app.get("/login",(req,res)=>{
    //console.log(__dirname);
    //console.log(__dirname+"/login.html");
    res.sendFile(__dirname+"/login.html");
});

app.get("/signup",(req,res)=>{
    //console.log(__dirname);
    //console.log(__dirname+"/login.html");
    res.sendFile(__dirname+"/signup.html");
});

app.post("/checkLogin",(req,res)=>{
    //GET login data from webpage
    let user = req.body.user;
    let pass = req.body.pass;

    //CHECK login info
    res.send("Checking login info..."+user);
    
    let found = false;
    users.forEach(function (element){
        if(element.username == user && element.password == pass){
            console.log(`User found!\nUser info: ${JSON.stringify(element)}`);
            found = true;
        }
    });

    //MONGO




    if(!found){
        console.log("Username or password may be incorrect.");
    }else{
        curUser = user;
        res.send(__dirname+"/userChatLog.html");
    }
});

app.post("/checkLogin",(req,res)=>{
    //GET login data from webpage
    let user = req.body.user;
    let pass = req.body.pass;

    //CHECK login info
    res.send("Checking login info..."+user);
    
    let found = false;
    users.forEach(function (element){
        if(element.username == user){
            console.log("User found! Please try a new user.");
            found = true;
        }
    });

    //MONGO




    if(!found){
        users.push({"_id":users.length,"username":user,"password":pass,"chatLog":[]});
        console.log("User successfully added!");
        //MONGO

    }

    
});


app.get("/allUsers",(req,res)=>{
    res.json(users);
});

//post methods
//Data format {"custID":id,"cname":"name","age":age}
app.post("/storeUser",(req,res)=>{
    //console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.send("Post method called...");
});

//put method: to update records
//Data format {"custID":id,"age":age}
app.put("/",(req,res)=>{
    let cid = req.body.custID;
    let cage = req.body.age;
    let flag = 0;
    users.find(c=>{
        if(c.custID==cid){
            c.age=cage;
            flag++
        }
    });
    if(flag==0){
        res.send("Customer not found!");
    }else{
        res.send("Age updated successfully!");
    }
    console.log(users);
});

//Passing value using path para concept
app.delete("/deleteCustomer/:cid",(req,res)=>{
    let cid = parseInt(req.params.cid);
    let flag,index,cIndex = 0;
    users.forEach(function(element){
        if(element.custID == cid){
            flag++;
            cIndex = index;
        }
        index++;
    });
    if(flag==0){
        res.send("Customer not found!");
    }else{
        users.splice(cIndex,1);
        res.send("Customer deleted successfully!");
    }
    console.log(users);
});

//start server
http.listen(port,()=>console.log(`Server running on port number ${port}`));
