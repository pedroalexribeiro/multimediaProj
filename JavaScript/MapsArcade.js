"use strict";

function MapsArcade(stage, levelStr, save, flags, isArcade) {
    //Game Menu Information
    var container, containerEx, timer, init, goodJob, gameOver, msg, flag, flag2, timeoutId;
    var menuFlag = false, isExit = false, lost = false;
    createMenu();
    playGameSong();
    window.addEventListener("keydown", KeyHandler);
    var level;
    switch (levelStr) {
        case "level1":
            level = new LevelOne(stage);
            break;
        case "level2":
            level = new LevelTwo(stage);
            break;
        case "level3":
            level = new LevleThree(stage);
            break;
    }


    //###################################################################
    var keyHandlers = function (ev) {
        let right = 37, left = 39, up = 39, down = 40;

        level.hero.keys[ev.keyCode] = (ev.type === "keydown");
        if (ev.type === "keydown") {
            if ((ev.keyCode === right || ev.keyCode === left) && level.hero.isMoving === false && !menuFlag) {
                level.hero.isMoving = true;
                level.hero.hasChanged = true;

            }
        } else {
            if (!level.hero.keys[right] && !level.hero.keys[left] && !level.hero.keys[up] && !level.hero.keys[down] && level.hero.isMoving === true) {
                level.hero.isMoving = false;
            }
        }
    };

    window.addEventListener("keydown", keyHandlers);
    window.addEventListener('keyup', keyHandlers);
    //####################################################################


    var gameStart = createjs.Ticker.getTime(true);
    game();

    function handle() {
        //##################################################
        level.hero.move(level.platforms, menuFlag);
        if (level.hero.isMoving === false) {
            if (level.hero.isWalkingRight) {
                level.hero.spriteA.gotoAndPlay("idle_right");
            } else {
                level.hero.spriteA.gotoAndPlay("idle_left");
            }
        } else {
            if (level.hero.hasChanged) {
                level.hero.hasChanged = false;
                if (level.hero.isWalkingRight) {
                    level.hero.spriteA.gotoAndPlay("run_right");
                } else {
                    level.hero.spriteA.gotoAndPlay("run_left");
                }
            }
        }
        stage.update();
        var test = level.hero.collide(level.objects, menuFlag);
        if (test === 1) { // gameOver
            gameStatus("gameOver", save);
        }
        if (level.hero.spriteA.y > 600) {
            gameStatus("gameOver", save);
        }
        //##################################################

        var currTime = createjs.Ticker.getTime(true);
        if (currTime - init >= level.objInterval) {
                //Escolhe objetos do level
                if (level.nObj === 1) { // 1 objeto
                    var objectOfArray;
                    var x = Math.random();
                    if (x < 0.25) { // 1/4th of chance of appearing buff/Debuff (first numbers(level.nBuffs) of Array)
                        objectOfArray = Math.floor(Math.random() * level.nBuffs);
                    }
                    else {
                        objectOfArray = Math.floor(Math.random() * (level.objects.length - level.nBuffs) + level.nBuffs);
                    }

                    var obj = level.objects[objectOfArray];

                    if (obj.object.bitmap.y > 0 && obj.object.bitmap.y < 600) { // Horizontal
                        flag = "Horizontal";
                    }
                    else if (obj.object.bitmap.x > 0 && obj.object.bitmap.x < 800) { // Vertical
                        flag = "Vertical";
                    }
                    else {
                        flag = "Diagonal";
                    }

                    //Calcula coordinates para onde objeto se vai mover
                    var cords = obj.NewCords(level.hero.spriteA.x, level.hero.spriteA.y, flag, stage);


                    //Calcula coordinates para onde objeto vai no Reset
                    var resetCords = level.Position(obj.object.bitmap.image.width, obj.object.bitmap.image.height, flag, stage);

                    var speed = Math.random() * (level.speed[0] - level.speed[1]) + level.speed[1];
                    //Move Object
                    obj.Move(cords[0], cords[1], speed, resetCords[0], resetCords[1]);
                }

                // Case for 2 Objects each Time
                else {
                    var objectOfArray, objectOfArray2;
                    var x = Math.random();
                    if (x < 0.25) { // 1/4th of chance of appearing buff/Debuff (first numbers(level.nBuffs) of Array)
                        objectOfArray = Math.floor(Math.random() * level.nBuffs);
                        objectOfArray2 = Math.floor(Math.random() * (level.objects.length - level.nBuffs) + level.nBuffs);
                    }
                    else {
                        do {
                            objectOfArray = Math.floor(Math.random() * (level.objects.length - level.nBuffs) + level.nBuffs);
                            objectOfArray2 = Math.floor(Math.random() * (level.objects.length - level.nBuffs) + level.nBuffs);
                        } while (objectOfArray === objectOfArray2);
                    }

                    var obj = level.objects[objectOfArray];

                    if (obj.object.bitmap.y > 0 && obj.object.bitmap.y < 600) { // Horizontal
                        flag = "Horizontal";
                    }
                    else if (obj.object.bitmap.x > 0 && obj.object.bitmap.x < 800) { // Vertical
                        flag = "Vertical";
                    }
                    else {
                        flag = "Diagonal";
                    }


                    var obj2 = level.objects[objectOfArray2];

                    if (obj2.object.bitmap.y > 0 && obj2.object.bitmap.y < 600) { // Horizontal
                        flag2 = "Horizontal";
                    }
                    else if (obj2.object.bitmap.x > 0 && obj2.object.bitmap.x < 800) { // Vertical
                        flag2 = "Vertical";
                    }
                    else {
                        flag2 = "Diagonal";
                    }

                    //Calcula coordinates para onde objeto se vai mover
                    var cords = obj.NewCords(level.hero.spriteA.x, level.hero.spriteA.y, flag, stage);
                    var cords2 = obj2.NewCords(level.hero.spriteA.x, level.hero.spriteA.y, flag2, stage);

                    //Calcula coordinates para onde objeto vai no Reset
                    var resetCords = level.Position(obj.object.bitmap.image.width, obj.object.bitmap.image.height, flag, stage);
                    var resetCords2 = level.Position(obj2.object.bitmap.image.width, obj2.object.bitmap.image.height, flag2, stage);

                    //Move Object
                    var speed = Math.random() * (level.speed[0] - level.speed[1]) + level.speed[1];

                    obj.Move(cords[0], cords[1], speed, resetCords[0], resetCords[1]);
                    speed = Math.random() * (level.speed[0] - level.speed[1]) + level.speed[1];
                    obj2.Move(cords2[0], cords2[1], speed, resetCords2[0], resetCords2[1]);
                }
                createjs.Ticker.removeEventListener("tick", handle);
                game();
        }
        if (level.objInterval > 1000){
            level.objInterval -= 0.80;
        }
        if(level.speed[0] > 800){
            level.speed[0] -= 0.95;
            level.speed[1] -= 0.95;
        }
        timer.text = "Timer: " + Math.ceil(((currTime - gameStart)) / 1000);
    }

    function game() {
        init = createjs.Ticker.getTime(true);
        createjs.Ticker.addEventListener("tick", handle);
        createjs.Ticker.framerate = 60;
    }

    function KeyHandler(ev) {
        if (ev.keyCode === 27 && !menuFlag && !lost) {
            clearTimeout(timeoutId);
            menuFlag = true;
            container.alpha = 1;
            //Disable Character Movement -> A flag?
            createjs.Ticker.paused = true;
        }
        else if (ev.keyCode === 27 && menuFlag && !lost || ev.target.text === "Continue") {
            if (!isExit) {
                container.alpha = 0;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(timeOut, 2000);
            }
        }

        else if (ev.target.text === "Exit") {
            containerEx.alpha = 1;
            container.alpha = 0;
            isExit = true;
        }
        else if (ev.target.text === "Yes") {
            playMenuSong();
            createjs.Ticker.paused = false;
            createjs.Ticker.removeEventListener("tick", handle);
            window.removeEventListener("keydown", KeyHandler);
            stage.removeAllChildren();
            Student_Menu(stage, save, flags, isArcade);
        }
        else if (ev.target.text === "No") {
            containerEx.alpha = 0;
            container.alpha = 1;
            isExit = false;
        }

        else if (ev.keyCode === 27 && lost) {
            lost = false;
            playMenuSong();
            stage.removeAllChildren();
            window.removeEventListener("keydown", KeyHandler);
            Student_Menu(stage, save, flags, isArcade);
        }
    }

    function gameStatus(Flag, save) {
        console.log("End of level");
        lost = true;

        if (Flag === "gameOver") {
            gameOver.bitmap.alpha = 1;
            stage.addChild(gameOver.bitmap);
        } else if (Flag === "goodJob") {
            if (level.lvl >= save.StudentProgress) {
                save.StudentProgress += 1;
                saveGame('save', save);
            }
            goodJob.bitmap.alpha = 1;
            stage.addChild(goodJob.bitmap);
        }
        msg.alpha = 1;
        stage.addChild(msg);
        createjs.Ticker.removeEventListener("tick", handle);
        stage.update();
    }

    function createMenu() {
        var audioFunction = function(ev){
            clickHandlerAudio(ev, flags);
        }
        var mouseFunction = function (ev) {
            mouseHandler(ev,flags);
        }
        //Loads container
        var img = new Image();
        img.src = "../Resources/Options/ChalkBoard.png";
        img.onload = function () {
            container = new createjs.Container();
            container.x = stage.canvas.width / 2 - img.width / 2;
            container.y = 150;
            stage.addChild(container);
            var bg = new createjs.Shape();
            bg.graphics.beginBitmapFill(img, "no-repeat");
            bg.graphics.drawRect(0, 0, img.width, img.height);
            container.alpha = 0;
            container.addChild(bg);

            //Menu Title
            var menu = new createjs.Text("Menu", "50px Georgia", "#ffffff");
            menu.alpha = 0.8;
            menu.x = img.width / 2 - menu.getMeasuredWidth() / 2;
            menu.y = img.height * 0.08;
            container.addChild(menu);


            //Exit Button
            var exit = new createjs.Text("Exit", "35px Georgia", "#ffffff");
            exit.alpha = 0.8;
            exit.x = img.width / 2 - exit.getMeasuredWidth() / 2;
            exit.y = img.height * 0.7;
            exit.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hitExit = new createjs.Shape();
            hitExit.graphics.beginFill("#000").drawRect(0, 0, exit.getMeasuredWidth(), exit.getMeasuredHeight());
            exit.hitArea = hitExit;
            exit.on("mouseover", mouseFunction);
            exit.on("mouseout", mouseFunction);
            exit.on("click", KeyHandler);
            container.addChild(exit);


            //Continue Button
            var cont = new createjs.Text("Continue", "35px Georgia", "#ffffff");
            cont.alpha = 0.8;
            cont.x = img.width / 2 - cont.getMeasuredWidth() / 2;
            cont.y = img.height * 0.25;
            cont.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hitCont = new createjs.Shape();
            hitCont.graphics.beginFill("#000").drawRect(0, 0, cont.getMeasuredWidth(), cont.getMeasuredHeight());
            cont.hitArea = hitCont;
            cont.on("mouseover", mouseFunction);
            cont.on("mouseout", mouseFunction);
            cont.on("click", KeyHandler);
            container.addChild(cont);


            //Music/Song Buttons
            var music = new createjs.Text("Music:", "35px Georgia", "#ffffff");
            music.alpha = 0.8;
            music.x = img.width / 2 - music.getMeasuredWidth() - exit.getMeasuredWidth() / 2;
            music.y = img.height * 0.4;
            container.addChild(music);
            var sounds = new createjs.Text("Sounds:", "35px Georgia", "#ffffff");
            sounds.alpha = 0.8;
            sounds.x = img.width / 2 - sounds.getMeasuredWidth() - exit.getMeasuredWidth() / 2;
            sounds.y = img.height * 0.55;
            container.addChild(sounds);

            //On/Off Buttons and Hitboxes
            var Sound_btn = new createjs.Text("On", "35px Georgia", "#ffffff");
            Sound_btn.id = "Sound_btn";
            Sound_btn.alpha = 0.8;
            Sound_btn.x = img.width / 2 - Sound_btn.getMeasuredWidth() / 2;
            Sound_btn.y = img.height * 0.55;
            Sound_btn.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hit_ON = new createjs.Shape();
            hit_ON.graphics.beginFill("#000").drawRect(0, 0, Sound_btn.getMeasuredWidth(), Sound_btn.getMeasuredHeight());
            Sound_btn.hitArea = hit_ON;
            Sound_btn.on("mouseover", mouseFunction);
            Sound_btn.on("mouseout", mouseFunction);
            Sound_btn.on("click", audioFunction);
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
            Music_btn.on("mouseover", mouseFunction);
            Music_btn.on("mouseout", mouseFunction);
            Music_btn.on("click", audioFunction);
            container.addChild(Music_btn);
        };

        createExitMenu();
        createTimerAndGameOver();
    }

    function createExitMenu() {
        var mouseFunction = function (ev) {
            mouseHandler(ev,flags);
        }
        var img = new Image();
        img.src = "../Resources/Options/ChalkBoard.png";
        img.onload = function () {
            containerEx = new createjs.Container();
            containerEx.x = stage.canvas.width / 2 - img.width / 2;
            containerEx.y = 150;
            containerEx.alpha = 0;
            stage.addChild(containerEx);
            var bg = new createjs.Shape();
            bg.graphics.beginBitmapFill(img, "no-repeat");
            bg.graphics.drawRect(0, 0, img.width, img.height);
            containerEx.addChild(bg);

            var exitt = new createjs.Text("Exit?", "60px Georgia", "#ffffff");
            exitt.alpha = 1;
            exitt.x = img.width / 2 - exitt.getMeasuredWidth() / 2;
            exitt.y = img.height * 0.2;
            containerEx.addChild(exitt);


            var no = new createjs.Text("No", "45px Georgia", "#ffffff");
            no.alpha = 0.8;
            no.x = img.width / 2 - exitt.getMeasuredWidth() / 2 - no.getMeasuredWidth() / 2;
            no.y = img.height / 2;
            no.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hitNo = new createjs.Shape();
            hitNo.graphics.beginFill("#000").drawRect(0, 0, no.getMeasuredWidth(), no.getMeasuredHeight());
            no.hitArea = hitNo;
            no.on("mouseover", mouseFunction);
            no.on("mouseout", mouseFunction);
            no.on("click", KeyHandler);
            containerEx.addChild(no);

            var yes = new createjs.Text("Yes", "45px Georgia", "#ffffff");
            yes.alpha = 0.8;
            yes.x = img.width / 2 + exitt.getMeasuredWidth() / 2 - no.getMeasuredWidth() / 2;
            yes.y = img.height / 2;
            yes.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hitYes = new createjs.Shape();
            hitYes.graphics.beginFill("#000").drawRect(0, 0, yes.getMeasuredWidth(), yes.getMeasuredHeight());
            yes.hitArea = hitYes;
            yes.on("mouseover", mouseFunction);
            yes.on("mouseout", mouseFunction);
            yes.on("click", KeyHandler);
            containerEx.addChild(yes);


        }
    }

    function createTimerAndGameOver() {
        //Timer
        timer = new createjs.Text("", "50px monospace", "#000");
        timer.x = stage.canvas.width / 2 - 130;
        stage.addChild(timer);

        //End of Level
        goodJob = new Image();
        goodJob.src = "../Resources/levels/Extras/goodJob.png";
        var bitmap = new createjs.Bitmap(goodJob.src);
        bitmap.x = stage.canvas.width / 2 - 250;
        bitmap.y = stage.canvas.height / 2 - 250;
        bitmap.alpha = 0;
        bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        goodJob.bitmap = bitmap;

        //GameOver
        gameOver = new Image();
        gameOver.src = "../Resources/levels/Extras/gameOver.png";
        var bitmap = new createjs.Bitmap(gameOver.src);
        bitmap.x = stage.canvas.width / 2 - 250;
        bitmap.y = stage.canvas.height / 2 - 250;
        bitmap.alpha = 0;
        bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        gameOver.bitmap = bitmap;


        //Click esc To go to Menu
        msg = new createjs.Text("Click ESC to leave", "30px monospace", "#000");
        msg.x = stage.canvas.width / 2 - 150;
        msg.y = 500;
        msg.alpha = 0;

    }

    function timeOut() {
        menuFlag = false;
        createjs.Ticker.paused = false;
    }

    function playMenuSong() {
        createjs.Sound.stop("gameMusic");
        var instance = createjs.Sound.play("menuMusic");
        instance.on("complete", playMenuSong);
    }

    function playGameSong() {
        createjs.Sound.stop("menuMusic");
        var instance = createjs.Sound.play("gameMusic");
        instance.on("complete", playGameSong);
    }

}


