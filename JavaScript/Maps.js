"user strict";

/*Make everything Modular
* Time of game
* time between each object
* ammount of objects to throw each time
* randomize x,y,speed of objects
* */
function Maps(stage) {
    var levelOne = new LevelOne(stage);

    /*createjs.Ticker.addEventListener("tick", handle);
    function handle(){
        if(createjs.Ticker.getTime(true) > 5000){
            levelOne.objects[0].Move(0,200,1000); //x not being used yet
            createjs.Ticker.removeEventListener("tick",handle);

        }
    }*/

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


        // #########################################################3333
            var keyHandlers = function(ev) {
                levelOne.hero.keys[ev.keyCode] = (ev.type == "keydown");
                if(ev.type == "keydown"){
                    if((ev.keyCode == 37 || ev.keyCode == 38 || ev.keyCode == 39 || ev.keyCode == 40) && levelOne.hero.isMoving == false) {
                        levelOne.hero.isMoving = true;
                        levelOne.hero.spriteA.gotoAndPlay("run");
                    }
                }else{
                    if(!levelOne.hero.keys[37] && !levelOne.hero.keys[38] && !levelOne.hero.keys[39] && !levelOne.hero.keys[40] && levelOne.hero.isMoving ==  true){
                        levelOne.hero.isMoving = false;
                    }
                }
                if(levelOne.hero.isMoving==false){
                    levelOne.hero.spriteA.gotoAndStop("idle");
                }
            }

            window.addEventListener("keydown",keyHandlers);
            window.addEventListener('keyup', keyHandlers);

        // ##########################################################
        function handle(){
            //########################333«
            if(calculateCollision(levelOne.hero.spriteA, levelOne.platforms[0].bitmap)){
                console.log("1");   
                levelOne.hero.velocity.y = 0;
                levelOne.hero.isGround = true;
            }else if(calculateCollision(levelOne.hero.spriteA, levelOne.platforms[1].bitmap)){
                  console.log("2");
                levelOne.hero.velocity.y = 0;
                levelOne.hero.isGround = true;
            }else if(calculateCollision(levelOne.hero.spriteA, levelOne.platforms[2].bitmap)){
                  console.log("3");
                levelOne.hero.velocity.y = 0;
                levelOne.hero.isGround = true;
            }else{
                console.log("Isto nao funciona");
                levelOne.hero.isGround = false;
            }
            levelOne.hero.move();
            //#############################3
            if (init.getTime() - gameStart.getTime() < totalTime) {
                var current_date = new Date();
                if (current_date.getTime() - init.getTime() > ObjectInterval) {

                    /*Move 1 Object*/
                    /*var ObjectOfArray = Math.floor(Math.random() * levelOne.objects.length); //Sempre 0 neste caso?
                    var obj = levelOne.objects[ObjectOfArray];
                    obj.Move(counter, obj.object.bitmap.y, speed);
                    createjs.Ticker.removeEventListener("tick", handle);


                    var cords = levelOne.ObjectArea(obj.object.bitmap.width,obj.object.bitmap.height,canvas);
                    obj.Reset(cords[0],cords[1]);*/
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

        this.hero = new Character(stage, 200, -200);





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
        this.bitmap = new createjs.Bitmap(src);
        this.bitmap.x = init_x;
        this.bitmap.y = init_y;
        this.bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(this.bitmap);
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