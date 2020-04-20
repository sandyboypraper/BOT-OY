function ObjectLayer() {
    this.children = [];

    this.Draw = function () {
        this.children.forEach((item) => {
            item.Draw();
        })
    }

    this.Update = function () {
        this.children.forEach((item) => {
            item.Update();
        })
    }
};