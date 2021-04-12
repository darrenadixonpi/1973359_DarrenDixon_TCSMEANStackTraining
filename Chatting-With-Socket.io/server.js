/*
    Darren Dixon
    April 12th, 2021
    Socket IO Chat
    Main JS File
*/
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 9999;

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=>{
    //console.log("Client connected to application...");

    socket.on("user message",(msg)=>{
        console.log(`Welcome ${msg.name}\nYour message is: ${msg.message}`);
    });
});



http.listen(port,()=>console.log(`Server running on port ${port}`));