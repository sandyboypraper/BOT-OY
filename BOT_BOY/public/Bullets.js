function NormalBullets(xx, yy, rr, force, bulletRange) {
    this.xx = xx;
    this.yy = yy;
    this.rr = rr;

    this.collides = false;

    this.body = Matter.Bodies.circle(xx, yy, rr);
    Matter.Body.applyForce(this.body, { x: this.body.position.x, y: this.body.position.y }, force)
    this.body.restitution = 1;
    World.add(world, this.body);

    this.Update = function () {
        bulletRange--;
        if (bulletRange == 0) {
            this.Collide();
        }
        circle(this.body.position.x, this.body.position.y, rr)
    }

    this.Remove = function () {
        World.remove(world, this.body);
    }

    this.Collide = function () {
        // let collisionList = Matter.Query.collides(this.body, walls.wallsArray);
        // console.log(collisionList);
        // if (collisionList.length > 0) {
        this.Remove();
        this.collides = true;
        // }
    }
}