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

// Test du basculement de joueur
BreakthroughTestCase.prototype.testSwapCurrentPlayer = function (){
    var newEngine = new Breakthrough.Engine();
    newEngine.initialisation();

    var firstPlayer = newEngine.getCurrentPlayer();
    newEngine.nextPlayer();

    assertTrue(newEngine.getCurrentPlayer() !== firstPlayer);
};
// Test du choix Humain d'un coup possible
BreakthroughTestCase.prototype.testChooseStroke = function () {
    var newEngine = new Breakthrough.Engine();
    var player = new Breakthrough.Human();
    newEngine.initialisation();
    newEngine.nextPlayer();
    var possibleStroke = newEngine.possibleStroke();
    //console.log('Coups possibles : \n' + possibleStroke );
    var startStroke = 8;
    //console.log("Taille liste coups possibles : " + possibleStroke.length);
    var possibleChooseStroke = player.chooseStroke(possibleStroke, startStroke);

    var counter = 0;
    //console.log('Taille liste coups possibles en fonction du coup de départ : ' + possibleChooseStroke.length);
    for ( var indexPossible = 0; indexPossible < possibleChooseStroke.length; indexPossible ++) {
        if ( possibleChooseStroke[indexPossible].getStartStroke() !== startStroke ){
            counter ++;
        }
    }

   // console.log('Coups possibles après choix coup départ : \n ' + possibleChooseStroke);
    assertTrue (counter === 0 && possibleChooseStroke.length !== 0 );
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

// Test du choix d'un coup par l'I.A Random
BreakthroughTestCase.prototype.testRandomPlay = function () {
    var newEngine = new Breakthrough.Engine();
    var randomIa = new Breakthrough.Random();
    newEngine.initialisation();
    var counter = 0;
    var possibleStroke = newEngine.possibleStroke();
    var strokeChoose = randomIa.randomChooseStroke(possibleStroke);

    for ( var indexStroke = 0; indexStroke < possibleStroke.length; indexStroke++){
        if (possibleStroke[indexStroke].getStartStroke() === strokeChoose.getStartStroke() &&
        possibleStroke[indexStroke].getEndStroke() === strokeChoose.getEndStroke()){
            counter++;
            break;
        }
    }
    assertTrue (counter === 1);
};

// Test de la mise à jour du plateau de jeu après un coup
BreakthroughTestCase.prototype.testMajBoard = function () {
    var newEngine = new Breakthrough.Engine();
    var randomIa = new Breakthrough.Random();
    newEngine.initialisation();
    newEngine.displayGameBoard();
    var initialGameBoard = newEngine.getGameBoard();
    var possiblesStroke;
    var strokeChoose;

    var gameLife = 0;
    console.log("Turn of player " + newEngine.getCurrentPlayer());
    while ( gameLife !== 1){
        possiblesStroke = newEngine.possibleStroke();
        strokeChoose = randomIa.randomChooseStroke(possiblesStroke);
        newEngine.majBoard(strokeChoose);
        console.log(strokeChoose);
        newEngine.displayGameBoard();
        if (newEngine.currentPlayerWin() !== Breakthrough.Piece.EMPTY){
            gameLife = 1;
            newEngine.displayGameBoard();
            console.log("Joueur " + newEngine.getCurrentPlayer() + " win !");
        } else {
            newEngine.nextPlayer();
            console.log("Turn of player " + newEngine.getCurrentPlayer());
        }
    }
};