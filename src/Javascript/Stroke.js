"use strict"

Breakthrough.Stroke = function (start, end) {
    var startStroke = start;
    var endStroke = end;

    this.toString = function (){
        return "( " + startStroke + ", " + endStroke + " ) ";
    };

    this.getStartStroke = function () {
        return startStroke;
    };

    this.getEndStroke = function () {
        return endStroke;
    };
};