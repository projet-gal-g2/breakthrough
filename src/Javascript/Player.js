"use strict"

Breakthrough.Human = function (colorPiece, isIA) {
    var colorPlayer = colorPiece;
    var isIA = isIA;

    this.chooseStroke = function (possibleStroke, startStroke) {
        var possibleEndStroke = [];
        for ( var indexStroke = 0;  indexStroke < possibleStroke.length ; indexStroke++){
            if (startStroke === possibleStroke[indexStroke].getStartStroke()){
                possibleEndStroke.push(new Breakthrough.Stroke(startStroke, possibleStroke[indexStroke].getEndStroke()));
            }
        }
        return possibleEndStroke;
    };

    this.randomChooseStroke = function (possibleStroke) {
        var possibleEndStroke = [];
        var startStroke = possibleStroke[Math.floor(Math.random() * possibleStroke.length)].getStartStroke();
        var endStroke;
        for ( var indexStroke = 0;  indexStroke < possibleStroke.length ; indexStroke++){
            if (startStroke === possibleStroke[indexStroke].getStartStroke()){
                possibleEndStroke.push(new Breakthrough.Stroke(startStroke, possibleStroke[indexStroke].getEndStroke()));
            }
        }

        endStroke = possibleEndStroke[Math.floor(Math.random() * possibleEndStroke.length)].getEndStroke();
        return new Breakthrough.Stroke(startStroke, endStroke);
    };

    this.isIA = function (){
        return isIA;
    }
    this.getColorPlayer = function () {
        return colorPlayer;
    }
};