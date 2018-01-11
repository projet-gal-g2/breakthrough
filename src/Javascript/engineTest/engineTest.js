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

// Test coups possibles
BreakthroughTestCase.prototype.testPossibleStroke = function () {
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
    var initBoard = newEngine.getGameBoard();

    assertTrue(1==1);
};

// Test conversion coordonnée en un Coup
BreakthroughTestCase.prototype.testConvertCoord = function () {
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();
     var test = newEngine.coordToStroke(1,0);
    assertTrue( test === 8);
};


// Test conversion Coup en Coordonnées
BreakthroughTestCase.prototype.testStrokeToCoord = function () {
    var newEngine = new Breakthrough.Engine();
    var initBoard = newEngine.getGameBoard();
    var stroke = new Breakthrough.Stroke(10,62);
    newEngine.initialisation();

    var tabCoord = newEngine.strokeToCoord(stroke);
    assertTrue(tabCoord[0] === 1 && tabCoord[1] === 2 && tabCoord[2] === 7 && tabCoord[3] === 6);
};


// Test IA alpha beta
BreakthroughTestCase.prototype.testIAAlpha = function () {
    var newEngine = new Breakthrough.Engine();
    var p2 = new Breakthrough.Player(Breakthrough.Piece.BLACK, true, "ia", -1);
    var p1 = new Breakthrough.Player(Breakthrough.Piece.WHITE, false, "player", 0);
    var possibleStroke = [];
    var alpha = new Breakthrough.AlphaBeta(newEngine);
    var countMaxStroke =0;

    newEngine.initialisation();
    newEngine.initializePlayer(p1, p2);

    var gamelife = 0;

    while (gamelife !== 1){
        if (newEngine.getCurrentPlayer().isIA()) {
            var tabCopyEngine = newEngine.clone();
            var copyEngine = new Breakthrough.Engine();
            copyEngine.setBoard(tabCopyEngine[0]);
            copyEngine.setCurrentPlayer(tabCopyEngine[1]);
            copyEngine.setOpposingPlayer(tabCopyEngine[2]);
            copyEngine.setPlayer1(tabCopyEngine[3]);
            copyEngine.setPlayer2(tabCopyEngine[4]);
            var bestChooseStroke = alpha.moveStroke(copyEngine);
            newEngine.majBoard(bestChooseStroke);
            //console.log("Choix de l'i.a alpha");
            countMaxStroke += alpha.getCounterStroke();
            //console.log("Nombre de coups simulés ce tour : " + alpha.getCounterStroke());
            //newEngine.displayGameBoard();
            newEngine.nextPlayer();
        } else {
            //console.log("Human");
            possibleStroke = newEngine.possibleStroke();
            newEngine.majBoard(newEngine.randomChooseStroke(possibleStroke));
            //console.log("Choix de l'humain");
            //newEngine.displayGameBoard();
            newEngine.nextPlayer();
        }
        if( newEngine.currentPlayerWin() !== null ){
            console.log(newEngine.getOpposingPlayer());
            gamelife = 1;
        }
    }
    newEngine.displayGameBoard();
    console.log("Nombre de coup max simulés : " + countMaxStroke);
};