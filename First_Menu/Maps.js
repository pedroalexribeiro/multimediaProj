"user strict";

function Maps(stage){
    var levelOne = new LevelOne(stage);


    function handle(ev){

        if(createjs.Ticker.getTime(true) > 5000){
            console.log(levelOne.objects[0].bitmap);
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
        var object= new Image();
        this.bitmap =null;
        object.onload = function (ev) {
            this.bitmap = new createjs.Bitmap(ev.target);
            this.bitmap.x = init_x;
            this.bitmap.y = init_y;
            this.bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            stage.addChild(this.bitmap);
            console.log("ola");
        };
        object.src = src;
    }

    Move(asd){
        console.log("Here???");
        console.log(createjs.Tween.get(this));
        console.log(asd);
        createjs.Tween.get(this).to({y:(asd)},1000,createjs.Ease.linear);
    }
}
