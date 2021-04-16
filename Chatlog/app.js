/*
    Darren Dixon
    April 16th, 2021
    Chatlog
    HTTP Server File
*/

//LOAD modules
const mongoose = require("mongoose");
let ChatModel = require("./chat.model.js");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
//PORT
const port = 9999;

//****************BEGIN MONGOOSE*****************/
mongoose.Promise = global.Promise;  //create reference
const url = "mongodb://localhost:27017/chatlogDB";
const mongooseDbOption = { //to avoid warnings
    useNewUrlParser:true,
    useUnifiedTopology:true
};
//CONNECT to db
mongoose.connect(url,mongooseDbOption); //ready to connect
mongoose.connection; //connect to database

//CREATE HTML table for chatlog
function createChatTable(chatLog){
    let chatTableHTML = `<table style="border:1px solid black;margin:auto;text-align:center;"> 
    <thead><tr>
        <th style="border:1px solid black;">Chat ID</th>
        <th style="border:1px solid black;">Name</th>
        <th style="border:1px solid black;">Message</th>
    </tr></thead>`;

    chatLog.forEach((message)=>{
        chatTableHTML += `
        <tr>
            <td style="border:1px solid black;">${message._id}</td>
            <td style="border:1px solid black;">${message.name}</td>
            <td style="border:1px solid black;">${message.message}</td>
        </tr>`;
    });

    chatTableHTML += `</table><br/>`;
    return chatTableHTML;
}

//GET chatlog
function getChatLog(res){
    let chatLog = [];
    ChatModel.find({},(find_error,log_data)=>{
        if(!find_error){
            //get the chat log data
            chatLog = log_data;
            //create an HTML table and back button with the data
            let chatTable = createChatTable(chatLog);
            chatTable += `<div style="text-align:center;"><a href="/">Go Back</a></div>`;
            //send the table and button to the user
            res.end(chatTable);
        }else{
            console.log(find_error);
        }

    });
};

//STORE user chat message
function storeChatMessage(msg){
    ChatModel.find({},(find_error,log_data)=>{
        if(!find_error){
            //get current chatlog length
            msg._id = log_data.length+1;
            //create new chat message model to store in db
            let m = new ChatModel(msg);
            //store in db
            m.save((save_error,chat_data)=>{
                if(!save_error){
                    console.log("Message recorded successfully: "+chat_data);
                }else{
                    console.log(save_error);
                }
            });
        }else{
            console.log(find_error);
        }
    });
};
//****************END MONGOOSE*****************/

//****************BEGIN EXPRESS/SOCKET.IO*****************/
//HOMEPAGE
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

//DISPLAY chatlog in table
app.get("/getChatLog",(req,res)=>{
    //console.log("Getting chatlog!");
    getChatLog(res);
});

//SOCKET connetions for data sending to the server
io.on("connection",(socket)=>{
    //when the server receives a user message, store it
    socket.on("user message",(msg)=>{
        storeChatMessage(msg);
    });

});
//****************END EXPRESS/SOCKET.IO*****************/

//START HTTP server
http.listen(port,()=>console.log(`HTTP Server running on port ${port}`));