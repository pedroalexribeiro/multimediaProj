"user strict";
class Maps {
	constructor() {
		this.main();
	}

	main() {
		//background, array platforms, array objects

	    document.getElementById("Menu").style.backgroundImage="url(Resources/Background.png)";
	    var canvas = document.getElementById("Menu");
	    var stage = new createjs.Stage(canvas);
	    stage.enableMouseOver(10);

	    var plat = new Platform(stage,30, 30);

	}
}

class Platform {
	constructor(stage,init_x, init_y) { 
        var platform = new Image();
	    platform.src = "Resources/levels/platform_grass.png";
	    var bitmap;
	    platform.onload = function (ev) {
	    	console.log("testing");
	        bitmap = new createjs.Bitmap(ev.target)
	        bitmap.x = init_x;
	        bitmap.y = init_y;
	        bitmap.alpha = 0.8;
	        bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	        stage.addChild(bitmap);
	        stage.update();
	    }
    }
}

class asdasd {
	constructor(target, init_x, init_y) { 
        this.bitmap = new createjs.Bitmap(target);
        this.bitmap.x = init_x;
        this.bitmap.y = init_y;
    }
}