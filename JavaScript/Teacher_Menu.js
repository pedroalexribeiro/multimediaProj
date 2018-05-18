"use strict";

function Teacher_Menu(stage, save, flags, isArcade) {
    document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";

    var mouseFunction = function (ev) {
        mouseHandler(ev, flags);
    };

    var arrayBoxes = new Array();
    arrayBoxes.push(new createjs.Shape);
    arrayBoxes.push(new createjs.Shape);
    arrayBoxes.push(new createjs.Shape);
    arrayBoxes.push(new createjs.Shape);
    arrayBoxes.push(new createjs.Shape);


    var count = 1;
    var width = 100;
    var height = 100;
    var x = stage.canvas.width / 6 - width / 2;
    var y = stage.canvas.height / 2 - height / 3;
    var queue;
    queue = new createjs.LoadQueue(false);

    queue.loadFile({id: "lock", src: "../Resources/Options/lock.jpg"});
    queue.loadFile({id: "level1", src: "../Resources/levels/thumbnails/student/level1.PNG"});
    queue.loadFile({id: "level2", src: "../Resources/levels/thumbnails/teacher/level2.PNG"});
    queue.loadFile({id: "level3", src: "../Resources/levels/thumbnails/teacher/level3.PNG"});
    queue.loadFile({id: "level4", src: "../Resources/levels/thumbnails/teacher/level4.PNG"});
    queue.loadFile({id: "level5", src: "../Resources/levels/thumbnails/teacher/level5.PNG"});
    queue.load();
    queue.on("complete", loadLevels);

    function loadLevels() {
        for (let level of arrayBoxes) {
            if (count > save.TeacherProgress) {
                var bitmap = new createjs.Bitmap(queue.getResult("lock"));
                var m = new createjs.Matrix2D();
                m.translate(x, y);
                m.scale(width / bitmap.image.width, height / bitmap.image.height);

                //level Draw
                level.graphics.beginStroke("#fff");
                level.graphics.beginBitmapFill(bitmap.image, "no-repeat", m);
                level.graphics.drawRect(x, y, width, height);

            } else {
                var bitmap = new createjs.Bitmap(queue.getResult("level"+count));

                var m = new createjs.Matrix2D();
                m.translate(x, y);
                m.scale(width / bitmap.image.width, height / bitmap.image.height);

                //level Draw
                level.graphics.beginStroke("#fff");
                level.graphics.beginBitmapFill(bitmap.image, "no-repeat", m);
                level.graphics.drawRect(x, y, width, height);

                //Hitbox && Effects
                var hit_HP = new createjs.Shape();
                hit_HP.graphics.beginFill("#ff000").drawRect(x, y, width, height);
                level.hitArea = hit_HP;
                level.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                level.alpha = 0.8;

                //Events
                if (!isArcade) {
                    level.on("click", Click_Handler);
                } else {
                    level.on("click", clickHandlerArcade);
                }
                level.on("mouseover", mouseFunction);
                level.on("mouseout", mouseFunction);
            }
            //Title
            var title = new createjs.Text("Level" + count, "22px Georgia", "#fff");
            title.x = x + title.getMeasuredWidth() / 3;
            title.y = y + 110;
            stage.addChild(title);

            //Update
            level.text = "level" + count;
            stage.addChild(level);
            count += 1;
            x += 130;
        }
        ContainerMenu(stage, "Help", flags,"Fail everyone or you lose!\n You have 3 lifes!\n Just click on those lil hobbits!");
        ContainerMenu(stage, "Options", flags);
        createHelp(stage, flags);
        createOptions(stage, flags);
    }

    function clickHandlerArcade(ev) {
        if (flags.isCanvas) {
            if (ev.target.text === "Back") {
                stage.removeAllChildren();
                SinglePlayerMenu(stage, save, flags, isArcade);
            } else if (ev.target.text === "level1") {
                stage.removeAllChildren();
                TeacherArcade(stage, "level1", save, flags, isArcade);
            } else if (ev.target.text === "level2") {
                stage.removeAllChildren();
                TeacherArcade(stage, "level2", save, flags, isArcade);
            } else if (ev.target.text === "level3") {
                stage.removeAllChildren();
                TeacherArcade(stage, "level3", save, flags, isArcade);
            }else if (ev.target.text === "level4") {
                stage.removeAllChildren();
                TeacherArcade(stage, "level4", save, flags, isArcade);
            }else if (ev.target.text === "level5") {
                stage.removeAllChildren();
                TeacherArcade(stage, "level5", save, flags, isArcade);
            }
        }
    }

    function exitStoryline(){
        stage.removeAllChildren();
        MapsTeacherMode(stage, "level1", save, flags, isArcade);
    }
    function Click_Handler(ev) {
        if (flags.isCanvas) {
            if (ev.target.text === "Back") {
                stage.removeAllChildren();
                SinglePlayerMenu(stage, save, flags, isArcade);
            } else if (ev.target.text === "level1") {
                stage.removeAllChildren();
                var introVideo = document.getElementById("teacherVideo");
                introVideo.play();
                var bitmap = new createjs.Bitmap(introVideo);
                stage.addChild(bitmap);
                var timeoutId = setTimeout(exitStoryline, 21000);
                document.onkeydown = function(evt) {
                    evt = evt || window.event;
                    if (evt.keyCode == 13) {
                        clearTimeout(timeoutId);
                        exitStoryline();
                    }
                };
                TeacherGame(stage, "level1", save, flags, isArcade);
            } else if (ev.target.text === "level2") {
                stage.removeAllChildren();
                TeacherGame(stage, "level2", save, flags, isArcade);
            } else if (ev.target.text === "level3") {
                stage.removeAllChildren();
                TeacherGame(stage, "level3", save, flags, isArcade);
            } else if (ev.target.text === "level4") {
                stage.removeAllChildren();
                TeacherGame(stage, "level4", save, flags, isArcade);
            } else if (ev.target.text === "level5") {
                stage.removeAllChildren();
                TeacherGame(stage, "level5", save, flags, isArcade);
            }
        }
    }

    //Back Button
    var back = (new createjs.Text("Back", "35px Georgia", "#ffffff"));
    customize(back, stage.canvas, 4);
    var hit = new createjs.Shape(); //Creates Hitbox
    hit.graphics.beginFill("#000").drawRect(0, 0, back.getMeasuredWidth(), back.getMeasuredHeight());
    back.hitArea = hit;
    back.on("mouseover", mouseFunction);
    back.on("mouseout", mouseFunction);
    if (!isArcade) {
        back.on("click", Click_Handler);
    } else {
        back.on("click", clickHandlerArcade);
    }
    stage.addChild(back);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}