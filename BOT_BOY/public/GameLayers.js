function ObjectLayer() {
    this.children = [];

    this.Update = function () {
        this.children.forEach((item) => {
            item.Update();
        })
    }
};

function EnvironmentPlayers(data) {
    this.children = [];

    this.Update = function () {
        this.children.forEach((item) => {
            item.Update();
        })
    }

    this.setState = function (name, { state, position, rotation }) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].name == name) {
                if (state == "Shoot") {
                    this.children[i].state = "Shoot"
                }
                else {
                    this.children[i].state = "Idle"
                    this.children[i].rotation = rotation;
                    Matter.Body.setPosition(this.children[i].body, position);
                }
                break;
            }
        }
    }

    this.removePlayer = function (name) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name == name) {
                console.log("shot out dead env player", name)
                this.children.splice(i, 1);
                i--;
                break;
            }
        }

        console.log(this.children, "shot out")
    }
}