function Walls() {
    this.w = displayWidth;
    this.h = displayHeight;
    this.options = {
        isStatic: true,
        restitution: 1
    }

    this.wallMinW = 20
    this.wallMaxW = 60;

    this.toTalWalls = 20;

    this.wallsArray = [];

    this.wallsWH = [];

    for (var i = 0; i < this.toTalWalls; i++) {
        var xx = random(0, this.w);
        var yy = random(0, this.h);
        var width = random(random(1, 5) * this.wallMinW, random(1, 5) * this.wallMaxW);
        var height = random(random(1, 5) * this.wallMinW, random(1, 5) * this.wallMaxW);
        this.wallsArray.push(Matter.Bodies.rectangle(xx, yy, width, height, this.options));
        this.wallsWH.push({ width, height });
    }

    console.log(this.wallsArray);

    World.add(world, this.wallsArray);

    fill(255);

    this.Update = function () {
        push();
        rectMode(CENTER);
        for (var i = 0; i < this.toTalWalls; i++) {
            rect(this.wallsArray[i].position.x, this.wallsArray[i].position.y, this.wallsWH[i].width, this.wallsWH[i].height);
        }
        pop();
    }


}