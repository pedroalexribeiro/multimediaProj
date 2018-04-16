"user strict";

function Maps(stage){
    var level1 = new LevelOne(stage);
	stage.update();
}

class Map {
	constructor(stage) {
        this.platforms = new Array();
    }
}

class LevelOne extends Map {
    constructor(stage) {
    	document.getElementById("Menu").style.backgroundImage="url(Resources/Background.png)";
    	super(stage);
        this.platforms.push(new Platform(stage, "Resources/levels/platform_grass.png", 0, 0));
    }
}

class Platform {
    constructor(stage, src, init_x, init_y) {
        var platform = new Image();
        platform.onload = function (ev) {
            this.bitmap = new createjs.Bitmap(ev.target);
            this.bitmap.x = init_x;
            this.bitmap.y = init_y;
            this.bitmap.shadow = new createjs.Shadow("#000000", 1, 1, 5);
            stage.addChild(this.bitmap);
        }
        platform.src = src;
    }
}