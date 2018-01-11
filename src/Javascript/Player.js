"use strict"

Breakthrough.Player = function (cp, ia, p, id) {
    var _colorPlayer = cp;
    var _isIA = ia;
    var _pseudo = p;
    var _id = id;

    this.isIA = function (){
        return _isIA;
    };

    this.getColorPlayer = function () {
        return _colorPlayer;
    };

    this.getPseudo = function(){
        return _pseudo;
    };

    this.getId = function(){
        return _id;
    };
};