var express = require('express');
var app = express();
var port = 3000;
var server = app.listen(port);

app.use(express.static('public'));


var socket = require('socket.io');

var io = socket(server);

// client can send data to socket 
// socket can send back to the particluar room

var dataBase = {

}

io.of("/games").on("connection", (socket) => {
    socket.on("joinroom", (data) => {

        console.log("joined", data);
        var data = JSON.parse(data);
        socket.join(data.room);

        // for new socket provide previously added player to it
        //for same
        // socket.emit("success", "Joined");
        //broadcast to all in a room in(for including me) to(excluding me)
        socket.broadcast.to(data.room).emit("playerAdded", JSON.stringify(data));

        if (dataBase[data.room])
            socket.emit("previousPlayers", JSON.stringify(dataBase[data.room]));

        if (!dataBase[data.room])
            dataBase[data.room] = [];

        dataBase[data.room].push(data);
    })

    socket.on("broad-Cast-player-controlles", (data) => {
        var data = JSON.parse(data);
        socket.broadcast.to(data.room).emit("recieved-player-controlles", JSON.stringify(data));
    })

    socket.on("leave-the-room", (data) => {
        var data = JSON.parse(data);
        console.log("room leaved", data.room);
        socket.leave(data.room);
        socket.broadcast.to(data.room).emit("room-leaved-by", data.name);
    })

    // socket.on("playersFlow", (data) => {
    //     var data = JSON.parse(data);
    //     socket.join(data.room);

    //     //for same
    //     // socket.emit("success", "Joined");
    //     //broadcast to all in a room in(for including me) to(excluding me)
    //     io.of("/games").to(data.room).emit("recievePlayerAdded", JSON.stringify(data));
    // })

})