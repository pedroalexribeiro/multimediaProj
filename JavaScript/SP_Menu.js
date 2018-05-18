"use strict";

function SP_Menu(stage,save, flags, isArcade) {
    document.getElementById("Menu").style.backgroundImage="url(../Resources/test.png)";

    var mouseFunction = function(ev){
        mouseHandler(ev, flags);
    };

    ContainerMenu(stage, "Help", flags);
    ContainerMenu(stage, "Options", flags);
    createHelp(stage, flags);
    createOptions(stage, flags);


    var arrayButtons = new Array();
    var iterator = 0;
    arrayButtons.push(new createjs.Text("Student", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Teacher", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Back", "35px Georgia", "#ffffff"));

    for(let text of arrayButtons){
        customize(text, stage.canvas, iterator);
        iterator += 1;
        var hit = new createjs.Shape(); //Creates Hitbox
        hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
        text.hitArea = hit;
        text.on("mouseover", mouseFunction);
        text.on("mouseout", mouseFunction);
        text.on("click",clickHandler_ST_TC);
        stage.addChild(text);
    }

    function clickHandler_ST_TC(ev){
        if(flags.isCanvas && ev.target.text === "Student") {
            stage.removeAllChildren();
            Student_Menu(stage,save, flags, isArcade);
        }
        else if( flags.isCanvas && ev.target.text === "Teacher") {
            stage.removeAllChildren();
            Teacher_Menu(stage,save);
        }
        else if(ev.target.text === "Back") {
            stage.removeAllChildren();
            mainMenu(flags);
        }

    }

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}
