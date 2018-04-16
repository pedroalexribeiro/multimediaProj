"user strict";

function Maps(){
    var m = new Map();


    var stage = new createjs.Stage(m.canvas);
    stage.enableMouseOver(10);





    console.log(m.plat.platform);
    stage.addChild(m.plat.platform.bitmap);

    stage.update();

}



class Map {
    constructor() {
        this.canvas = document.getElementById("Menu");
        this.canvas.style.backgroundImage = "url(Resources/Background.png)";

        this.plat = new Platform(30, 30);
    }
}



class Platform {
    constructor(init_x, init_y) {
        var platform = new Image();
        platform.src = "Resources/levels/platform_grass.png";
        platform.onload = function (ev) {
            var bitmap = new createjs.Bitmap(ev.target);
            bitmap.x = init_x;
            bitmap.y = init_y;
            bitmap.alpha = 0.8;
            bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);

            platform.bitmap = bitmap;
            this.platform = platform;
        }
    }
}