"use strict";

(function () {
    window.addEventListener("load", mainMenu);
}());

function mainMenu() {
    /*Music Stuff*/
    var audioPath = "../Resources/Audio/";
    var sounds = [
        {id: "menuMusic", src: "Audio1.mp3"},
        {id: "gameMusic", src: "Audio2.mp3"}
    ];
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", soundLoad);
    createjs.Sound.registerSounds(sounds, audioPath);


    function soundLoad() {
        var instance = createjs.Sound.play("menuMusic");
        instance.on("complete", soundLoad);
    }


    /*Background Information*/
    document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";

    /*Stage Loader*/
    var canvas = document.getElementById("Menu");
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);
    var isCanvas = true;

//###############################################################################
    var ch = new Character(stage, 300, -200);
    var keyHandlers = function (ev) {
        ch.keys[ev.keyCode] = (ev.type === "keydown");
        if (ev.type === "keydown") {
            if ((ev.keyCode == 37 || ev.keyCode == 38 || ev.keyCode == 39 || ev.keyCode == 40) && ch.isMoving == false) {
                ch.isMoving = true;
                ch.spriteA.gotoAndPlay("run");
            }
        } else {
            if (!ch.keys[37] && !ch.keys[38] && !ch.keys[39] && !ch.keys[40] && ch.isMoving == true) {
                ch.isMoving = false;
            }
        }
        if (ch.isMoving === false) {
            ch.spriteA.gotoAndStop("idle");
        }
    };

    window.addEventListener("keydown", keyHandlers);
    window.addEventListener('keyup', keyHandlers);


//################################################################################


    var mouseFunction = function (ev) {
        mouseHandler(ev, isCanvas);
    };


    //Container creation
    var index;
    var mState = true;
    var sState = true;

    var containerr;
    ContainerMenu();

    function ContainerMenu() {

        //Loads container
        var img = new Image();
        img.src = "../Resources/Options/ChalkBoard.png";
        img.onload = function () {
            var container = new createjs.Container();
            container.x = canvas.width / 2 - img.width / 2;
            container.y = -400;
            stage.addChild(container);
            containerr = container;


            var bg = new createjs.Shape();
            bg.graphics.beginBitmapFill(img, "no-repeat");
            bg.graphics.drawRect(0, 0, img.width, img.height);
            container.addChild(bg);

            var options_title = new createjs.Text("Options", "50px Georgia", "#ffffff");
            options_title.alpha = 0.8;
            options_title.x = img.width / 2 - options_title.getMeasuredWidth() / 2;
            options_title.y = options_title.getMeasuredHeight();
            container.addChild(options_title);


            var optButtons = new Array();
            var iterator2 = 0;
            optButtons.push(new createjs.Text("Music:", "35px Georgia", "#ffffff"));
            optButtons.push(new createjs.Text("MusicState", "35px Georgia", "#ffffff"));
            optButtons.push(new createjs.Text("Sounds:", "35px Georgia", "#ffffff"));
            optButtons.push(new createjs.Text("SoundState", "35px Georgia", "#ffffff"));
            optButtons.push(new createjs.Text("Back", "35px Georgia", "#ffffff"));

            for (let text of optButtons) {
                if (text.text === "MusicState" || text.text === "SoundState") { // On and OFF
                    if (mState) text.text = "On";
                    else text.text = "Off";
                    if (sState) text.text = "On";
                    else text.text = "Off";

                    customizeContainer(text, img, iterator2, true, false);
                }
                else if (text.text === "Music:" || text.text === "Sounds:") { // Music and Sound
                    customizeContainer(text, img, iterator2, false, true);
                }
                else customizeContainer(text, img, iterator2, true, false); // Back

                iterator2 += 1;
                container.addChild(text);
            }

            function customizeContainer(object, container, iterator, hitBox, flag) {

                var b = object.getBounds();

                if (!flag) { //Back On and Off

                    object.x = (container.width / 2) - (b.width / 2);
                    object.y = (container.height / 3.2) + (iterator) * 30;
                    if (object.text === "Back") {
                        object.y = (container.height / 3.2) + (iterator) * 38;
                    }
                }
                else { // Music and Sound
                    object.x = (container.width / 2.0) - (b.width / 2) - 100;
                    object.y = (container.height / 2.5) + (iterator) * 30;
                }
                if (hitBox) {

                    object.on("mouseover", mouseFunction);
                    object.on("mouseout", mouseFunction);
                    object.alpha = 0.8;
                    object.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                    var hit = new createjs.Shape(); //Creates Hitbox
                    hit.graphics.beginFill("#000").drawRect(0, 0, object.getMeasuredWidth(), object.getMeasuredHeight());
                    object.hitArea = hit;

                    if (object.text === "Back") {
                        object.on("click", containerReset);
                    }
                    else {
                        object.on("click", click_Handler_OP);
                    }
                }
            }
        }
    }


    function changeIsCanvas() {
        console.log("asdasd");
        if (isCanvas) isCanvas = false;
        else isCanvas = true;
    }

    function containerReset() {
        if (!isCanvas) {
            createjs.Tween.get(containerr).to({y: (-400)}, 750, createjs.Ease.sineIn);
            changeIsCanvas();
        }
    }


    function containerMove() {
        if (isCanvas) {
            createjs.Tween.get(containerr).to({y: (stage.canvas.height / 5)}, 750, createjs.Ease.sineOut);
            changeIsCanvas();
        }
    }


//Main Menu buttons
    var arrayButtons = new Array();
    var iterator = 0;
    arrayButtons.push(new createjs.Text("SinglePlayer", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("MultiPlayer", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Arcade", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Extras", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Quit", "35px Georgia", "#ffffff"));

    for (let text of arrayButtons) {
        customize(text, canvas, iterator);
        iterator += 1;
        var hit = new createjs.Shape(); //Creates Hitbox
        hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
        text.hitArea = hit;
        text.on("mouseover", mouseFunction);
        text.on("mouseout", mouseFunction);
        text.on("click", clickHandler_SP_MP_AC);
        stage.addChild(text);
    }


//Help Button
    var help = new Image();
    help.src = "../Resources/Options/Help.png";
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
        bitmap.on("click", containerMove);
    };

//Options Button
    var options = new Image();
    options.src = "../Resources/Options/Options.png";
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
        bitmap.on("click", containerMove);
    };


    function clickHandler_SP_MP_AC(ev) {
        console.log(ev.target.text);
        if (isCanvas && ev.target.text === "SinglePlayer") {
            stage.removeAllChildren();
            SP_Menu(stage);
        }
        if (isCanvas && ev.target.text === "Quit") {
            //window.close();
        }
    }


    /*function clickHandler_HP_OP(ev) {
        if (isCanvas) {
            //makes button look like disabled
            ev.target.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            ev.target.alpha = 0.7;
            //Disables background events
            isCanvas = false;

            //Loads container
            var img = new Image();
            img.src = "../Resources/Options/ChalkBoard.png";
            img.onload = function () {
                var container = new createjs.Container();
                container.x = canvas.width / 2 - img.width / 2;
                container.y = -300;
                stage.addChild(container);


                var bg = new createjs.Shape();
                bg.graphics.beginBitmapFill(img, "no-repeat");
                bg.graphics.drawRect(0, 0, img.width, img.height);
                container.addChild(bg);

                var back = new createjs.Text("Back", "35px Georgia", "#ffffff");
                back.alpha = 0.8;
                back.x = img.width / 2 - back.getMeasuredWidth() / 2;
                back.y = img.height * 0.7;
                back.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                var hit_B = new createjs.Shape();
                hit_B.graphics.beginFill("#000").drawRect(0, 0, back.getMeasuredWidth(), back.getMeasuredHeight());
                back.hitArea = hit_B;
                back.on("mouseover", mouseHandler);
                back.on("mouseout", mouseHandler);

                function change() {
                    change_container_pos(createjs.Tween.get(container), -350);
                    isCanvas = true; // Make it just in the end
                }

                back.on("click", change);
                container.addChild(back);


                switch (ev.target.hitArea) {
                    case help.bitmap.hitArea:
                        var help_title = new createjs.Text("Help", "50px Georgia", "#ffffff");
                        help_title.alpha = 0.8;
                        help_title.x = img.width / 2 - help_title.getMeasuredWidth() / 2;
                        help_title.y = help_title.getMeasuredHeight();
                        container.addChild(help_title);
                        break;
                    case options.bitmap.hitArea:
                        var options_title = new createjs.Text("Options", "50px Georgia", "#ffffff");
                        options_title.alpha = 0.8;
                        options_title.x = img.width / 2 - options_title.getMeasuredWidth() / 2;
                        options_title.y = options_title.getMeasuredHeight();
                        container.addChild(options_title);

                        var music = new createjs.Text("Music:", "35px Georgia", "#ffffff");
                        music.alpha = 0.8;
                        music.x = img.width / 2 - music.getMeasuredWidth() - back.getMeasuredWidth() / 2;
                        music.y = img.height * 0.4;
                        container.addChild(music);

                        var sounds = new createjs.Text("Sounds:", "35px Georgia", "#ffffff");
                        sounds.alpha = 0.8;
                        sounds.x = img.width / 2 - sounds.getMeasuredWidth() - back.getMeasuredWidth() / 2;
                        sounds.y = img.height * 0.55;
                        container.addChild(sounds);

                        var Sound_btn = new createjs.Text("On", "35px Georgia", "#ffffff");
                        Sound_btn.id = "Sound_btn";
                        Sound_btn.alpha = 0.8;
                        Sound_btn.x = img.width / 2 - Sound_btn.getMeasuredWidth() / 2;
                        Sound_btn.y = img.height * 0.55;
                        Sound_btn.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                        var hit_ON = new createjs.Shape();
                        hit_ON.graphics.beginFill("#000").drawRect(0, 0, Sound_btn.getMeasuredWidth(), Sound_btn.getMeasuredHeight());
                        Sound_btn.hitArea = hit_ON;
                        Sound_btn.on("mouseover", mouseHandler);
                        Sound_btn.on("mouseout", mouseHandler);
                        Sound_btn.on("click", click_Handler_OP);
                        container.addChild(Sound_btn);

                        var Music_btn = new createjs.Text("On", "35px Georgia", "#ffffff");
                        Music_btn.id = "Music_btn";
                        Music_btn.alpha = 0.8;
                        Music_btn.x = img.width / 2 - Music_btn.getMeasuredWidth() / 2;
                        Music_btn.y = img.height * 0.4;
                        Music_btn.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                        var hit_ON_M = new createjs.Shape();
                        hit_ON_M.graphics.beginFill("#000").drawRect(0, 0, Music_btn.getMeasuredWidth(), Music_btn.getMeasuredHeight());
                        Music_btn.hitArea = hit_ON_M;
                        Music_btn.on("mouseover", mouseHandler);
                        Music_btn.on("mouseout", mouseHandler);
                        Music_btn.on("click", click_Handler_OP);
                        container.addChild(Music_btn);
                        break;
                }

                function changes(ev) {
                    change_container_pos(ev, canvas.height / 5);
                }

                createjs.Tween.get(container).call(changes);

            };
        }
    }*/


    function tickHandler(ev) {
        stage.update();
        //ch.move();
    }


    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tickHandler);






}



function click_Handler_OP(ev) {
    if (ev.target.id === "Sound_btn") {
        if (ev.target.text === "On") {
            ev.target.text = "Off";
        }
        else if (ev.target.text === "Off") {
            ev.target.text = "On";
        }
    }
    else if (ev.target.id === "Music_btn") {
        if (ev.target.text === "On") {
            createjs.Sound.stop("menuMusic");
            ev.target.text = "Off";
        }
        else if (ev.target.text === "Off") {
            createjs.Sound.play("menuMusic");
            ev.target.text = "On";
        }
    }
}


function change_container_pos(container, height) {
}

function mouseHandler(ev, isCanvas) {
    if (isCanvas || ev.target.text === "Back" || ev.target.text === "On" || ev.target.text === "Off" || ev.target.text === "Exit" || ev.target.text === "Continue" || ev.target.text === "Yes" || ev.target.text === "No") {
        ev.target.alpha = (ev.type === "mouseover") ? 1 : 0.8;
        ev.target.shadow = (ev.type === "mouseover") ? new createjs.Shadow("#000000", 15, 15, 10) : new createjs.Shadow("#000000", 5, 5, 10);
    }
}

function customize(object, canvas, number) {
    var b = object.getBounds();
    object.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    object.x = (canvas.width / 2) - (b.width / 2);
    object.y = (canvas.height / 2.3) + number * 50;
    object.alpha = 0.8;
}

function saveGame(SAVE,state) {
    console.log(state.StudentProgress + " " + state.TeacherProgress);
    localStorage.setItem(SAVE, JSON.stringify(state));
}

function loadGame(SAVE) {
    return JSON.parse(localStorage.getItem(SAVE))
}

