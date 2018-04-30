"use strict";

(function()
{
    window.addEventListener("load", main);
}());


function main()
{
    var sWidth = window.screen.availWidth;
    var wWidth = 1000;
    var wHeight = 800;
    var wLeft = (sWidth - wWidth)/2;	//center window on the screen
    var myWindow = window.open("Html/First_Menu.html", "mainWindow", "width = " + wWidth + ", height = " + wHeight + ", left = " + wLeft);
}

