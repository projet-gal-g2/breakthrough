"use strict";

var BreakthroughTestCase = TestCase("BreakthroughTestCase");

// Test des deux premières lignes du tableau
BreakthroughTestCase.prototype.testTwoFirstLines = function () {
    var firstLines = [];
    for ( var iter = 0; iter < Breakthrough.ONE_LINE*2; iter++) {
        firstLines[iter] = Breakthrough.Piece.BLACK;
    }

    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;

    for ( var firstSquares = 0; firstSquares < Breakthrough.ONE_LINE*2; firstSquares++ ) {
        if ( firstLines[firstSquares] != initBoard[firstSquares] ) {
            errorCounter ++;
        }
    }
    assertTrue( errorCounter === 0 );
};

// Test du milieu tableau
BreakthroughTestCase.prototype.testMiddleBoard = function () {
    var midBoard = [];
    var newEngine = new Breakthrough.Engine();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;
    var lastTwoLines = Breakthrough.SIZEBOARD - (Breakthrough.ONE_LINE*2);

    for ( var iter = 0; iter < Breakthrough.ONE_LINE*2; iter++) {
        midBoard[iter] = Breakthrough.Piece.EMPTY;
    }

    for ( var firstSquares = Breakthrough.ONE_LINE*2; firstSquares <lastTwoLines; firstSquares++ ) {
        if ( midBoard[firstSquares] !== initBoard[firstSquares] ) {
            errorCounter ++;
        }
    }
    assertTrue( errorCounter === 0 );
};

// Test des deux dernières lignes du tableau
BreakthroughTestCase.prototype.testTwoLastLines = function () {
    var lastLines = [];
    var newEngine = new Breakthrough.Engine();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;
    var lastTwoLines = Breakthrough.SIZEBOARD - (Breakthrough.ONE_LINE*2);

    for ( var iter = 0; iter < Breakthrough.ONE_LINE*2; iter++) {
        lastLines[iter] = Breakthrough.Piece.BLACK;
    }
    for ( var lastSquares = lastTwoLines; lastSquares < Breakthrough.SIZEBOARD; lastSquares++ ) {
        if ( lastLines[lastSquares] !== initBoard[lastSquares] ) {
            errorCounter ++;
        }
    }
    assertTrue( errorCounter === 0 );
};
