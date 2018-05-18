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
    arrayButtons.push(new createjs.Text("Student", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Level 1", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Back", "35px Georgia", "#ffffff"));

    var buttonsFunction = function (ev) {
        leaderboardClickHandler(ev, arrayButtons);
    }
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
            text.on("click", buttonsFunction);
            stage.addChild(text);
        }else if(text.text === "Student"){
            text.x = stage.canvas.width - text.getMeasuredWidth() - stage.canvas.width/8 + 5 ;
            text.y =  250;
            text.id = "mode";
            iterator += 1;
            var hit = new createjs.Shape(); //Creates Hitbox
            hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
            text.hitArea = hit;
            text.on("mouseover", mouseFunction);
            text.on("mouseout", mouseFunction);
            text.on("click", buttonsFunction);
            stage.addChild(text);
        }else if(text.text === "Level 1"){
            text.x = stage.canvas.width - text.getMeasuredWidth() - stage.canvas.width/8;
            text.y =  350;
            text.id = "map";
            iterator += 1;
            var hit = new createjs.Shape(); //Creates Hitbox
            hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
            text.hitArea = hit;
            text.on("mouseover", mouseFunction);
            text.on("mouseout", mouseFunction);
            text.on("click", buttonsFunction);
            stage.addChild(text);
        }else{
            text.text = iterator.toString() + " " + text.text + " " + "0";
            text.id = iterator.toString();
            text.x = (stage.canvas.width / 2) - (text.getMeasuredWidth()/2);
            text.y = (((stage.canvas.height / 2.3) + iterator * 50) - 55);
            iterator += 1;
            stage.addChild(text);
        }
    }

    function leaderboardClickHandler(ev, arrayButtons) {
        if (flags.isCanvas && ev.target.text === "Back") {
            stage.removeAllChildren();
            mainMenu(flags);
        }else if (flags.isCanvas && ev.target.id === "mode") {
            if(ev.target.text === "Student"){
                ev.target.text = "Teacher";
            }else{
                ev.target.text = "Student";
            }
        }else if(flags.isCanvas && ev.target.id === "map"){
            var number = parseInt(ev.target.text.split(" ")[1]);
            if(number < 5){
                number += 1;
            }else{
                number = 1;
            }
            var ite = 1;
            for(let text of arrayButtons) {
                if (text.id === "mode") {
                    var mode = text.text;
                    break;
                }
            }
            for(let text of arrayButtons) {
                if(text.id === ite.toString()){
                    text.text = ite.toString() + " " + "----->" + " " + save[mode][number.toString()][ite.toString()].toString();
                    ite++;
                }
            }
            ev.target.text = "Level" + " " + number.toString();
        }
    }
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}