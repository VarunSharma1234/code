const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = 6000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

//Middleware in socket.io
io.use((socket, next) => {
    next();
});

io.on("connect", (socket) => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    console.log(socket.rooms);
    io.emit('connection',(socket)=>{
        console.log("connection from server1")
    })
    io.emit('disconnection',(socket)=>{
        console.log("disconnection from server2")
    })
    socket.on('message',(message)=>{
        console.log(message)
        io.emit("messageji:",message+" HI")
        // io.disconnect();
    })
    // socket.off("")
    socket.join("room1");
    console.log(socket.rooms);
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});


httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});