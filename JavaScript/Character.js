"use strict";

class Character {
    constructor(stage, x, y, otherChar) {
        this.velocity = {x: 5, y: 2};
        this.keys = new Array();
        this.isMoving = false;
        this.isUsed = false;
        this.onGround = false;
        this.originalX = 0;
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
                frames: {"height": 84, "width": 48, "regX": 0, "regY": 0},
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

    move(object, menuFlag, flags) {
        if (!menuFlag) {
            this.velocity.y += 1;

            if (this.onGround) {
                if (this.keys[38]) {
                    this.onGround = false;
                    this.velocity.y = -20;
                    playSound(false, "jump", flags);
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
                this.velocity.y = 0;
            }
            if (this.isMoving === true) {
                if (this.keys[37]) {
                    if (this.isWalkingRight) {
                        this.isWalkingRight = false;
                        this.hasChanged = true;
                    }
                    move.x = -this.velocity.x;
                }
                if (this.keys[39]) {
                    if (!this.isWalkingRight) {
                        this.isWalkingRight = true;
                        this.hasChanged = true;
                    }
                    move.x = this.velocity.x;
                }
            }
            collision = calculateCollision(this.spriteA, object, 'x', move);

            this.spriteA.y += move.y;
            this.spriteA.x += move.x;
        }
    }

    moveLeft(platforms) {
        if (this.spriteA.x < 800 && this.spriteA.x > 0) {
            var move = {x: 0, y: 7};
            var collision = null;

            collision = calculateCollision(this.spriteA, platforms, 'y', move);

            if (!collision) {
                if (this.onGround) {
                    this.onGround = false;
                }
            } else {
                if (move.y >= 0) {
                    this.onGround = true;
                }
            }
            this.spriteA.y += move.y;
        }
        if (this.onGround) {
            this.spriteA.x -= 5;
        }
    }

    moveRight(platforms) {
        if (this.spriteA.x < 800 && this.spriteA.x > 0) {
            var move = {x: 0, y: 7};
            var collision = null;

            collision = calculateCollision(this.spriteA, platforms, 'y', move);

            if (!collision) {
                if (this.onGround) {
                    this.onGround = false;
                }
            } else {
                if (move.y >= 0) {
                    this.onGround = true;
                }
            }
            this.spriteA.y += move.y;
        }
        if (this.onGround) {
            this.spriteA.x += 5;
        }
    }

    collide(objects, menuFlag, flags) {
        var bool = false;
        if (!menuFlag) {
            for (let obj of objects) {
                if (obj.object.bitmap.visible) {   //objects[cc].platform.bitmap.visible
                    var collide = ndgmr.checkPixelCollision(this.spriteA, obj.object.bitmap, 0, true);
                    if (collide) {
                        if (obj.flag === "../Resources/levels/Extras/Beer.png") {
                            playSound(false, "gulp", flags);
                            if (this.velocity.x > 1 && this.velocity.y > 1) {
                                this.velocity.x -= 0.2;
                                this.velocity.y -= 0.08;
                            }
                        }
                        else if (obj.flag === "../Resources/levels/Extras/deadLine.png") {
                            this.velocity.x += 0.2;
                            this.velocity.y += 0.08;
                        }
                        else return 1;
                    }
                }
            }
            return bool;
        }
    }
}
