"   use strict";

function Student_Menu(stage) {
    document.getElementById("Menu").style.backgroundImage = "url(../Resources/Background.png)";
    var isCanvas = true;


    var state = {
        StudentProgress: 3,
        TeacherProgress: 1
    };
    var save = loadGame('save');
    if (save === null) {
        save = state;
        saveGame('save',save);
    } else {
        save.StudentProgress +=1;
        console.log(save.TeacherProgress + " " + save.StudentProgress);
        saveGame('save',save);
    }

    var mouseFunction = function (ev) {
        mouseHandler(ev, isCanvas);
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

    queue.loadFile({id:"lock", src:"../Resources/Options/lock.jpg"});
    queue.loadFile({id:"image", src:"../Resources/test.png"});
    queue.load();
    queue.on("complete",sth);
    function sth() {
        for (let level of arrayBoxes) {
            //Image
            if(count > save.StudentProgress){
                var bitmap = new createjs.Bitmap(queue.getResult("lock"));
                console.log(bitmap);

                var m = new createjs.Matrix2D();
                m.translate(x, y);
                m.scale(width / bitmap.image.width, height / bitmap.image.height);

                //level Draw
                level.graphics.beginStroke("#fff");
                level.graphics.beginBitmapFill(bitmap.image, "no-repeat", m);
                level.graphics.drawRect(x, y, width, height);

            }else {
                var bitmap = new createjs.Bitmap(queue.getResult("image"));

                var m = new createjs.Matrix2D();
                m.translate(x, y);
                console.log( bitmap.image.width);
                m.scale(width / bitmap.image.width, height / bitmap.image.height);

                //level Draw
                level.graphics.beginStroke("#fff");
                level.graphics.beginBitmapFill(bitmap.image.src, "no-repeat", m);
                level.graphics.drawRect(x, y, width, height);

                //Hitbox && Effects
                var hit_HP = new createjs.Shape();
                hit_HP.graphics.beginFill("#ff000").drawRect(x, y, width, height);
                level.hitArea = hit_HP;
                level.shadow = new createjs.Shadow("#000000", 5, 5, 10);
                level.alpha = 0.8;

                //Events
                level.on("click", Click_Handler);
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
    }

    function Click_Handler(ev) {
        if (ev.target.text === "Back") {
            stage.removeAllChildren();
            SP_Menu(stage);
        }
        else if (ev.target.text === "level1") {
            stage.removeAllChildren();
            Maps(stage,"level1");
        } else if (ev.target.text === "level2") {
            stage.removeAllChildren();
            Maps(stage,"level2");
        } else if (ev.target.text === "level3") {
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
    back.on("click", Click_Handler);
    stage.addChild(back);

    /*Flags for Options*/
    var flags = new Flags();
    createHelp(stage, flags);
    createOptions(stage, flags);

    ContainerMenu(stage, "Help", flags);
    ContainerMenu(stage, "Options", flags);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}