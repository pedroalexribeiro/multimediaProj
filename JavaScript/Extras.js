"use strict";

function Extras(stage, save, flags) {
    document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";



    ContainerMenu(stage, "Help", flags,"Unlock New character when you finish the game!\n Reset -> Deletes your save game!!");
    ContainerMenu(stage, "Options", flags);
    createHelp(stage, flags);
    createOptions(stage, flags);

    var mouseFunction = function (ev) {
        mouseHandler(ev, flags);
    };

    var arrayButtons = new Array();
    var iterator = 0;
    arrayButtons.push(new createjs.Text("Credits", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Character: ", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Reset", "35px Georgia", "#ffffff"));
    arrayButtons.push(new createjs.Text("Back", "35px Georgia", "#ffffff"));


    for (let text of arrayButtons) {
        if (text.text === "" && save.Senior) {
            text.id = "Char";
            text.text = "Senior";

            text.y = arrayButtons[iterator-1].y;
            text.x = arrayButtons[iterator-1].x + text.getMeasuredWidth() + arrayButtons[iterator-1].getMeasuredWidth()/2;
            var hit = new createjs.Shape(); //Creates Hitbox
            hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
            text.hitArea = hit;
            text.on("mouseover", mouseFunction);
            text.on("mouseout", mouseFunction);
            text.on("click", ExtrasClickHandler);
            stage.addChild(text);

        }else if(text.text === "" && !save.Senior){
            text.id = "Char";
            text.text = "Normal";

            text.y = arrayButtons[iterator-1].y;
            text.x = arrayButtons[iterator-1].x + text.getMeasuredWidth() + arrayButtons[iterator-1].getMeasuredWidth()/2;
            var hit = new createjs.Shape(); //Creates Hitbox
            hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
            text.hitArea = hit;
            text.on("mouseover", mouseFunction);
            text.on("mouseout", mouseFunction);
            text.on("click", ExtrasClickHandler);
            stage.addChild(text);
        }
        else if(text.text === "Character: "){
            text.x = (stage.canvas.width / 2) - (text.getMeasuredWidth());
            text.y = (stage.canvas.height / 2.3) + iterator * 50;

            iterator+=1;
            stage.addChild(text);
            stage.update();
        }
        else {
            customize(text, stage.canvas, iterator);
            iterator += 1;
            var hit = new createjs.Shape(); //Creates Hitbox
            hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
            text.hitArea = hit;
            text.on("mouseover", mouseFunction);
            text.on("mouseout", mouseFunction);
            text.on("click", ExtrasClickHandler);
            stage.addChild(text);
        }
    }

    function exitCredits(bitmap) {
        stage.removeChild(bitmap);
    }

    function ExtrasClickHandler(ev) {
        if (flags.isCanvas && ev.target.text === "Credits") {
            var introVideo = document.getElementById("creditsVideo");
            introVideo.play();
            var bitmap = new createjs.Bitmap(introVideo);
            stage.addChild(bitmap);
            var endCredits = function () {
                exitCredits(bitmap);
            };
            setTimeout(endCredits, 13000);
        } else if (flags.isCanvas && ev.target.id === "Char") {
            if(ev.target.text === "Normal"){
                if(save.StudentProgress >= 5 && save.TeacherProgress >= 5 ) {
                    ev.target.text = "Senior";
                    save.Senior = true;
                    saveGame('save', save);
                }
            }
            else{
                ev.target.text = "Normal";
                save.Senior = false;
                saveGame('save',save);
            }
        }
        else if (flags.isCanvas && ev.target.text === "Back") {
            stage.removeAllChildren();
            mainMenu(flags);
        }else if(flags.isCanvas && ev.target.text === "Reset"){

            var state = {
                Student: {"1":{"1":0, "2":0, "3":0, "4":0, "5":0}, "2":{"1":0, "2":0, "3":0, "4":0, "5":0}, "3":{"1":0, "2":0, "3":0, "4":0, "5":0}, "4":{"1":0, "2":0, "3":0, "4":0, "5":0}, "5":{"1":0, "2":0, "3":0, "4":0, "5":0}},
                Teacher: {"1":{"1":0, "2":0, "3":0, "4":0, "5":0}, "2":{"1":0, "2":0, "3":0, "4":0, "5":0}, "3":{"1":0, "2":0, "3":0, "4":0, "5":0}, "4":{"1":0, "2":0, "3":0, "4":0, "5":0}, "5":{"1":0, "2":0, "3":0, "4":0, "5":0}},
                Senior: false,
                StudentProgress: 1,
                TeacherProgress: 1,
            };
            saveGame('save',state);
            stage.removeAllChildren();
            mainMenu(flags);
        }
    }

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}