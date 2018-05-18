"use strict";

function Leaderboard(stage, save, flags) {
    document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";

    var mouseFunction = function (ev) {
        mouseHandler(ev, flags);
    };

    var arrayButtons = new Array();
    var iterator = 0;
    arrayButtons.push(new createjs.Text("Leaderboard", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("----->", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("----->", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("----->", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("----->", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("----->", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Back", "35px Georgia", "#ffffff"));

    for (let text of arrayButtons) {
        if(text.text === "Leaderboard"){
            text.x = (stage.canvas.width / 2) - (text.getMeasuredWidth()/2);
            text.y = ((stage.canvas.height / 2.3) + iterator * 50) - 55;
            iterator+=1;
            stage.addChild(text);
            stage.update();
        }
        else if(text.text === "Back"){
            customize(text, stage.canvas, iterator);
            text.y = (stage.canvas.height * 0.85);
            iterator += 1;
            var hit = new createjs.Shape(); //Creates Hitbox
            hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
            text.hitArea = hit;
            text.on("mouseover", mouseFunction);
            text.on("mouseout", mouseFunction);
            text.on("click", leaderboardClickHandler);
            stage.addChild(text);
        }else{
            text.text = iterator.toString() + " " + text.text + " " + "Empty";
            text.x = (stage.canvas.width / 2) - (text.getMeasuredWidth()/2);
            text.y = (((stage.canvas.height / 2.3) + iterator * 50) - 55);
            iterator += 1;
            stage.addChild(text);
        }
    }

    function leaderboardClickHandler(ev) {
        if (flags.isCanvas && ev.target.text === "Back") {
            stage.removeAllChildren();
            mainMenu(flags);
        }
    }
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}