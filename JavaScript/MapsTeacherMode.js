"use strict";

/*Steps for Every Object
* 1st -> Chose a starting Position (diff from every map)
* 2nd -> calculate trajectory with Character
* 3rd -> Tween Move to other side of Screen
* 4th -> Reset Position to another Random Position (Diff from every map)
*
* All of the above already implemented
* */
function MapsTeacherMode(stage, levelStr, save, flags, isArcade) {

    //Game Menu Information
    var container, containerEx, timer, init, goodJob, gameOver, timeoutId, msg;
    var menuFlag = false, isExit = false, lost = false;
    createMenu();
    playGameSong(flags);

    window.addEventListener("keydown", KeyHandler);
    var despawn = function () {
        killNPC(level);
    };
    window.addEventListener("click", despawn);

    var level;
    switch (levelStr) {
        case "level1":
            level = new LevelOneTeacherMode(stage, save);
            break;
        case "level2":
            level = new LevelTwoTeacherMode(stage, save);
            break;
        case "level3":
            level = new LevelThreeTeacherMode(stage, save);
            break;
        case "level4":
            level = new LevelFourTeacherMode(stage, save);
            break;
        case "level5":
            level = new LevelFiveTeacherMode(stage, save);
            break;
    }

    for (let i = 0; i < level.lives; i++) {
        stage.addChild(level.hearts[i]);
        level.hearts[i].x = 10 + (i * 5) + i * 32;
        level.hearts[i].y = 10;
        stage.update();
    }

    var gameStart = createjs.Ticker.getTime(true);
    game();

    function killNPC(level) {
        for (let i = 0; i < level.npcs.length; i++) {
            var pt = level.npcs[i].spriteA.globalToLocal(stage.mouseX, stage.mouseY);
            if (level.npcs[i].spriteA.hitTest(pt.x, pt.y)) {
                playSound(false, "hit", flags);
                level.npcs[i].spriteA.visible = false;
                level.npcs[i].isUsed = false;
            }
        }
    }

    function game() {
        init = createjs.Ticker.getTime(true);
        createjs.Ticker.addEventListener("tick", handle);
        createjs.Ticker.framerate = 60;
    }

    function handle(event) {
        if (!event.paused) {
            for (let i = 0; i < level.npcs.length; i++) {
                if (level.npcs[i].isUsed == true) {
                    if (level.npcs[i].spriteA.x > 848 || level.npcs[i].spriteA.x < -48 || (level.npcs[i].spriteA.y > 800 + level.npcs[i].spriteA.getTransformedBounds().height)) {
                        playSound(false, "lives", flags);
                        level.npcs[i].isUsed = false;
                        level.npcs[i].spriteA.visible = false;
                        level.lives -= 1;
                        level.hearts[level.lives].visible = false;
                    } else {
                        if (level.npcs[i].spriteA.originalX < 400) {
                            if (level.npcs[i].spriteA.x == level.npcs[i].spriteA.originalX) {
                                level.npcs[i].spriteA.gotoAndPlay("run_right");
                            }
                            level.npcs[i].moveRight(level.platforms);
                        } else {
                            if (level.npcs[i].spriteA.x == level.npcs[i].spriteA.originalX) {
                                level.npcs[i].spriteA.gotoAndPlay("run_left");
                            }
                            level.npcs[i].moveLeft(level.platforms);
                        }
                        stage.update();
                    }
                }
            }
            var currTime = createjs.Ticker.getTime(true);
            if (currTime - gameStart <= level.totalTime) {
                if (level.lives == 0) {
                    gameStatus("gameOver", save);
                }
                if (currTime - init >= level.npcInterval) {
                    for (let i = 0; i < level.npcs.length; i++) {
                        if (level.npcs[i].isUsed == false) {
                            level.npcs[i].spriteA.originalX = level.position(level.npcs[i].spriteA.getTransformedBounds().width, stage);
                            level.npcs[i].spriteA.x = level.npcs[i].spriteA.originalX;
                            level.npcs[i].spriteA.y = 0;
                            level.npcs[i].spriteA.visible = true;
                            level.npcs[i].isUsed = true;
                            break;
                        }
                    }

                    createjs.Ticker.removeEventListener("tick", handle);
                    game();
                }
            }
            else {
                gameStatus("goodJob", save);
            }
            timer.text = "Timer: " + Math.ceil((level.totalTime - (currTime - gameStart)) / 1000);
        }
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
                timeoutId = setTimeout(timeOut, 500);
            }
        }

        else if (ev.target.text === "Exit") {
            containerEx.alpha = 1;
            container.alpha = 0;
            isExit = true;
        }
        else if (ev.target.text === "Yes") {
            playMenuSong(flags);
            createjs.Ticker.paused = false;
            createjs.Ticker.removeEventListener("tick", handle);
            window.removeEventListener("keydown", KeyHandler);
            stage.removeAllChildren();
            Teacher_Menu(stage, save, flags, isArcade);
        }
        else if (ev.target.text === "No") {
            containerEx.alpha = 0;
            container.alpha = 1;
            isExit = false;
        }

        else if (ev.keyCode === 27 && lost) {
            lost = false;
            playMenuSong(flags);
            stage.removeAllChildren();
            window.removeEventListener("keydown", KeyHandler);
            Teacher_Menu(stage, save, flags, isArcade);
        }
    }

    function gameStatus(Flag, save) {
        console.log("End of level");
        lost = true;

        if (Flag === "gameOver") {
            playSound(true, "gameOver", flags);
            gameOver.bitmap.alpha = 1;
            stage.addChild(gameOver.bitmap);
        } else if (Flag === "goodJob") {
            playSound(true, "goodJob", flags);
            if (level.lvl >= save.TeacherProgress || save.TeacherProgress < 5) {
                save.TeacherProgress += 1;
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
        var audioFunction = function (ev) {
            clickHandlerAudio(ev, flags, "gameMusic");
        };
        var mouseFunction = function (ev) {
            mouseHandler(ev, flags);
        };
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
            var soundButton = new createjs.Text("", "35px Georgia", "#ffffff");
            if (flags.sState) {
                soundButton.text = "On";
                soundButton.id = "SoundState";
            }
            else {
                soundButton.text = "Off";
                soundButton.id = "SoundState";
            }
            soundButton.alpha = 0.8;
            soundButton.x = img.width / 2 - soundButton.getMeasuredWidth() / 2;
            soundButton.y = img.height * 0.55;
            soundButton.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hit_ON = new createjs.Shape();
            hit_ON.graphics.beginFill("#000").drawRect(0, 0, soundButton.getMeasuredWidth(), soundButton.getMeasuredHeight());
            soundButton.hitArea = hit_ON;
            soundButton.on("mouseover", mouseFunction);
            soundButton.on("mouseout", mouseFunction);
            soundButton.on("click", audioFunction);
            container.addChild(soundButton);

            var musicButton = new createjs.Text("", "35px Georgia", "#ffffff");
            if (flags.mState) {
                musicButton.text = "On";
                musicButton.id = "MusicState";
            }
            else {
                musicButton.text = "Off";
                musicButton.id = "MusicState";
            }
            musicButton.alpha = 0.8;
            musicButton.x = img.width / 2 - musicButton.getMeasuredWidth() / 2;
            musicButton.y = img.height * 0.4;
            musicButton.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            var hit_ON_M = new createjs.Shape();
            hit_ON_M.graphics.beginFill("#000").drawRect(0, 0, musicButton.getMeasuredWidth(), musicButton.getMeasuredHeight());
            musicButton.hitArea = hit_ON_M;
            musicButton.on("mouseover", mouseFunction);
            musicButton.on("mouseout", mouseFunction);
            musicButton.on("click", audioFunction);
            container.addChild(musicButton);
        };

        createExitMenu();
        createTimerAndGameOver();
    }

    function createExitMenu() {
        var mouseFunction = function (ev) {
            mouseHandler(ev, flags);
        };
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

    function playMenuSong(flags) {
        createjs.Sound.stop("gameOver");
        if (flags.mState) {
            createjs.Sound.stop("gameMusic");
            var instance = createjs.Sound.play("menuMusic");
            instance.on("complete", playMenuSong);
        }
    }

    function playGameSong(flags) {
        if (flags.mState) {
            createjs.Sound.stop("menuMusic");
            var instance = createjs.Sound.play("gameMusic");
            instance.on("complete", playGameSong);
        }
    }
}

class MapTeacherMode {
    constructor() {
        this.platforms = new Array();
        this.hearts = new Array();
        this.npcs = new Array();
        this.lives = 3;

        for (let i = 0; i < this.lives; i++) {
            this.hearts.push(new createjs.Bitmap("../Resources/levels/Extras/life.png"));
        }
    }
}

class LevelOneTeacherMode extends MapTeacherMode {
    constructor(stage, save) {
        super(stage, save);
        //Level Background
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/levels/Level1/background.png)";

        //Level Platforms
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platformBig.png", 0, 400));

        //Level Game Related Information
        this.totalTime = 15000; // Tempo total do jogo
        this.npcInterval = 2000; //Intervalo entre cada NPC

        //Level NPCs
        var neededNPCs = this.totalTime / this.npcInterval;
        for (let i = 0; i < neededNPCs; i++) {
            this.npcs.push(new Character(stage, 200, 0, save.Senior));
            this.npcs[i].spriteA.visible = false;
        }
    }

    position(widthObj, stage) { //For level One
        var side = Math.random();
        if (side > 0.5) { // Right
            var xNew = stage.canvas.width - widthObj;
        } else { //Left
            var xNew = 1;
        }
        return xNew;
    }
}

class LevelTwoTeacherMode extends MapTeacherMode {
    constructor(stage, save) {
        super(stage, save);
        //Level Background
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/levels/Level2/background.png)";

        //Level Platforms
        this.platforms.push(new Platform(stage, "../Resources/levels/Level2/SlabBig.png", 0, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level2/SlabBig.png", 300, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level2/SlabBig.png", 600, 400));

        //Level Game Related Information
        this.totalTime = 30000; // Tempo total do jogo
        this.npcInterval = 1000; //Intervalo entre cada NPC

        //Level NPCs
        var neededNPCs = this.totalTime / this.npcInterval;
        for (let i = 0; i < neededNPCs; i++) {
            this.npcs.push(new Character(stage, 200, 0, save.Senior));//325
            this.npcs[i].spriteA.visible = false;
        }
    }

    position(widthObj, stage) { //For level One
        var x = Math.floor(Math.random() * 799);
        return x;
    }
}

class LevelThreeTeacherMode extends MapTeacherMode {
    constructor(stage, save) {
        super(stage, save);
        //Level Background
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/levels/Level3/background.png)";

        //Level Platforms
        this.platforms.push(new Platform(stage, "../Resources/levels/Level3/platformBig.png", 0, 100));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level3/platformBig.png", 200, 250));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level3/platformBig.png", 400, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level3/platformBig.png", 600, 550));

        //Level Game Related Information
        this.totalTime = 60000; // Tempo total do jogo
        this.npcInterval = 800; //Intervalo entre cada NPC

        //Level NPCs
        var neededNPCs = this.totalTime / this.npcInterval;
        for (let i = 0; i < neededNPCs; i++) {
            this.npcs.push(new Character(stage, 200, 0, save.Senior));//325
            this.npcs[i].spriteA.visible = false;
        }
    }

    position(widthObj, stage) { //For level One
        var x = Math.floor(Math.random() * 799);
        return x;
    }
}

class LevelFourTeacherMode extends MapTeacherMode {
    constructor(stage, save) {
        super(stage, save);
        //Level Background
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/levels/Level4/background.png)";

        //Level Platforms
        this.platforms.push(new Platform(stage, "../Resources/levels/Level4/platformBig.png", 0, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level4/tableBig.png", 200, 100));

        //Level Game Related Information
        this.totalTime = 60000; // Tempo total do jogo
        this.npcInterval = 1000; //Intervalo entre cada NPC

        //Level NPCs
        var neededNPCs = this.totalTime / this.npcInterval;
        for (let i = 0; i < neededNPCs; i++) {
            this.npcs.push(new Character(stage, 200, 0, save.Senior));//325
            this.npcs[i].spriteA.visible = false;
        }
    }

    position(widthObj, stage) { //For level One
        var x = Math.floor(Math.random() * 799);
        return x;
    }
}

class LevelFiveTeacherMode extends MapTeacherMode {
    constructor(stage, save) {
        super(stage, save);
        //Level Background
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/levels/Level5/background.png)";

        //Level Platforms
        this.platforms.push(new Platform(stage, "../Resources/levels/Level5/platform_pc.png", 0, 78));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level5/platform_keyboard.png", 40, 240));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level5/platform_pc.png", 664, 78));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level5/platform_keyboard.png", 500, 240));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level5/platform_pc.png", 330, 400));

        //Level Game Related Information
        this.totalTime = 60000; // Tempo total do jogo
        this.npcInterval = 1000; //Intervalo entre cada NPC

        //Level NPCs
        var neededNPCs = this.totalTime / this.npcInterval;
        for (let i = 0; i < neededNPCs; i++) {
            this.npcs.push(new Character(stage, 200, 0, save.Senior));//325
            this.npcs[i].spriteA.visible = false;
        }
    }

    position(widthObj, stage) { //For level One
        var x = Math.floor(Math.random() * 799);
        return x;
    }
}