var room;
var name = Math.random().toString(36).substring(7);
var envPlayers;

function gameData() {
    // room string from url
    room = window.location.search;

    var gameData = {
        name,
        playerData: {
            xx: player.xx,
            yy: player.yy,
            sx: player.sx,
            sy: player.sy,
            botName: player.botName,
        },
        room
    }

    return JSON.stringify(gameData);
}

// function SocketFlowPlayers(playerBody, sx, sy) {
//     console.log({ playerBody, sx, sy, room })
//     socket.emit("playersFlow", JSON.stringify({
//         playerBody, sx, sy, room
//     }))
//     socket.on("recievePlayerAdded", (data) => {
//         var data = JSON.parse(data);
//         console.log(data);
//     })
// }

function Connects() {
    // connect to the socket
    // variable Inside Main
    socket = io.connect('http://localhost:3000/games')

    envPlayers = new EnvironmentPlayers();

    //sender and receiver pair
    socket.emit("joinroom", gameData());
    socket.on("playerAdded", (data) => {
        var data = JSON.parse(data);
        console.log(data, "New Player In Town");
        new OtherPlayers(envPlayers, data.playerData.xx, data.playerData.yy,
            data.playerData.sx, data.playerData.sy, data.playerData.botName, data.name)
    })
    socket.on("previousPlayers", (data) => {
        var data = JSON.parse(data);
        data.forEach(element => {
            new OtherPlayers(envPlayers, element.playerData.xx, element.playerData.yy,
                element.playerData.sx, element.playerData.sy, element.playerData.botName, element.name)
        });
    })


    //listeners
    // data = room , playerData(state , position , rotation) , name
    socket.on("recieved-player-controlles", (data) => {
        var data = JSON.parse(data);
        console.log(data);
        envPlayers.setState(data.name, data.playerData);
        // new OtherPlayers(envPlayers, data.playerData.xx, data.playerData.yy,
        //     data.playerData.sx, data.playerData.sy, data.playerData.botName, data.name)

    })

    socket.on("room-leaved-by", (name) => {
        envPlayers.removePlayer(name);
    })
}


// room , (state , position , rotation) , name
function BroadCastPlayerControlles(playerData) {
    socket.emit("broad-Cast-player-controlles", JSON.stringify({ room, playerData, name }));
}

function LeaveTheGame() {
    socket.emit("leave-the-room", JSON.stringify({ room, name }));
}

function iamDead() {
    socket.emit("leave-the-room", JSON.stringify({ room, name }));
}