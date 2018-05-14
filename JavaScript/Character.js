"use strict";

class Character {
    constructor(stage, x, y) {
        this.velocity = {x: 0, y: 2};
        this.keys = new Array();
        this.isMoving = false;
        this.isUsed = false;
        this.onGround = false;
        var spriteSheet = new createjs.SpriteSheet({
            images: ["../Resources/Character/Running/R_SpriteSheet.png"],
            frames: {"height": 75, "width": 48, "regX": -100, "regY": -450},
            animations: {
                "run": {
                    frames: [0, 1, 2, 1],
                    next: "run",
                    speed: 1
                },
                "idle": {
                    frames: [2],
                    next: "idle"
                }
            }
        });
        this.spriteA = new createjs.Sprite(spriteSheet, "idle");
        this.spriteA.x = x;
        this.spriteA.y = y;
        stage.addChildAt(this.spriteA, 0);
    }

    move(object, menuFlag) {
        if (!menuFlag) {
            this.velocity.y += 1;

            if (this.onGround) {
                if (this.keys[38]) {
                    this.onGround = false;
                    this.velocity.y = -20;
                }
            }


            var move = {x: 0, y: this.velocity.y};
            var collision = null;

            collision = calculateCollision(this.spriteA, object, 'y', move);

            if (!collision) {
                if (this.onGround) {
                    this.onGround = false;
                }
            } else {
                if (move.y >= 0) {

                    this.onGround = true;
                }
                this.velocity.y -= 1;
            }
            if (this.isMoving === true) {
                if (this.keys[37]) {
                    move.x = -5;
                }
                if (this.keys[39]) {
                    move.x = 5;
                }
            }
            collision = calculateCollision(this.spriteA, object, 'x', move);

            this.spriteA.y += move.y;
            this.spriteA.x += move.x;
        }
    }

    collide(objects, menuFlag){
        var bool = false;
        if( !menuFlag){
            for(let obj of objects){
                if(obj.object.bitmap.visible) {   //objects[cc].platform.bitmap.visible
                    var collide = ndgmr.checkPixelCollision(this.spriteA, obj.object.bitmap, 0, true);
                    if(collide){
                        bool = true;
                    }
                }
            }
        }
        return bool;
    }
}

/*
var keyHandlers = function(ev) {
                hero.keys[ev.keyCode] = (ev.type === "keydown");
                if(ev.type === "keydown"){
                    if((ev.keyCode === 37 || ev.keyCode === 38 || ev.keyCode === 39 || ev.keyCode === 40) && hero.isMoving === false) {
                        hero.isMoving = true;
                        hero.spriteA.gotoAndPlay("run");
                    }
                }else{
                    if(!hero.keys[37] && !hero.keys[38] && !hero.keys[39] && !hero.keys[40] && hero.isMoving ===  true){
                        hero.isMoving = false;
                    }
                }
                if(hero.isMoving===false){
                    hero.spriteA.gotoAndStop("idle");
                }
            };

            window.addEventListener("keydown",keyHandlers);
            window.addEventListener('keyup', keyHandlers);


if(calculateCollision(hero.spriteA, level.platforms[0].platform.bitmap)){
    hero.velocity.y = 0;
    hero.isGround = true;
}else if(calculateCollision(hero.spriteA, level.platforms[1].platform.bitmap)){
    hero.velocity.y = 0;
    hero.isGround = true;
}else if(calculateCollision(hero.spriteA, level.platforms[2].platform.bitmap)){
    hero.velocity.y = 0;
    hero.isGround = true;
}else{
    hero.isGround = false;
}

hero.move();
 */
