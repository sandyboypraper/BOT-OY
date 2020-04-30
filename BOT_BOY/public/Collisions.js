function collision(event) {
    console.log(event.pairs);

    for (var i = 0; i < event.pairs.length; i++) {
        var labelA = event.pairs[i].bodyA.label;
        var labelB = event.pairs[i].bodyB.label;
        if (labelA == "player" || labelB == "player") {
            if (labelA != "wall" && labelB != "wall" && labelA != "otherPlayer" && labelB != "otherPlayer") {
                // kill player
                console.log("shot out")
                objectLayer.children = [];
                iamDead();
            }
        }
    }
}