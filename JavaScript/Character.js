"use strict";

class Character{
    constructor(stage,x,y){
        this.velocity = {x:1,y:2}
        this.keys = new Array();
        this.isMoving = false;
        this.isGround = false;
        var spriteSheet = new createjs.SpriteSheet({
            images: ["../Resources/Character/Running/R_SpriteSheet.png"],
            frames: {"height": 75,"width": 48, "regX": -100, "regY": -450},
            animations: {"run":{
                            frames: [0,1,2,1],
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
        stage.addChildAt(this.spriteA,0);
    }

    move(){
    	this.velocity.y += 0.5;
        if(this.isMoving === true) {
            if (this.keys[37]) {
                this.spriteA.x += -5;
            }
            if (this.keys[39]) {
                this.spriteA.x += 5;
            }
            /*if (this.keys[38]) {
                this.spriteA.y += -10;
            }
            if (this.keys[40]) {
                this.spriteA.y += 10;
            }*/
        }
        if(!this.isGround){
            this.spriteA.y += this.velocity.y;
        }
        if(this.isGround){
            if (this.keys[38]){
                this.velocity.y = -17;
            }
            //this.spriteA.y += this.velocity.y;
        }
    }
}
