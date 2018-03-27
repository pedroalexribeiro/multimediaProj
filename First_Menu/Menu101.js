"use strict";

(function()
{
    window.addEventListener("load", Main_Menu);
}());


var isCanvas = true;

function Main_Menu() {
    var canvas = document.getElementById("Menu");
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);

    /*Sera que se pode por tudo dentro de um array e diminuir linhas codigo? ask teacher*/
    //SinglePlayer Button
    var singlePlayer = new createjs.Text("SinglePlayer", "35px Georgia", "#ffffff");
    customize(singlePlayer, canvas, 0);
    var hit_SP = new createjs.Shape(); //Creates Hitbox
    hit_SP.graphics.beginFill("#000").drawRect(0, 0, singlePlayer.getMeasuredWidth(), singlePlayer.getMeasuredHeight());
    singlePlayer.hitArea = hit_SP;
    singlePlayer.on("mouseover", mouseHandler);
    singlePlayer.on("mouseout", mouseHandler);
    stage.addChild(singlePlayer);


    //Multiplayer Button
    var multiPlayer = new createjs.Text("MultiPlayer", "35px Georgia", "#ffffff");
    customize(multiPlayer, canvas, 1);
    var hit_MP = new createjs.Shape();
    hit_MP.graphics.beginFill("#000").drawRect(0, 0, multiPlayer.getMeasuredWidth(), multiPlayer.getMeasuredHeight());
    multiPlayer.hitArea = hit_MP;
    multiPlayer.on("mouseover", mouseHandler);
    multiPlayer.on("mouseout", mouseHandler);
    stage.addChild(multiPlayer);

    //Arcade Button
    var arcade = new createjs.Text("Arcade", "35px Georgia", "#ffffff");
    customize(arcade, canvas, 2);
    var hit_AC = new createjs.Shape();
    hit_AC.graphics.beginFill("#000").drawRect(0, 0, arcade.getMeasuredWidth(), arcade.getMeasuredHeight());
    arcade.hitArea = hit_AC;
    arcade.on("mouseover", mouseHandler);
    arcade.on("mouseout", mouseHandler);
    stage.addChild(arcade);


    //Extras Button
    var extras = new createjs.Text("Extras", "35px Georgia", "#ffffff");
    customize(extras, canvas, 3);
    var hit_EX = new createjs.Shape();
    hit_EX.graphics.beginFill("#000").drawRect(0, 0, extras.getMeasuredWidth(), extras.getMeasuredHeight());
    extras.hitArea = hit_EX;
    extras.on("mouseover", mouseHandler);
    extras.on("mouseout", mouseHandler);
    stage.addChild(extras);

    //Quit Button
    var quit = new createjs.Text("Quit", "35px Georgia", "#ffffff");
    customize(quit, canvas, 4);
    var hit_Q = new createjs.Shape();
    hit_Q.graphics.beginFill("#000").drawRect(0, 0, quit.getMeasuredWidth(), quit.getMeasuredHeight());
    quit.hitArea = hit_Q;
    quit.on("mouseover", mouseHandler);
    quit.on("mouseout", mouseHandler);
    stage.addChild(quit);


    //Options Button
    var help = new Image();
    help.src = "Resources/Help.png";
    help.onload = function (ev) {
        var bitmap = new createjs.Bitmap(ev.target);
        bitmap.x = 720;
        bitmap.y = 500;
        bitmap.alpha = 0.8;
        bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(bitmap);

        var hit_HP = new createjs.Shape();
        hit_HP.graphics.beginFill("#000").drawRect(0, 0, help.width, help.height);
        bitmap.hitArea = hit_HP;
        help.bitmap = bitmap;
        bitmap.on("mouseover", mouseHandler);
        bitmap.on("mouseout", mouseHandler);
        bitmap.on("click",clickHandler);

    };


    //options Button
    var options = new Image();
    options.src = "Resources/Options.png";
    options.onload = function (ev) {
        var bitmap = new createjs.Bitmap(ev.target);
        bitmap.x = 10;
        bitmap.y = 530;
        bitmap.alpha = 0.8;
        bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(bitmap);

        var hit_OP = new createjs.Shape();
        hit_OP.graphics.beginFill("#000").drawRect(0, 0, help.width, help.height);
        bitmap.hitArea = hit_OP;
        options.bitmap = bitmap;
        bitmap.on("mouseover", mouseHandler);
        bitmap.on("mouseout", mouseHandler);
        bitmap.on("click",clickHandler);
    };


    function clickHandler(ev) {
        if(isCanvas){
            //makes button look like disabled
            ev.target.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            ev.target.alpha = 0.7;
            //Disables background events
            isCanvas = false;

            //Loads container
            var img = new Image();
            img.src = "Resources/ChalkBoard.png";
            img.onload = function(){
                var container = new createjs.Container();
                container.x = canvas.width / 2 - img.width / 2;
                container.y = -300;
                stage.addChild(container);


                var bg = new createjs.Shape();
                bg.graphics.beginBitmapFill(img,"no-repeat");
                bg.graphics.drawRect(0,  0, img.width, img.height);
                container.addChild(bg);

                var back = new createjs.Text("Back", "35px Georgia", "#ffffff");
                back.alpha=0.8;
                back.x = img.width/2 - back.getMeasuredWidth()/2;
                back.y = img.height * 0.7;
                back.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                var hit_B = new createjs.Shape();
                hit_B.graphics.beginFill("#000").drawRect(0, 0, back.getMeasuredWidth(), back.getMeasuredHeight());
                back.hitArea = hit_B;
                back.on("mouseover", mouseHandler);
                back.on("mouseout", mouseHandler);
                function change(ev){
                    change_container_pos(createjs.Tween.get(container),-350);
                    isCanvas = true;
                }
                back.on("click",change);
                container.addChild(back);


                switch (ev.target.hitArea) {
                    case help.bitmap.hitArea:
                        var help_title= new createjs.Text("Help", "50px Georgia", "#ffffff");
                        help_title.alpha=0.8;
                        help_title.x = img.width/2 - help_title.getMeasuredWidth()/2;
                        help_title.y = help_title.getMeasuredHeight();
                        container.addChild(help_title);
                        break;
                    case options.bitmap.hitArea:
                        var options_title = new createjs.Text("Options", "50px Georgia", "#ffffff");
                        options_title.alpha=0.8;
                        options_title.x = img.width/2 - options_title.getMeasuredWidth()/2;
                        options_title.y = options_title.getMeasuredHeight();
                        container.addChild(options_title);

                        var music = new createjs.Text("Music:", "35px Georgia", "#ffffff");
                        music.alpha=0.8;
                        music.x = img.width/2 - music.getMeasuredWidth() - back.getMeasuredWidth()/2;
                        music.y = img.height * 0.4;
                        container.addChild(music);

                        var sounds = new createjs.Text("Sounds:", "35px Georgia", "#ffffff");
                        sounds.alpha=0.8;
                        sounds.x = img.width/2 - sounds.getMeasuredWidth() - back.getMeasuredWidth()/2;
                        sounds.y = img.height * 0.55;
                        container.addChild(sounds);

                        var sound = new createjs.Text("On", "35px Georgia", "#ffffff");
                        sound.alpha=0.8;
                        sound.x = img.width/2 - sound.getMeasuredWidth()/2;
                        sound.y = img.height * 0.55;
                        sound.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                        var hit_ON = new createjs.Shape();
                        hit_ON.graphics.beginFill("#000").drawRect(0, 0, sound.getMeasuredWidth(), sound.getMeasuredHeight());
                        sound.hitArea = hit_ON;
                        sound.on("mouseover", mouseHandler);
                        sound.on("mouseout", mouseHandler);
                        container.addChild(sound);

                        var musicc = new createjs.Text("On", "35px Georgia", "#ffffff");
                        musicc.alpha=0.8;
                        musicc.x = img.width/2 - musicc.getMeasuredWidth()/2;
                        musicc.y = img.height * 0.4;
                        musicc.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                        var hit_ON_M = new createjs.Shape();
                        hit_ON_M.graphics.beginFill("#000").drawRect(0, 0, musicc.getMeasuredWidth(), musicc.getMeasuredHeight());
                        musicc.hitArea = hit_ON_M;
                        musicc.on("mouseover", mouseHandler);
                        musicc.on("mouseout", mouseHandler);
                        container.addChild(musicc);
                        break;
                }

                function changes(ev){
                    change_container_pos(ev,canvas.height/5);
                }

                createjs.Tween.get(container).call(changes);

            };
        }
    }
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}


function change_container_pos(ev,height){
    console.log(ev.target);
    createjs.Tween.get(ev.target).to({y:(height)},750,createjs.Ease.linear);
}
function mouseHandler(ev){
    if(isCanvas ||ev.target.text === "Back" ||ev.target.text === "On"||ev.target.text === "Off") {
        ev.target.alpha = (ev.type === "mouseover") ? 1 : 0.8;
        ev.target.shadow = (ev.type === "mouseover") ? ev.target.shadow = new createjs.Shadow("#000000", 15, 15, 10) : ev.target.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    }
}
function customize(object,canvas,number){
    var b = object.getBounds();
    object.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    object.x = (canvas.width/2) - (b.width/2);
    object.y = (canvas.height/2.3) + number*50;
    object.alpha = 0.8;
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
