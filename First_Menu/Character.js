"use strict";

class Character{
    constructor(init_x,init_y){ /*Test, need to implemente character shit over here*/
        this.bitmap = new createjs.Bitmap();
        this.bitmap.x = init_x;
        this.bitmap.y = init_y;
    }

    Animation(){
                                 /*Depois as animacoes tem de ficar aqui!!! */
    }
}

/*
var spriteSheet = new createjs.SpriteSheet({
+                images: ["Resources/Running/R_SpriteSheet.png"],
+                frames: {"height": 75,"width": 48, "regX": -100, "regY":-500},
+                animations: {"run":{
+                                    frames: [0,1,2,1],
+                                    next: "run",
+                                    speed: 0.15
+                                }         
+                            }
+            });
+
+    var grant = new createjs.Sprite(spriteSheet, "run");
+    createjs.Ticker.addEventListener("tick", tick);
+    stage.addEventListener("stagemousedown", handleJumpStart);
+
+    function handleJumpStart(ev) {
+        setInterval(salta, 100);
+    }
 
+    function salta(){
+        if(grant.y > -400){
+            var position = grant.y - 150 * 0.1;
+            var grantW = grant.getBounds().height * grant.scaleY;
+            grant.y = (position >= canvas.width + grantW) ? -grantW : position;
+            stage.update(event);
+        }
+    }
+    function tick(event) {
+        var deltaS = event.delta / 1000;
+        var position = grant.x + 150 * deltaS;
+        var grantW = grant.getBounds().width * grant.scaleX;
+        grant.x = (position >= canvas.width + grantW) ? -grantW : position;
+        stage.update(event);
+    }
+    stage.addChild(grant);
*/



//ESTE FUNCIONA E METE BONECO A MEXER DE UM LADO PARA O OUTRO, MAS SEMPRE A MESMA IMAGEM.. ELE NAO CORRE!!!
/* var char = new Image();
 char.src = "Resources/Running/R1.png";
 char.onload = function (ev) {
     var x = new Character(ev.target, 100, 500);
     stage.addChild(x.bitmap);
     createjs.Tween.get(x.bitmap).call(test);

     function test(ev){
         createjs.Tween.get(ev.target)
         .to({x:650,y:500},5000);
     }
 };*/


/* TENTATIVA DE POR A ANIMACAO DE O BONECO A CORRER, HOWEVER NAO FUNCIONA IDK WHY.. NAO DA ERROS AO CORRER!
    var data = ({
        framerate: 30,
        "images": ["Resources/Running/R_SpriteSheet.png"],
        "frames": {"height":75,"count":3,"width":48,"regX":100,"regY":100},
        "animations": {
            run : [0,2,"run",2] // Start - end - next - speed
        }
    });
    var spriteSheet = new createjs.SpriteSheet(data);
    var char = new createjs.Sprite(spriteSheet, "run");
    stage.addChild(char);

    createjs.Ticker.on("tick",handles);
    function handles(ev){
        stage.update(ev);
    }
*/
