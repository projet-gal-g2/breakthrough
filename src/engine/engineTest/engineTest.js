"use strict";

var Breakthrough = require('../../Breakthrough.js');
var BreakthroughTestCase = TestCase("BreakthroughTestCase");

// Test des deux premières lignes du tableau
BreakthroughTestCase.prototype.testTwoFirstLines = function () {
    var firstLines = ['BLACK','BLACK','BLACK','BLACK','BLACK','BLACK','BLACK','BLACK',
        'BLACK','BLACK','BLACK','BLACK','BLACK','BLACK','BLACK','BLACK'];

    var newEngine = new Breakthrough.Engine();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;

    for ( var firstSquares = 0; firstSquares < ONE_LINE*2; firstSquares++ ) {
        if ( firstLines[firstSquares] !== initBoard[firstSquares] ) {
            errorCounter ++;
        }
    }
    assertTrue( errorCounter === 0 );
};

// Test du milieu tableau
BreakthroughTestCase.prototype.testMiddleBoard = function () {
    var firstLines = ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY',
        'EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'];

    var newEngine = new Breakthrough.Engine();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;
    var lastTwoLines = SIZEBOARD - (ONE_LINE*2);

    for ( var firstSquares = ONE_LINE*2; firstSquares <lastTwoLines; firstSquares++ ) {
        if ( firstLines[firstSquares] !== initBoard[firstSquares] ) {
            errorCounter ++;
        }
    }
    assertTrue( errorCounter === 0 );
};

// Test des deux dernières lignes du tableau
BreakthroughTestCase.prototype.testTwoLastLines = function () {
    var lastLines = ['WHITE','WHITE','WHITE','WHITE','WHITE','WHITE','WHITE','WHITE',
        'WHITE','WHITE','WHITE','WHITE','WHITE','WHITE','WHITE','WHITE'];

    var newEngine = new Breakthrough.Engine();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;
    var lastTwoLines = SIZEBOARD - (ONE_LINE*2);

    for ( var lastSquares = lastTwoLines; lastSquares < SIZEBOARD; lastSquares++ ) {
        if ( lastLines[lastSquares] !== initBoard[lastSquares] ) {
            errorCounter ++;
        }
    }
    assertTrue( errorCounter === 0 );
};
