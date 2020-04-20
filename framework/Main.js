// Global Variables

let objLayer;
let player;
let controller;

// p5 functions
function setup() {
    createCanvas(displayWidth, displayHeight);
    objLayer = new ObjectLayer();
    player = new Player(objLayer, "IdleState");
    controller = new Controller(player);
}

function draw() {
    StaticRender();
    FixUpdate(); // physics
    Update(); // game logic // controllers
    LateUpdate(); // after movement stuff
    Render();
}

// User defined functions


//111111111111111111``````````````````````

// overflow : hidden

//````````````````````




function StaticRender() {
    background("black");
    controller.Draw();
}

function FixUpdate() {

}

function Update() {
    objLayer.Update();
    controller.Controlles(player);
}

function LateUpdate() {

}

function Render() {
    objLayer.Draw();
}





function mobileMode() {
    // document.body.requestFullscreen();
    // document.getElementsByClassName("modal")[0].style.display = "none";
    // setTimeout(setup(), 1000); 

    let fs = fullscreen();
    fullscreen(!fs);
    setup();
    document.getElementsByClassName("modal")[0].style.display = "none";
}