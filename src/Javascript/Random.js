"use strict"

Breakthrough.Random = function () {
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
};