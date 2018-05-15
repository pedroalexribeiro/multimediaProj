"use strict";

(function () {
    window.addEventListener("load", mainMenu);
}());

function mainMenu() {
    /*Music Stuff*/
    var audioPath = "../Resources/Audio/";
    var sounds = [
        {id: "gameMusic", src: "gameMusic.mp3"},
        {id: "another", src: "menuMusic.mp3"}
    ];

    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", soundLoad);
    createjs.Sound.registerSound("../Resources/Audio/menuMusic.mp3", "menuMusic", 1);
    createjs.Sound.registerSound("../Resources/Audio/gameMusic.mp3", "gameMusic", 2);


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
    var audioState = function (ev) {
        clickHandlerAudio(ev, mState, sState);
    };
    var mState = true;
    var sState = true;

    var containerHelp, containerOptions;
    ContainerMenu("Help");
    ContainerMenu("Options");

    function ContainerMenu(Flag) {
        //Loads container
        var img = new Image();
        img.src = "../Resources/Options/ChalkBoard.png";
        img.onload = function () {
            var container = new createjs.Container();
            container.x = canvas.width / 2 - img.width / 2;
            container.y = -400;
            stage.addChild(container);


            var bg = new createjs.Shape();
            bg.graphics.beginBitmapFill(img, "no-repeat");
            bg.graphics.drawRect(0, 0, img.width, img.height);
            container.addChild(bg);


            if (Flag === "Options") {
                containerHelp = container;
                var title = new createjs.Text("Help", "50px Georgia", "#ffffff");
                title.alpha = 0.8;
                title.x = img.width / 2 - title.getMeasuredWidth() / 2;
                title.y = title.getMeasuredHeight();
                container.addChild(title);

                var back2 = new createjs.Text("Back", "35px Georgia", "#ffffff");
                back2.id = "Help";
                back2.x = container.width / 2 - back2.width / 2;
                back2.y = container.height * 0.8;
                back2.alpha = 0.8;
                back2.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                var hit = new createjs.Shape(); //Creates Hitbox
                hit.graphics.beginFill("#000").drawRect(0, 0, back2.getMeasuredWidth(), back2.getMeasuredHeight());
                back2.hitArea = hit;
                back2.on("mouseover", mouseFunction);
                back2.on("mouseout", mouseFunction);
                back2.on("click", containerReset);

            }
            else if (Flag === "Help") {
                containerOptions = container;

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
                        if (mState && text.text === "MusicState") {
                            text.text = "On";
                            text.id = "MusicState";
                        }
                        else if (!mState && text.text === "MusicState") {
                            text.text = "Off";
                            text.id = "MusicState";

                        }
                        if (sState && text.text === "SoundState") {
                            text.text = "On";
                            text.id = "SoundState";
                        }
                        else if (!sState && text.text === "SoundState") {
                            text.text = "Off";
                            text.id = "SoundState";
                        }

                        customizeContainer(text, img, iterator2, true, false);
                    }
                    else if (text.text === "Music:" || text.text === "Sounds:") { // Music and Sound
                        customizeContainer(text, img, iterator2, false, true);
                    }
                    else customizeContainer(text, img, iterator2, true, false); // Back

                    iterator2 += 1;
                    containerOptions.addChild(text);
                }
            }
        }
    }

    function changeIsCanvas() {
        if (isCanvas) isCanvas = false;
        else isCanvas = true;
    }

    function containerReset(ev) {
        if (!isCanvas && ev.target.id === "Help") {
            createjs.Tween.get(containerHelp).to({y: (-400)}, 750, createjs.Ease.sineIn);
            changeIsCanvas();
        }
        else if (!isCanvas && ev.target.id === "Options") {
            createjs.Tween.get(containerOptions).to({y: (-400)}, 750, createjs.Ease.sineIn);
            changeIsCanvas();
        }
    }

    function containerMove(ev) {
        if (isCanvas && ev.target.id === "Help") {
            createjs.Tween.get(containerHelp).to({y: (stage.canvas.height / 5)}, 750, createjs.Ease.sineIn);
            changeIsCanvas();
        }
        else if (isCanvas && ev.target.id === "Options") {
            createjs.Tween.get(containerOptions).to({y: (stage.canvas.height / 5)}, 750, createjs.Ease.sineIn);
            changeIsCanvas();
        }
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
                object.id = "Options";
                object.on("click", containerReset);
            }
            else if (object.text === "On" || object.text === "Off") {
                object.on("click", audioState);
            }
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


    createHelp();
    createOptions();

    function createHelp() {

        //Help Button
        var help = new Image();
        help.src = "../Resources/Options/Help.png";
        var bitmap = new createjs.Bitmap(help.src);
        bitmap.x = 720;
        bitmap.y = 500;
        bitmap.alpha = 0.8;
        bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(bitmap);

        var hit_HP = new createjs.Shape();
        hit_HP.graphics.beginFill("#000").drawRect(0, 0, help.width, help.height);
        bitmap.hitArea = hit_HP;
        help.bitmap = bitmap;

        bitmap.id = "Help";
        bitmap.on("mouseover", mouseFunction);
        bitmap.on("mouseout", mouseFunction);
        bitmap.on("click", containerMove);
    }

    function createOptions() {
        //Options Button
        var options = new Image();
        options.src = "../Resources/Options/Options.png";
        var bitmap = new createjs.Bitmap(options.src);
        bitmap.x = 10;
        bitmap.y = 530;
        bitmap.alpha = 0.8;
        bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(bitmap);

        var hit_OP = new createjs.Shape();
        hit_OP.graphics.beginFill("#000").drawRect(0, 0, options.width, options.height);
        bitmap.hitArea = hit_OP;
        options.bitmap = bitmap;

        bitmap.id = "Options";
        bitmap.on("mouseover", mouseFunction);
        bitmap.on("mouseout", mouseFunction);
        bitmap.on("click", containerMove);
    }

    function clickHandler_SP_MP_AC(ev) {
        console.log(ev.target.text);
        if (isCanvas && ev.target.text === "SinglePlayer") {
            stage.removeAllChildren();
            SP_Menu(stage);
        }
        if(isCanvas && ev.target.text === "MultiPlayer") {
            stage.removeAllChildren();
            MapsTeacherMode(stage);
        }
        if (isCanvas && ev.target.text === "Quit") {
            //window.close();
        }
    }

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);


}


function clickHandlerAudio(ev, mState, sState) {
    console.log(ev.target.id);
    if (ev.target.id === "SoundState") {
        if (ev.target.text === "On") {
            ev.target.text = "Off";
            sState = false;
        }
        else if (ev.target.text === "Off") {
            ev.target.text = "On";
            sState = true;
        }
    }
    else if (ev.target.id === "MusicState") {
        if (ev.target.text === "On") {
            createjs.Sound.stop("menuMusic");
            mState = false;
            ev.target.text = "Off";
        }
        else if (ev.target.text === "Off") {
            createjs.Sound.play("menuMusic");
            mState = true;
            ev.target.text = "On";
        }
    }
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

function saveGame(SAVE, state) {
    console.log(state.StudentProgress + " " + state.TeacherProgress);
    localStorage.setItem(SAVE, JSON.stringify(state));
}

function loadGame(SAVE) {
    return JSON.parse(localStorage.getItem(SAVE))
}

