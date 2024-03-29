function OtherPlayers(objLayer, xx, yy, sx, sy, playerSprite, name) {

    this.sx = sx;
    this.sy = sy;
    this.name = name;

    this.sprite = loadImage(`images/${playerSprite}`);

    this.velocity = { x: 0, y: 0 };

    this.rotation = 0;

    this.state = "Idle"

    this.options = {
        isStatic: false
    }

    this.ShootingDuration = 5;

    this._ShootingDuration = this.ShootingDuration;

    this.bulletRange = 100
    this.bulletForce = 0.0009

    this.body = Matter.Bodies.rectangle(xx, yy, sx, sy, this.options);
    this.body.label = "otherPlayer"
    // Body.applyForce(this.body, { x: xx, y: yy }, { x: 0, y: 0 })
    World.add(world, this.body);


    this.bullets = [];

    objLayer.children.push(this);

    this.Draw = function () {

    }

    this.FixUpdate = function () {

    }

    this.Update = function () {


        this[this.state]();

        // updated body.x , body.y 
        Matter.Body.setVelocity(this.body, this.velocity);

        push();
        imageMode(CENTER);
        translate(this.body.position.x, this.body.position.y);
        rotate(this.rotation + 90);
        fill(34);
        image(this.sprite, 0, 0, this.sx, this.sy);
        pop();

        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].Update();
            if (this.bullets[i].collides) {
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }

    this.Idle = function () {

    }

    this.Shoot = function () {
        console.log("Shooting yeeee");
        var x = this.body.position.x + 12 * cos(this.rotation);
        var y = this.body.position.y + 12 * sin(this.rotation);
        this.bullets.push(new NormalBullets
            (x, y, 5, { x: this.bulletForce * cos(this.rotation), y: this.bulletForce * sin(this.rotation) }, this.bulletRange));

        this._ShootingDuration--;
        if (this._ShootingDuration == 0) {
            this.state = "Idle";
            this._ShootingDuration = this.ShootingDuration;
        }
    }
}