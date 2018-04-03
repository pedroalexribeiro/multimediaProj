"use strict";

function Student_Menu() {
    document.getElementById("Menu").style.backgroundImage="url(Resources/Background.png)";
    var canvas = document.getElementById("Menu");
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);

    var isCanvas = true;

    var mouseFunction = function(ev){
        mouseHandler(ev, isCanvas);
    };


    var arrayBoxes = new Array();
    var level = 0;


    arrayBoxes.push(new createjs.Shape);

    for(let level of arrayBoxes){
        /*Push more.. and make function to change Height..*/
        level.graphics.beginStroke("#fff");
        level.graphics.setStrokeStyle(2);
        level.snapToPixel = true;
        level.graphics.drawRect(0, 0, 100, 100);
        level.x = canvas.width/x - b.width/2;
        level.y = canvas.height/2;
        stage.addChild(level);
    }

    function Student_Level_Handler(ev){
        if(ev.target.text === "Back") {
            stage.removeAllChildren();
            SP_Menu();
        }
    }



    //Back Button
    var back = (new createjs.Text("Back", "35px Georgia", "#ffffff"));
    customize(back,canvas,4);
    var hit = new createjs.Shape(); //Creates Hitbox
    hit.graphics.beginFill("#000").drawRect(0, 0, back.getMeasuredWidth(), back.getMeasuredHeight());
    back.hitArea = hit;
    back.on("mouseover", mouseFunction);
    back.on("mouseout", mouseFunction);
    back.on("click",Student_Level_Handler);
    stage.addChild(back);


    //Help Button
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
        bitmap.on("mouseover", mouseFunction);
        bitmap.on("mouseout", mouseFunction);
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
        bitmap.on("mouseover", mouseFunction);
        bitmap.on("mouseout", mouseFunction);
        bitmap.on("click", clickHandler);
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
                function change(){
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

                        var Sound_btn = new createjs.Text("On", "35px Georgia", "#ffffff");
                        Sound_btn.id = "Sound_btn";
                        Sound_btn.alpha=0.8;
                        Sound_btn.x = img.width/2 - Sound_btn.getMeasuredWidth()/2;
                        Sound_btn.y = img.height * 0.55;
                        Sound_btn.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                        var hit_ON = new createjs.Shape();
                        hit_ON.graphics.beginFill("#000").drawRect(0, 0, Sound_btn.getMeasuredWidth(), Sound_btn.getMeasuredHeight());
                        Sound_btn.hitArea = hit_ON;
                        Sound_btn.on("mouseover", mouseHandler);
                        Sound_btn.on("mouseout", mouseHandler);
                        Sound_btn.on("click",click_Handler_OP);
                        container.addChild(Sound_btn);

                        var Music_btn = new createjs.Text("On", "35px Georgia", "#ffffff");
                        Music_btn.id = "Music_btn";
                        Music_btn.alpha=0.8;
                        Music_btn.x = img.width/2 - Music_btn.getMeasuredWidth()/2;
                        Music_btn.y = img.height * 0.4;
                        Music_btn.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                        var hit_ON_M = new createjs.Shape();
                        hit_ON_M.graphics.beginFill("#000").drawRect(0, 0, Music_btn.getMeasuredWidth(), Music_btn.getMeasuredHeight());
                        Music_btn.hitArea = hit_ON_M;
                        Music_btn.on("mouseover", mouseHandler);
                        Music_btn.on("mouseout", mouseHandler);
                        Music_btn.on("click",click_Handler_OP);
                        container.addChild(Music_btn);
                        break;
                }

                function changes(ev){
                    change_container_pos(ev,canvas.height/5);
                }

                createjs.Tween.get(container).call(changes);

            };
        }
    }
    createjs.Ticker.framerate =60;
    createjs.Ticker.addEventListener("tick", stage);
}

function click_Handler_OP(ev){
    console.log("testing");
    if(ev.target.id === "Sound_btn"){
        if (ev.target.text === "On") {
            ev.target.text = "Off";
        }
        else if (ev.target.text === "Off") {
            ev.target.text = "On";
        }

    }
    else if(ev.target.id === "Music_btn") {
        if (ev.target.text === "On") {
            createjs.Sound.stop("Music");
            ev.target.text = "Off";
        }
        else if (ev.target.text === "Off") {
            createjs.Sound.play("Music");
            ev.target.text = "On";
        }
    }
}

function change_container_pos(ev,height){
    createjs.Tween.get(ev.target).to({y:(height)},750,createjs.Ease.linear);
}
function mouseHandler(ev, isCanvas){
    if(isCanvas || ev.target.text === "Back" || ev.target.text === "On"|| ev.target.text === "Off") {
        ev.target.alpha = (ev.type === "mouseover") ? 1 : 0.8;
        ev.target.shadow = (ev.type === "mouseover") ? new createjs.Shadow("#000000", 15, 15, 10) : new createjs.Shadow("#000000", 5, 5, 10);
    }
}
function customize(object,canvas,number){
    var b = object.getBounds();
    object.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    object.x = (canvas.width/2) - (b.width/2);
    object.y = (canvas.height/2.3) + number*50;
    object.alpha = 0.8;
}

