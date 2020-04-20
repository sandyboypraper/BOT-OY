function Square(xx, yy) {
    this.color = color(100, 200, 54, 76);
    this.xx = xx;
    this.yy = yy;
    this.ww = 50;
    this.hh = 75;
    this.rotateAngle = 0;

    this.Draw = function (xx = this.xx, yy = this.yy) {
        fill(this.color);

        // rotate(PI / 3.0);
        rect(xx, yy, this.ww, this.hh);
    }
}