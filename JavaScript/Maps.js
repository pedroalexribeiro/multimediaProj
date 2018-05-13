"user strict";

function Maps(stage, levelStr) {
    //Game Menu Information
    var container, containerEx, timer, init, goodJob, gameOver, msg, flag, flag2, timeoutId;
    var menuFlag = false, isExit = false, lost = false;
    createMenu();
    createExitMenu();
    createTimerAndGameOver(stage);
    window.addEventListener("keydown", KeyHandler);

    var hero = new Character(stage, 200, -200);
    //###################################################################
    var keyHandlers = function(ev) {
        hero.keys[ev.keyCode] = (ev.type === "keydown");
        if(ev.type === "keydown"){
            if((ev.keyCode === 37 || ev.keyCode === 38 || ev.keyCode === 39 || ev.keyCode === 40) && hero.isMoving === false) {
                hero.isMoving = true;
                hero.spriteA.gotoAndPlay("run");
            }
        }else{
            if(!hero.keys[37] && !hero.keys[38] && !hero.keys[39] && !hero.keys[40] && hero.isMoving ===  true){
                hero.isMoving = false;
            }
        }
        if(hero.isMoving===false){
            hero.spriteA.gotoAndStop("idle");
        }
    };

    window.addEventListener("keydown",keyHandlers);
    window.addEventListener('keyup', keyHandlers);
    //####################################################################

    var level;
    switch (levelStr) {
        case "level1":
            level = new LevelOne(stage);
            break;
        case "level2":
            level = new LevelTwo(stage);
            break;
        case "level3":
            //level = new LevelThree(stage);
            break;
    }
    var gameStart = createjs.Ticker.getTime(true);
    game();

    function handle() {
        //##################################################

        hero.move(level.platforms);
        //##################################################
        var currTime = createjs.Ticker.getTime(true);
        if (currTime - gameStart <= level.totalTime) {
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

                    if (obj.object.bitmap.y > 0) { // Horizontal
                        flag = "Horizontal";
                    }
                    else if (obj.object.bitmap.x > 0 && obj.object.bitmap.x < 800) { // Vertical
                        flag = "Vertical";
                    }
                    else {
                        flag = "Diagonal";
                    }

                    //Calcula coordinates para onde objeto se vai mover
                    var cords = obj.NewCords(400, 350, flag, stage);


                    //Calcula coordinates para onde objeto vai no Reset
                    var resetCords = level.Position(obj.object.bitmap.image.width, obj.object.bitmap.image.height,flag, stage);


                    //Move Object
                    obj.Move(cords[0], cords[1], level.speed[0], resetCords[0], resetCords[1]);
                }
                else { // Case for 2 Objects each Time
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

                    if (obj.object.bitmap.y > 0) { // Horizontal
                        flag = "Horizontal";
                    }
                    else if (obj.object.bitmap.x > 0 && obj.object.bitmap.x < 800) { // Vertical
                        flag = "Vertical";
                    }
                    else {
                        flag = "Diagonal";
                    }

                    var obj2 = level.objects[objectOfArray2];

                    if (obj2.object.bitmap.y > 0) { // Horizontal
                        flag2 = "Horizontal";
                    }
                    else if (obj2.object.bitmap.x > 0 && obj2.object.bitmap.x < 800) { // Vertical
                        flag2 = "Vertical";
                    }
                    else {
                        flag2 = "Diagonal";
                    }

                    //Calcula coordinates para onde objeto se vai mover
                    var cords = obj.NewCords(400, 350, flag, stage);
                    var cords2 = obj2.NewCords(400, 350, flag2, stage);

                    //Calcula coordinates para onde objeto vai no Reset
                    var resetCords = level.Position(obj.object.bitmap.image.width, obj.object.bitmap.image.height, flag, stage);
                    var resetCords2 = level.Position(obj2.object.bitmap.image.width, obj2.object.bitmap.image.height, flag2, stage);

                    //Move Object
                    obj.Move(cords[0], cords[1], level.speed[0], resetCords[0], resetCords[1]);
                    obj2.Move(cords2[0], cords2[1], level.speed[0], resetCords2[0], resetCords2[1]);
                }

                createjs.Ticker.removeEventListener("tick", handle);
                game();
            }
        }
        else {
            console.log("End of level");
            lost = true;
            goodJob.bitmap.alpha = 1;
            stage.addChild(goodJob.bitmap);
            msg.alpha = 1;
            stage.addChild(msg);
            createjs.Ticker.removeEventListener("tick", handle);
        }
        timer.text = "Timer: " + Math.ceil((level.totalTime - (currTime - gameStart)) / 1000);

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
                menuFlag = false;
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
            createjs.Ticker.paused = false;
            createjs.Ticker.removeEventListener("tick", handle);
            stage.removeAllChildren();
            Student_Menu(stage);
        }
        else if (ev.target.text === "No") {
            containerEx.alpha = 0;
            container.alpha = 1;
            isExit = false;
        }


        else if (ev.keyCode === 71 && !lost) {
            lost = true;
            createjs.Ticker.paused = true;
            gameOver.bitmap.alpha = 1;
            stage.addChild(gameOver.bitmap);
            msg.alpha = 1;
            stage.addChild(msg);
        }
        else if (ev.keyCode === 27 && lost) {
            lost = false;
            createjs.Ticker.paused = false;
            createjs.Ticker.removeEventListener("tick", handle);
            stage.removeAllChildren();
            stage.update();
            Student_Menu(stage);

        }
    }

    function createExitMenu() {
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
            no.on("mouseover", mouseHandler);
            no.on("mouseout", mouseHandler);
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
            yes.on("mouseover", mouseHandler);
            yes.on("mouseout", mouseHandler);
            yes.on("click", KeyHandler);
            containerEx.addChild(yes);


        }
    }

    function createMenu() {
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
            exit.on("mouseover", mouseHandler);
            exit.on("mouseout", mouseHandler);
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
            cont.on("mouseover", mouseHandler);
            cont.on("mouseout", mouseHandler);
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
        createjs.Ticker.paused = false;
    }
}


class Map {
    constructor(stage) {
        this.platforms = new Array();
        this.objects = new Array();
    }
}

class LevelOne extends Map {
    constructor(stage) {
        super(stage);
        //Level Background
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/test.png)";

        //Level Platforms
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platform.png", 100, 400));

        //Level Objects
        var initCords = this.Position(100, 100,"", stage); // Beer -> Slows permanently the character
        this.objects.push(new Object(stage, "../Resources/levels/Extras/small_beer_test.png", initCords[0], initCords[1]));
        //initCords = this.Position(100, 100,"", stage); //DeadLine -> Speeds permanently the character
        //this.objects.push(new Object(stage, "../Resources/levels/Extras/deadLine.png", initCords[0], initCords[1]));

        initCords = this.Position(100, 100,"", stage);
        this.objects.push(new Object(stage, "../Resources/levels/Level1/carOrange.png", initCords[0], initCords[1]));
        initCords = this.Position(100, 100,"", stage);
        this.objects.push(new Object(stage, "../Resources/levels/Level1/carBlue.png", initCords[0], initCords[1]));
        initCords = this.Position(100, 100,"", stage);
        this.objects.push(new Object(stage, "../Resources/levels/Level1/carGreen.png", initCords[0], initCords[1]));


        //Level Game Related Information
        this.totalTime = 15000; // Tempo total do jogo
        this.objInterval = 2000; //Intervalo entre cada Objeto
        this.speed = [1000, 1200]; //Max e Min de speed dos Objetos
        this.nObj = 1;
        this.nBuffs = 1;
    }

    Position(widthObj, heightObj,flag, stage) { //For level One

        var side = Math.random();
        if (side > 0.5) { // Right
            var xNew = stage.canvas.width + widthObj;
        }
        else { //Left
            var xNew = 0 - widthObj;
        }

        var yNew = Math.floor((Math.random() * ((this.platforms[0].platform.bitmap.y - heightObj) - (this.platforms[0].platform.bitmap.y/2 + heightObj))) + (this.platforms[0].platform.bitmap.y/2 + heightObj));
        //Random entre 260 e 340 +/-
        return [xNew, yNew];
    }
}


class LevelTwo extends Map {
    constructor(stage) {
        super(stage);
        //Level Background
        document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";

        //Level Platforms
        this.platforms.push(new Platform(stage, "../Resources/levels/Level2/Stairs.png", 250, 400));

        //Level Objects
        var initCords = this.Position(100, 100,"Horizontal", stage); // Beer -> Slows permanently the character
        this.objects.push(new Object(stage, "../Resources/levels/Extras/small_beer_test.png", initCords[0], initCords[1]));
        //initCords = this.Position(100, 100,"", stage); //DeadLine -> Speeds permanently the character
        //this.objects.push(new Object(stage, "../Resources/levels/Extras/deadLine.png", initCords[0], initCords[1]));

        initCords = this.Position(100, 100, "Vertical", stage);
        this.objects.push(new Object(stage, "../Resources/levels/Level2/rainDrop.png", initCords[0], initCords[1]));
        initCords = this.Position(100, 100, "Horizontal", stage);
        this.objects.push(new Object(stage, "../Resources/levels/Level2/umbrella2.png", initCords[0], initCords[1]));
        //initCords = this.Position(100, 100,"Horizontal", stage);
        //this.objects.push(new Object(stage, "../Resources/levels/Level2/umbrella.png", initCords[0], initCords[1]));


        //Level Game Related Information
        this.totalTime = 15000; // Tempo total do jogo
        this.objInterval = 2000; //Intervalo entre cada Objeto
        this.speed = [1000, 1200]; //Max e Min de speed dos Objetos
        this.nObj = 2;
        this.nBuffs = 1;
    }


    Position(widthObj, heightObj, flag, stage) {

        var yNew, xNew;
        if (flag === "Horizontal") {
            var side = Math.random();
            if (side > 0.5) { // Right
                xNew = stage.canvas.width + widthObj;
            }
            else { //Left
                xNew = 0 - widthObj;
            }

            yNew = Math.floor((Math.random() * ((this.platforms[0].platform.bitmap.y - heightObj) - (this.platforms[0].platform.bitmap.y/5 + heightObj))) + (this.platforms[0].platform.bitmap.y/5 + heightObj));
            //Random entre 260 e 340 +/-

        } else { //Mudar 261 (Numero Magico)
            xNew = Math.random() * ((this.platforms[0].platform.bitmap.x + 261) - this.platforms[0].platform.bitmap.x) + (this.platforms[0].platform.bitmap.x);
            yNew = 0 - heightObj;
        }
        return [xNew, yNew];
    }

}

class Platform {
    constructor(stage, src, init_x, init_y) {
        this.platform = new Image();
        this.platform.bitmap = new createjs.Bitmap(src);
        this.platform.bitmap.x = init_x;
        this.platform.bitmap.y = init_y;
        this.platform.bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(this.platform.bitmap);
    }
}

class Object {
    constructor(stage, src, init_x, init_y) {
        this.object = new Image();
        this.object.bitmap = new createjs.Bitmap(src);
        this.object.bitmap.x = init_x;
        this.object.bitmap.y = init_y;
        this.object.bitmap.alpha = 0;
        this.object.bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);


        stage.addChild(this.object.bitmap);
    }

    Move(x, y, speed, xReset, yReset) {
        console.log("Move-> x: " + x + " y:" + y);
        this.object.bitmap.alpha=1;
        createjs.Tween.get(this.object.bitmap).to({y: y, x: x}, speed, createjs.Ease.linear).call(Reset);

        function Reset(ev) {
            ev.target.alpha=0;
            ev.target.x = xReset;
            ev.target.y = yReset;
        }
    }


    NewCords(xChar, yChar, Flag, stage) {
        if (Flag === "Horizontal") {
            //y vai ser yChar (pequeno ajuste para ir ter com personagem)
            //x vai ser ou 0-objeto ou 800+objeto
            if (this.object.bitmap.x > 0) { //Varia do lado a que se encontra o objeto
                return [(0 - this.object.bitmap.image.width), yChar];
            }
            else {
                return [(stage.canvas.width + this.object.bitmap.image.width), yChar];
            }
        }
        else if (Flag === "Vertical") {
            //x vai ser sempre onde o objeto da "spawn"
            //y vai ser sempre 600 + objeto
            return [this.object.bitmap.x, (600 + this.object.bitmap.image.height)];

        }
        else if (Flag === "Diagonal") {
            /*POR AGORA E TEORICAMENTE UM TESTE*/
            //4 casos para cada canto

            if (this.object.bitmap.x > 0) {
                if (this.object.bitmap.y > 0) {// Left-Down Corner
                }
                else { //Left-Up Corner
                }
            }
            else {
                if (this.object.bitmap.y > 0) { //Right-Down Corner
                }
                else { //Right-Up Corner
                }

            }
        }
    }
}



