function Player(objLayer, startState) {

    // visuales
    this.sprite = new Square(this.xx, this.yy);

    //positions and Angles
    this.xx = 0;
    this.yy = 0;
    this.speed = 5;
    this.forward = createVector(0, 0);
    this.move_to_vec;

    // state
    this.state = startState;

    this.Rotstate = "";

    this.visible = true;
    this.updateCheck = true;

    // for rendering
    objLayer.children.push(this);

    this.Draw = function () {
        if (this.visible) {
            this.sprite.Draw(this.xx, this.yy);
        }
    }

    this.Update = function () {
        if (this.updateCheck) {
            this[this.state]();
        }

        if (this.Rotstate != "") {
            this[this.Rotstate]();
        }
    }

    // State Functions

    this.MoveToVec = function () {
        let tempVec = createVector(this.xx, this.yy);
        tempVec.add(this.move_to_vec);
        this.xx = tempVec.x;
        this.yy = tempVec.y;
    }

    this.MoveTopLeft = function () {
        this.xx -= this.speed;
        this.yy -= this.speed;
    }

    this.MoveTopRight = function () {
        this.xx += this.speed;
        this.yy -= this.speed;
    }

    this.MoveDownLeft = function () {
        this.yy += this.speed;
        this.xx -= this.speed;
    }

    this.MoveDownRight = function () {
        this.yy += this.speed;
        this.xx += this.speed;
    }

    this.IdleState = function () {

    }

    this.Rotate = function () {
        let angle = this.forward.angleBetween(this.move_to_vec);
        textSize(20);
        fill(0, 102, 153);
        text(`${angle}`, width / 2, height / 2 + 20);
        this.sprite.rotateAngle = angle;
    }
}