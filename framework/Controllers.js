function Controller(player) {
    this.img = loadImage('images/left.png');

    this.joystick = createVector(3 * windowWidth / 4, 3 * windowHeight / 4);

    this.Draw = function () {
        // left
        // pos width-150 , height - 150
        // image(this.img, width - 150, height - 150, 30, 30);

        //right
        // pos width - 90 height - 150
        // image(this.img, width - 90, height - 150, 30, 30);

        //up
        // pos width - 120 height - 180
        // image(this.img, width - 120, height - 180, 30, 30);

        //down
        // pos width - 120 height - 120
        // image(this.img, width - 120, height - 120, 30, 30);s
    }

    // this.leftTouch = function () {
    //     this.player.state = "MoveLeft"
    // }

    this.Controlles = function () {
        touches.forEach(element => {
            // textSize(20);
            // fill(0, 102, 153);
            // text(`${element.x} ${element.y}`, width / 2, height / 2);
            // text(`${width - 150} ${height - 150}`, width / 2, height / 2 + 20);
            // if (abs(element.x - width + 150) < 50 && abs(element.y - height + 150) < 50) {
            //     player.state = "MoveLeft";
            // }

            // if (element.x - 0 < windowWidth / 3 && element.y - 0 < windowHeight / 3) {
            //     player.state = "MoveTopLeft"
            // }

            // if (element.x - 0 < windowWidth / 3 && windowHeight - element.y < windowHeight / 3) {
            //     player.state = "MoveDownLeft"
            // }

            // if (windowWidth - element.x < windowWidth / 3 && element.y - 0 < windowHeight / 3) {
            //     player.state = "MoveTopRight"
            // }

            if (windowWidth - element.x < windowWidth / 2 && windowHeight - element.y < windowHeight / 2) {
                let Velocity = createVector(element.x, element.y);
                let Accelaration = createVector(element.x, element.y);

                // velocity
                Velocity.sub(this.joystick);
                Velocity.setMag(player.speed);
                player.move_to_vec = Velocity;
                // let tempVec = createVector(player.xx, player.yy)
                // tempVec.add(PVector)

                // player.xx = tempVec.x;
                // player.yy = tempVec.y;

                // textSize(20);
                // fill(0, 102, 153);
                // text(`${tempVec.x} ${tempVec.y}`, width / 2, height / 2 + 20);
                Player.Rotstate = "Rotate";
                player.state = "MoveToVec";
            }
        });

        if (touches.length == 0)
            player.state = "IdleState";
    }
}