"user strict";

function Maps(stage){
    var levelOne = new LevelOne(stage);

    createjs.Ticker.addEventListener("tick", handle);
    function handle(){

        if(createjs.Ticker.getTime(true) > 5000){
            /*Dar reset*/
            levelOne.objects[0].Move(200);
            createjs.Ticker.removeEventListener("tick",handle);

        }
    }

    createjs.Ticker.framerate =60;
    createjs.Ticker.addEventListener("tick", stage);

}



class Map {
    constructor(stage) {
        this.platforms = new Array();
        this.objects = new Array();
    }
}

class LevelOne extends Map{
    constructor(stage){
        super(stage);
        document.getElementById("Menu").style.backgroundImage="url(Resources/Background.png)";
        this.platforms.push(new Platform(stage,"Resources/levels/platform_grass.png",92.5,400));
        this.platforms.push(new Platform(stage,"Resources/levels/platform_grass.png",297.5,400));
        this.platforms.push(new Platform(stage,"Resources/levels/platform_grass.png",502.5,400));

        this.objects.push(new Object(stage, "Resources/levels/beer_test.png", -100, -100));

    }
}


class Platform {
    constructor(stage,src,init_x, init_y) {
        var platform = new Image();
        platform.onload = function (ev) {
            var bitmap = new createjs.Bitmap(ev.target);
            bitmap.x = init_x;
            bitmap.y = init_y;
            bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            stage.addChild(bitmap);
        };
        platform.src = src;
    }
}


class Object{
    constructor(stage,src,init_x, init_y) {
        this.object= new Image();
        this.object.bitmap = new createjs.Bitmap(src);
        this.object.bitmap.x = init_x;
        this.object.bitmap.y = init_y;
        this.object.bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(this.object.bitmap);
    }

    Move(y){
        createjs.Tween.get(this.object.bitmap).to({y:(y)},1000,createjs.Ease.linear);
    }
}