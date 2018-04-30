"user strict";

/*Make everything Modular
* Time of game
* time between each object
* ammount of objects to throw each time
* randomize x,y,speed of objects
* */
function Maps(stage) {
    var levelOne = new LevelOne(stage);
    var canvas = document.getElementById("Menu");



    var gameStart = new Date();
    var counter = 830;
    var speed = 1000;
    var totalT = 15000;
    var ObjInterval = 5000;

    game(canvas,counter, totalT, ObjInterval);

    function game(canvas,counter, totalTime, ObjectInterval) {
        var init = new Date();
        createjs.Ticker.addEventListener("tick", handle);

        function handle() {
            if (init.getTime() - gameStart.getTime() < totalTime) {
                var current_date = new Date();
                if (current_date.getTime() - init.getTime() > ObjectInterval) {
                    console.log("dd");

                    /*Move 1 Object*/
                    var ObjectOfArray = Math.floor(Math.random() * levelOne.objects.length); //Sempre 0 neste caso?
                    var obj = levelOne.objects[ObjectOfArray];
                    console.log("asd");
                    obj.Move(counter, obj.object.bitmap.y, speed);
                    createjs.Ticker.removeEventListener("tick", handle);


                    var cords = levelOne.ObjectArea(obj.object.bitmap.width,obj.object.bitmap.height,canvas);
                    obj.Reset(cords[0],cords[1]);
                    game(canvas,counter, totalTime, ObjectInterval);
                }
            }
            else {
                console.log("End of level");
                createjs.Ticker.removeEventListener("tick", handle);

                /**/
            }
        }
    }

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);


    function randomMovement(xUp, xDown, yUp, yDown, speedUp, speedDown) {
        var speed = Math.random() * speedUp + speedDown;
        /*Check Speed u want for objects.. lets make it 1000-1500 for now*/
        console.log("Speed: " + speed * 1000);

        var x = Math.floor((Math.random() * xUp) + xDown); // If u want to have x unchangable,just give up and down same value and floor will make sure it doenst change? check this truth
        console.log("x: " + x);

        var y = Math.floor((Math.random() * yUp) + yDown);
        console.log("y: " + y);
    }
}


class Map {
    constructor(stage) {
        this.platforms = new Array();
        this.objects = new Array();
    }
}

class LevelOne extends Map {
    constructor(stage) {
        super(stage);
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platform_grass.png", 92.5, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platform_grass.png", 297.5, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platform_grass.png", 502.5, 400));





        var yinit = Math.floor((Math.random() * 340 + 280));

        /*In this level, Only horizontal*/
        this.objects.push(new Object(stage, "../Resources/levels/Extras/small_beer_test.png", -50, yinit));
    }

    ObjectArea(widthObj,heightObj,canvas){ /*For level One*/
        var side = Math.random();

        if (side > 0.5){ // Right
             var xNew = canvas.width + widthObj;
        }
        else{ //Left
            var xNew = 0 - widthObj;
        }

        var yNew = Math.floor((Math.random() * (400-heightObj) + (400-(heightObj*2))));

        return [xNew , yNew];
    }
}


class Platform {
    constructor(stage, src, init_x, init_y) {
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


class Object {
    constructor(stage, src, init_x, init_y) {
        this.object = new Image();
        this.object.bitmap = new createjs.Bitmap(src);
        this.object.bitmap.x = init_x;
        this.object.bitmap.y = init_y;
        this.object.bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(this.object.bitmap);
    }

    Move(x, y, speed) {
        createjs.Tween.get(this.object.bitmap).to({y: y, x: x}, speed, createjs.Ease.linear);
    }

    Reset(x, y) {
        this.object.bitmap.x = x;
        this.object.bitmap.y = y;
    }
}