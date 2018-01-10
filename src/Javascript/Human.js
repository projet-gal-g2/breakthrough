"use strict"

Breakthrough.Human = function () {
    this.chooseStroke = function (possibleStroke, startStroke) {
        var possibleEndStroke = [];
        for ( var indexStroke = 0;  indexStroke < possibleStroke.length ; indexStroke++){
            if (startStroke === possibleStroke[indexStroke].getStartStroke()){
                possibleEndStroke.push(new Breakthrough.Stroke(startStroke, possibleStroke[indexStroke].getEndStroke()));
            }
        }
        return possibleEndStroke;
    };
};