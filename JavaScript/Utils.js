"use strict";

function checkBoundingBox(box1, box2, x ,y){
    x = x || 0;
    y = y || 0;
    var b1 = {}, b2 = {};
    var dx, dy;
    b1.hw = box1.width/2;
    b1.hh = box1.height/2;
    b2.hw = box2.width/2;
    b2.hh = box2.height/2;
    b1.cx = box1.x + x + b1.hw;
    b1.cy = box1.y + y + b1.hh;
    b2.cx = box2.x + b2.hw;
    b2.cy = box2.y + b2.hh;

    dx = Math.abs(b1.cx - b2.cx) - (b1.hw + b2.hw);
    dy = Math.abs(b1.cy - b2.cy) - (b1.hh + b2.hh);

    if(dx < 0 && dy < 0){
        return {width: -dx, height: -dy};
    }else{
        return null;
    }
}

function calculateCollision(mainC, objects, direction, moveBy){
    if(direction != 'x' && direction != 'y'){
        direction = 'x';
    }
    /*var spaceMain = mainC.getTransformedBounds();
    var spaceObj = object.getTransformedBounds();
    var collision = null;*/

    var measure = direction == 'x' ? 'width' : 'height',
        oppositeDirection = direction == 'x' ? 'y' : 'x',
        oppositeMeasure = direction == 'x' ? 'height' : 'width',

        bounds = mainC.getTransformedBounds(),
        cbounds,
        collision = null,
        cc = 0;
    // for each collideable object we will calculate the
    // of the hero's future position's bounding-rectangle
    while ( !collision && cc < objects.length ) {
        cbounds = objects[cc].platform.bitmap.getTransformedBounds();
        if ( objects[cc].platform.bitmap.visible ) {
            collision = checkBoundingBox(bounds, cbounds, moveBy.x, moveBy.y);
        }
        if ( !collision && objects[cc].platform.bitmap.visible ) {
            // if there was NO collision detected, but somehow
            // the hero got onto the "other side" of an object (high velocity e.g.),
            // then we will detect this here, and adjust the velocity according to
            // it to prevent the Hero from "ghosting" through objects
            // try messing with the 'this.velocity = {x:0,y:125};'
            // -> it should still collide even with very high values
            var wentThroughForwards  = ( bounds[direction] < cbounds[direction] && bounds[direction] + moveBy[direction] > cbounds[direction] ),
                wentThroughBackwards = ( bounds[direction] > cbounds[direction] && bounds[direction] + moveBy[direction] < cbounds[direction] ),
                withinOppositeBounds = !(bounds[oppositeDirection]+bounds[oppositeMeasure] < cbounds[oppositeDirection])
                    && !(bounds[oppositeDirection] > cbounds[oppositeDirection]+cbounds[oppositeMeasure]);

            if ( (wentThroughForwards || wentThroughBackwards) && withinOppositeBounds ) {
                moveBy[direction] = cbounds[direction] - bounds[direction];
            } else {
                cc++;
            }
        }
    }

    if ( collision ) {
        var sign = Math.abs(moveBy[direction]) / moveBy[direction];
        moveBy[direction] -= collision[measure] * sign;
    }

    return collision;

}