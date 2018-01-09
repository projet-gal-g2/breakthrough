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
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;
    var lastTwoLines = Breakthrough.SIZEBOARD - (Breakthrough.ONE_LINE*2);

    for ( var iter = 0; iter < Breakthrough.SIZEBOARD/2; iter++) {
        midBoard[iter] = Breakthrough.Piece.EMPTY;
    }

    for ( var firstSquares = Breakthrough.ONE_LINE*2; firstSquares <lastTwoLines; firstSquares++ ) {

        if ( midBoard[firstSquares-16] !== initBoard[firstSquares] ) {

            errorCounter ++;
        }
    }

    assertTrue( errorCounter === 0 );
};

// Test des deux dernières lignes du tableau
BreakthroughTestCase.prototype.testTwoLastLines = function () {
    var lastLines = [];
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();
    var errorCounter = 0;
    var lastTwoLines = Breakthrough.SIZEBOARD - (Breakthrough.ONE_LINE*2);

    for ( var iter = 0; iter < Breakthrough.ONE_LINE*2; iter++) {
        lastLines[iter] = Breakthrough.Piece.WHITE;
    }
    for ( var lastSquares = lastTwoLines; lastSquares < Breakthrough.SIZEBOARD; lastSquares++ ) {
        if ( lastLines[lastSquares-48] !== initBoard[lastSquares] ) {
            errorCounter ++;
        }
    }
    assertTrue( errorCounter === 0 );
};

// Test du getPiece
BreakthroughTestCase.prototype.testgetPiece = function () {
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();

    assertTrue(newEngine.getPiece(30) === Breakthrough.Piece.EMPTY);
};

// Test du setPiece
BreakthroughTestCase.prototype.testSetPiece = function () {
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();

    var temp_Piece = newEngine.getPiece(0);
    newEngine.setPiece(0, Breakthrough.Piece.EMPTY);
    assertTrue(temp_Piece !== initBoard[0]);
};

// Test du getPiece2D
BreakthroughTestCase.prototype.testgetPiece2D = function () {
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();

    var piece = newEngine.getPiece(48);
    var piece2D = newEngine.getPiece2D(6,0);
    assertTrue(piece === piece2D);
};

// Test du setPiece2D
BreakthroughTestCase.prototype.testSetPiece2D = function () {
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();

    var tempPiece = newEngine.getPiece(5);
    newEngine.setPiece2D(0,5,Breakthrough.Piece.EMPTY);

    assertTrue(tempPiece !== initBoard[5]);
};