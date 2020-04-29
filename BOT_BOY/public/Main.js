// Global Variables 
var { Engine, World, Body } = Matter;

var socket;

var engine, player, world, objectLayer, controller, walls;

// var prevState;

var botNames = ["blue_tank.png", "destroyer.png", "green_tank.png", "red_tank.jpg"]

//gets Object from Socket Listener
var otherObjects = [];

var bg;


// p5 functions
function setup(flag = true) {
    createCanvas(displayWidth, displayHeight);

    bg = loadImage('images/background1.jpg');

    if (flag) {
        Matter.Resolver._restingThresh = 0.1;

        engine = Engine.create();
        engine.world.gravity = { x: 0, y: 0 };
        world = engine.world;

        objectLayer = new ObjectLayer();

        var ind = Math.floor(Math.random() * 10) % botNames.length
        player = new Player(objectLayer, displayWidth / 2 + Math.random() * 10, displayHeight / 2 + Math.random() * 10, 30, 30, botNames[ind]);

        // prevState = {
        //     playerState: player.state
        // }

        // walls = new Walls();

        angleMode(DEGREES);

        controller = new PlayerController(player);

        Connects();

        Matter.Events.on(engine, 'collisionStart', collision);
    }
}

function draw() {
    StaticRender();
    FixUpdate(); // physics
    Update(); // game logic // controllers // movements
    LateUpdate();// Update Enimeis
}

function StaticRender() {

    player.CameraFollow();
    // walls.Update();
}

function FixUpdate() {
    controller.Controlles();
    Engine.update(engine);
}

function Update() {
    objectLayer.Update();
}

function LateUpdate() {
    // if (player.state != prevState.playerState) {
    //     prevState["playerState"] = player.state;
    if (player.state == "Move" || player.state == "RotateAntiClockWise" || player.state == "RotateClockWise" || player.state == "Shoot")
        BroadCastPlayerControlles({ state: player.state, position: player.body.position, rotation: player.rotation });

    // }

    envPlayers.Update();
}

function Render() {

}

function mobileMode() {
    let fs = fullscreen();
    fullscreen(!fs);
    setup(false);
    document.getElementsByClassName("modal")[0].style.display = "none";
}

