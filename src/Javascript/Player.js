"use strict"

Breakthrough.Player = function (colorPiece, isIA) {
    var colorPlayer = colorPiece;
    var isIA = isIA;

    this.isIA = function (){
        return isIA;
    }
    this.getColorPlayer = function () {
        return colorPlayer;
    }
};