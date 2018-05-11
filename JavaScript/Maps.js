"user strict";

/*Steps for Every Object
* 1st -> Chose a starting Position (diff from every map)
* 2nd -> calculate trajectory with Character
* 3rd -> Tween Move to other side of Screen
* 4th -> Reset Position to another Random Position (Diff from every map)
*
* All of the above already implemented
* */
function Maps(stage2) {

    var stage = stage2;

    //Game Menu Information
    var container, containerEx, timer, init;
    var menuFlag = false, isExit = false;
    createMenu();
    createExitMenu();
    createTimer(stage);
    window.addEventListener("keydown", KeyHandler);


    //var hero = new Character(stage, 200, -200);

    var level = new LevelOne(stage);
    var gameStart = createjs.Ticker.getTime(true);
    game();

    function handle(event) {
        if (!event.paused) {
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

                        //##########MUDAR HORIZONTAL PARA MODULAR#########


                        //Calcula coordinates para onde objeto se vai mover
                        var cords = obj.NewCords(400, 350, "Horizontal", stage);

                        //Calcula coordinates para onde objeto vai no Reset
                        var resetCords = level.Position(obj.object.bitmap.image.width, obj.object.bitmap.image.height, stage);
                        //Move Object
                        obj.Move(cords[0], cords[1], level.speed[0], resetCords[0], resetCords[1]);
                    }
                    else { // Case for 2 Objects each Time

                    }

                    createjs.Ticker.removeEventListener("tick", handle);
                    game();
                }
            }
            else {
                console.log("End of level");
                createjs.Ticker.removeEventListener("tick", handle);
            }
            timer.text = "Timer: " + Math.ceil((level.totalTime - (currTime - gameStart)) / 1000);
        }
    }

    function game() {
        init = createjs.Ticker.getTime(true);
        createjs.Ticker.addEventListener("tick", handle);
        createjs.Ticker.framerate = 60;
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

    function createTimer() {
        timer = new createjs.Text("", "50px monospace", "#000");
        timer.x = stage.canvas.width / 2 - 130;
        stage.addChild(timer);
    }

    function KeyHandler(ev) {
        if (ev.keyCode === 27 && menuFlag === false) {
            menuFlag = true;
            container.alpha = 1;
            //Disable Character Movement -> A flag?
        }
        else if (ev.keyCode === 27 && menuFlag === true || ev.target.text === "Continue") {
            if (!isExit) {
                menuFlag = false;
                container.alpha = 0;

                /*var timeoutBegin = createjs.Ticker.getTime(false);
                createjs.Ticker.on("complete", timeout);
                function timeout() {
                    console.log(createjs.Ticker.getTime(false) - timeoutBegin);
                    if (createjs.Ticker.getTime(false) - timeoutBegin > 2000) {
                    }
                    else {
                        timeout();
                    }
                }*/

                //Wait Timer for 3 seconds more or less before continuing
            }
        }

        else if (ev.target.text === "Exit") {
            containerEx.alpha = 1;
            container.alpha = 0;
            isExit = true;
        }
        else if (ev.target.text === "Yes") {
            createjs.Ticker.removeEventListener("tick", handle);
            stage.removeAllChildren();
            Student_Menu(stage);
        }
        else if (ev.target.text === "No") {
            containerEx.alpha = 0;
            container.alpha = 1;
            isExit = false;
        }
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
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platform_grass.png", 92.5, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platform_grass.png", 297.5, 400));
        this.platforms.push(new Platform(stage, "../Resources/levels/Level1/platform_grass.png", 502.5, 400));

        //Level Objects
        var initCords = this.Position(100, 100, stage); // Higher than any Object but shouldnt be a problem
        this.objects.push(new Object(stage, "../Resources/levels/Extras/small_beer_test.png", initCords[0], initCords[1]));
        initCords = this.Position(100, 100, stage);
        this.objects.push(new Object(stage, "../Resources/levels/Level1/carOrange.png", initCords[0], initCords[1]));


        //Level Game Related Information
        this.totalTime = 15000; // Tempo total do jogo
        this.objInterval = 2000; //Intervalo entre cada Objeto
        this.speed = [1000, 1200]; //Max e Min de speed dos Objetos
        this.nObj = 1;
        this.nBuffs = 1;
    }

    Position(widthObj, heightObj, stage) { //For level One

        var side = Math.random();
        if (side > 0.5) { // Right
            var xNew = stage.canvas.width + widthObj;
        }
        else { //Left
            var xNew = 0 - widthObj;
        }

        var yNew = Math.floor((Math.random() * ((400 - heightObj) - (200 + heightObj))) + (200 + heightObj));
        //Random entre 260 e 340 +/-
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
        this.object.bitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        stage.addChild(this.object.bitmap);
    }

    Move(x, y, speed, xReset, yReset) {
        console.log("Move-> x: " + x + " y:" + y);
        createjs.Tween.get(this.object.bitmap).to({y: y, x: x}, speed, createjs.Ease.linear).call(Reset);

        function Reset(ev) {
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



