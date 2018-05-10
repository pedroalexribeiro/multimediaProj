"use strict";

function checkBoundingBox(box1, box2, x ,y){
    x = x || 0;
    y = y || 0;
    var b1 = {}, b2 = {};
    var dx, dy;
    console.log(box2);
    b1.hw = box1.width/2;
    b1.hh = box1.height/2;
    b2.hw = box2.width/2;
    b2.hh = box2.height/2;
    b1.cx = box1.x + x + b1.hw;
    b1.cy = box1.y + y + b1.hh;
    b2.cx = box2.x + x + b2.hw;
    b2.cy = box2.y + y + b2.hh;

    dx = Math.abs(b1.cx - b2.cx) - (b1.hw + b2.hw);
    dy = Math.abs(b1.cy - b2.cy) - (b1.hh + b2.hh);

    if(dx < 0 && dy < 0){
        return true;
    }else{
        return false;
    }
}

function calculateCollision(mainC, obj){
    var spaceMain = mainC.getTransformedBounds();
    var spaceObj = obj.getTransformedBounds();
    return checkBoundingBox(spaceMain, spaceObj, 0, 0);
}