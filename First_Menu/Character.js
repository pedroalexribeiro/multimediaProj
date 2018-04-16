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
