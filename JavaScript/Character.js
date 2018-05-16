"use strict";

class Character {
    constructor(stage, x, y, otherChar) {
        this.velocity = {x: 0, y: 2};
        this.keys = new Array();
        this.isMoving = false;
        this.isUsed = false;
        this.onGround = false;
        this.isWalkingRight = true;
        this.hasChanged = false;
        if (!otherChar) {
            var spriteSheet = new createjs.SpriteSheet({
                images: ["../Resources/Character/Running/R_SpriteSheet.png"],
                frames: {"height": 75, "width": 48, "regX": 0, "regY": 0},
                animations: {
                    "run_right": {
                        frames: [0, 1, 2, 1],
                        next: "run_right",
                        speed: 0.10,
                    },
                    "run_left": {
                        frames: [3, 4, 5, 3],
                        next: "run_left",
                        speed: 0.10,
                    },
                    "idle_right": {
                        frames: [2],
                        next: "idle_right",
                    },
                    "idle_left": {
                        frames: [5],
                        next: "idle_left",
                    },
                }
            });
        } else {
            var spriteSheet = new createjs.SpriteSheet({
                images: ["../Resources/Character/Running/R_SpriteSheet2.png"],
                frames: {"height": 80, "width": 48, "regX": 0, "regY": 0},
                animations: {
                    "run_right": {
                        frames: [0, 1, 2, 1],
                        next: "run_right",
                        speed: 0.10,
                    },
                    "run_left": {
                        frames: [3, 4, 5, 3],
                        next: "run_left",
                        speed: 0.10,
                    },
                    "idle_right": {
                        frames: [2],
                        next: "idle_right",
                    },
                    "idle_left": {
                        frames: [5],
                        next: "idle_left",
                    },
                }
            });
        }
        this.spriteA = new createjs.Sprite(spriteSheet, "idle_right");
        this.spriteA.x = x;
        this.spriteA.y = y;
        stage.addChildAt(this.spriteA, 0);
    }

    move(object, menuFlag) {
        let right = 37, left = 38, up = 39, down = 40;

        if (!menuFlag) {
            this.velocity.y += 1;

            if (this.onGround) {
                if (this.keys[left]) {
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
                if (this.keys[right]) {
                    if (this.isWalkingRight) {
                        this.isWalkingRight = false;
                        this.hasChanged = true;
                    }
                    move.x = -5;
                }
                if (this.keys[up]) {
                    if (!this.isWalkingRight) {
                        this.isWalkingRight = true;
                        this.hasChanged = true;
                    }
                    move.x = 5;
                }
            }
            collision = calculateCollision(this.spriteA, object, 'x', move);

            this.spriteA.y += move.y;
            this.spriteA.x += move.x;
        }
    }

    collide(objects, menuFlag) {
        var bool = 0;
        if (!menuFlag) {
            for (let obj of objects) {
                if (obj.object.bitmap.visible) {   //objects[cc].platform.bitmap.visible
                    var collide = ndgmr.checkPixelCollision(this.spriteA, obj.object.bitmap, 0, true);
                    if (collide) {
                        if (obj.flag === "../Resources/levels/Extras/Beer.png") {

                        }
                        else if (obj.flag === "../Resources/levels/Extras/deadLine.png") {

                        }
                        else return 1;
                    }
                }
            }
            return bool;
        }
    }
}

/*
var keyHandlers = function(ev) {
                hero.keys[ev.keyCode] = (ev.type === "keydown");
                if(ev.type === "keydown"){
                    if((ev.keyCode === right || ev.keyCode === left || ev.keyCode === up || ev.keyCode === down) && hero.isMoving === false) {
                        hero.isMoving = true;
                        hero.spriteA.gotoAndPlay("run");
                    }
                }else{
                    if(!hero.keys[right] && !hero.keys[left] && !hero.keys[up] && !hero.keys[down] && hero.isMoving ===  true){
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
