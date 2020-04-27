function PlayerController(player) {
    this.img = loadImage('images/left.png');

    this.joystick = createVector(3 * windowWidth / 4, 3 * windowHeight / 4);

    this.w = windowWidth;
    this.h = windowHeight;

    this.IsLeftTopCornner = function ({ x, y }) {
        return (x < this.w / 3 && y < this.h / 3)
    }

    this.IsLeftBottomCorner = function ({ x, y }) {
        return (x < this.w / 3 && this.h - y < this.h / 3)
    }

    this.IsRightTopCorner = function ({ x, y }) {
        return (this.w - x < this.w / 3 && y < this.h / 3)
    }

    this.IsRightBottomCorner = function ({ x, y }) {
        return (this.w - x < this.w / 3 && this.h - y < this.h / 3)
    }

    this.Draw = function () {

    }

    this.Controlles = function () {

        //for mobile
        if (keyIsDown(LEFT_ARROW)) {
            console.log("left")
            player.state = "RotateAntiClockWise"

            return;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            player.state = "RotateClockWise"
            return;
        }

        if (keyIsDown(UP_ARROW)) {
            player.state = "Move"
            return;
        }

        player.state = "Idle";

        touches.forEach(element => {
            if (this.IsLeftTopCornner(element)) {
                player.state = "RotateClockWise";
            }
            if (this.IsLeftBottomCorner(element)) {
                player.state = "RotateAntiClockWise";
            }
            if (this.IsRightTopCorner(element)) {
                player.state = "Shoot";
            }
            if (this.IsRightBottomCorner(element)) {
                player.state = "Move";
            }
        });

        // if (touches.length == 0)
        //     player.state = "Idle";
    }

}


function mousePressed() {
    console.log("Pressed");
    player.state = "Shoot"
}

function touchStarted() {
    player.state = "Shoot"
}