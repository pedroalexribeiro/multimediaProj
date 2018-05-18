//"use strict";

function createHelp(stage, flags) {
    var mouseFunction = function(ev){
        mouseHandlerContainer(ev, flags);
    };
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
    bitmap.id = "Help";
    bitmap.on("mouseover", mouseFunction);
    bitmap.on("mouseout", mouseFunction);
    var teste = function(ev){
        containerMove(stage, flags, ev);
    };
    bitmap.on("click", teste);
    help.bitmap = bitmap;
}

function createOptions(stage, flags) {
    var mouseFunction = function(ev){
        mouseHandlerContainer(ev, flags);
    };
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

    bitmap.id = "Options";
    bitmap.on("mouseover", mouseFunction);
    bitmap.on("mouseout", mouseFunction);
    var teste = function(ev){
        containerMove(stage, flags, ev);
    };
    bitmap.on("click", teste);
    options.bitmap = bitmap;
}

function ContainerMenu(stage, opt, flags,string) {
    var texto = string || null;
    var mouseFunction = function(ev){
        mouseHandlerContainer(ev, flags);
    };
    var containerFunction = function (ev) {
        containerReset(ev, flags)
    };
    //Loads container
    var img = new Image();
    img.src = "../Resources/Options/ChalkBoard.png";
    img.onload = function () {
        var container = new createjs.Container();
        container.x = stage.canvas.width / 2 - img.width / 2;
        container.y = -400;
        stage.addChild(container);


        var bg = new createjs.Shape();
        bg.graphics.beginBitmapFill(img, "no-repeat");
        bg.graphics.drawRect(0, 0, img.width, img.height);
        container.addChild(bg);


        if (opt === "Help") {
            containerHelp = container;
            var title = new createjs.Text("Help", "50px Georgia", "#ffffff");
            title.alpha = 0.8;
            title.x = img.width / 2 - title.getMeasuredWidth() / 2;
            title.y = title.getMeasuredHeight();
            container.addChild(title);

            var txt = new createjs.Text(texto, "20px Georgia", "#ffffff");
            txt.alpha = 0.8;
            txt.x = img.width / 2 - txt.getMeasuredWidth() / 2;
            txt.y = img.height * 0.5;
            container.addChild(txt);

            var back2 = new createjs.Text("Back", "35px Georgia", "#ffffff");
            back2.id = "Help";
            back2.x = img.width / 2 - back2.getMeasuredWidth() / 2;
            back2.y = img.height * 0.75;
            back2.alpha = 0.8;
            back2.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hit = new createjs.Shape(); //Creates Hitbox
            hit.graphics.beginFill("#000").drawRect(0, 0, back2.getMeasuredWidth(), back2.getMeasuredHeight());
            back2.hitArea = hit;
            back2.on("mouseover", mouseFunction);
            back2.on("mouseout", mouseFunction);
            back2.on("click", containerFunction);
            container.addChild(back2);
            return containerHelp;

        }
        else if (opt === "Options") {
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
                    if (flags.mState && text.text === "MusicState") {
                        text.text = "On";
                        text.id = "MusicState";
                    }
                    else if (!flags.mState && text.text === "MusicState") {
                        text.text = "Off";
                        text.id = "MusicState";

                    }
                    if (flags.sState &&  text.text === "SoundState") {
                        text.text = "On";
                        text.id = "SoundState";
                    }
                    else if (!flags.sState &&  text.text === "SoundState") {
                        text.text = "Off";
                        text.id = "SoundState";
                    }

                    customizeContainer(text, img, iterator2, true, false, flags);
                }
                else if (text.text === "Music:" || text.text === "Sounds:") { // Music and Sound
                    customizeContainer(text, img, iterator2, false, true, flags);
                }
                else customizeContainer(text, img, iterator2, true, false, flags); // Back

                iterator2 += 1;
                containerOptions.addChild(text);
            }
            return containerOptions;
        }
    }
}

function changeIsCanvas(flags) {
    if (flags.isCanvas) flags.isCanvas = false;
    else flags.isCanvas = true;
}

function containerReset(ev, flags) {
    if (!flags.isCanvas && ev.target.id === "Help") {
        createjs.Tween.get(containerHelp).to({y: (-400)}, 750, createjs.Ease.sineIn);
        changeIsCanvas(flags);
    }
    else if (!flags.isCanvas && ev.target.id === "Options") {
        createjs.Tween.get(containerOptions).to({y: (-400)}, 750, createjs.Ease.sineIn);
        changeIsCanvas(flags);
    }
}

function containerMove(stage, flags, ev) {
    ev.target.alpha = 0.8;
    ev.target.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    if (flags.isCanvas && ev.target.id === "Help") {
        createjs.Tween.get(containerHelp).to({y: (stage.canvas.height / 5)}, 750, createjs.Ease.sineIn);
        changeIsCanvas(flags);
    }
    else if (flags.isCanvas && ev.target.id === "Options") {
        createjs.Tween.get(containerOptions).to({y: (stage.canvas.height / 5)}, 750, createjs.Ease.sineIn);
        changeIsCanvas(flags);
    }
}

function customizeContainer(object, container, iterator, hitBox, flag, flags) {
    var mouseFunction = function(ev){
        mouseHandlerContainer(ev, flags);
    }
    var containerFunction = function (ev) {
        containerReset(ev, flags)
    }
    var audioState = function (ev) {
        clickHandlerAudio(ev, flags,"menuMusic");
    };

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
            object.on("click", containerFunction);
        }
        else if (object.text === "On" || object.text === "Off") {
            object.on("click", audioState);
        }
    }
}

function mouseHandlerContainer(ev, flags) {
    if (flags.isCanvas || ev.target.text === "Back" || ev.target.text === "On" || ev.target.text === "Off" || ev.target.text === "Exit" || ev.target.text === "Continue" || ev.target.text === "Yes" || ev.target.text === "No") {
        ev.target.alpha = (ev.type === "mouseover") ? 1 : 0.8;
        ev.target.shadow = (ev.type === "mouseover") ? new createjs.Shadow("#000000", 15, 15, 10) : new createjs.Shadow("#000000", 5, 5, 10);
    }
}

function clickHandlerAudio(ev, flags,musicId) {
    console.log(ev.target.id);
    if (ev.target.id === "SoundState") {
        if (ev.target.text === "On") {
            ev.target.text = "Off";
            flags.sState = false;
        }
        else if (ev.target.text === "Off") {
            ev.target.text = "On";
            flags.sState = true;
        }
    }
    else if (ev.target.id === "MusicState") {
        if (ev.target.text === "On") {
            createjs.Sound.stop("menuMusic");
            flags.mState = false;
            ev.target.text = "Off";
        }
        else if (ev.target.text === "Off") {
            createjs.Sound.play(musicId);
            flags.mState = true;
            ev.target.text = "On";
        }
    }
}