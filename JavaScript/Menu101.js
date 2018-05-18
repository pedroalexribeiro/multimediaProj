"use strict";

(function () {
    window.addEventListener("load", mainMenu);
}());

function mainMenu(teste) {
    var flags;
    if(teste.type == "load"){
        flags = new Flags();
    }else{
        flags = teste;
    }
    /*Music Stuff*/

    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", playMenuSong);
    createjs.Sound.registerSound("../Resources/Audio/menuMusic.mp3", "menuMusic", 1);
    createjs.Sound.registerSound("../Resources/Audio/gameMusic.mp3", "gameMusic", 2);


    /*Background Information*/
    document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";

    //Stage Loader
    var canvas = document.getElementById("Menu");
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);

    //SaveGame Loader
    var state = {
        StudentProgress: 1,
        TeacherProgress: 1
    };
    
    var save = loadGame('save');
    if (save === null) {
        save = state;
        saveGame('save',save);
    }

    var mouseFunctionMain = function (ev) {
        mouseHandler(ev, flags);
    };

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
        text.on("mouseover", mouseFunctionMain);
        text.on("mouseout", mouseFunctionMain);
        text.on("click", clickHandler_SP_MP_AC);
        stage.addChild(text);
    }

    ContainerMenu(stage, "Help", flags);
    ContainerMenu(stage, "Options", flags);
    createHelp(stage, flags);
    createOptions(stage, flags);

    function clickHandler_SP_MP_AC(ev) {
        console.log(ev.target.text);
        if (flags.isCanvas && ev.target.text === "SinglePlayer") {
            stage.removeAllChildren();
            SP_Menu(stage,save, flags, false);
        }
        if(flags.isCanvas && ev.target.text === "MultiPlayer") {

        }
        if (flags.isCanvas && ev.target.text === "Arcade") {
            stage.removeAllChildren();
            SP_Menu(stage,save, flags, true);
        }
        if (flags.isCanvas && ev.target.text === "Quit") {
            //window.close();
        }
    }

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}

function customize(object, canvas, number) {
    var b = object.getBounds();
    object.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    object.x = (canvas.width / 2) - (b.width / 2);
    object.y = (canvas.height / 2.3) + number * 50;
    object.alpha = 0.8;

}
function mouseHandler(ev, flags) {
    if (flags.isCanvas || ev.target.text === "Back" || ev.target.text === "On" || ev.target.text === "Off" || ev.target.text === "Exit" || ev.target.text === "Continue" || ev.target.text === "Yes" || ev.target.text === "No") {
        ev.target.alpha = (ev.type === "mouseover") ? 1 : 0.8;
        ev.target.shadow = (ev.type === "mouseover") ? new createjs.Shadow("#000000", 15, 15, 10) : new createjs.Shadow("#000000", 5, 5, 10);
    }
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

function saveGame(SAVE, state) {
    console.log(state.StudentProgress + " " + state.TeacherProgress);
    localStorage.setItem(SAVE, JSON.stringify(state));
}

function loadGame(SAVE) {
    return JSON.parse(localStorage.getItem(SAVE))
}

