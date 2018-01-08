
var Breakthrough = require('../Breakthrough.js');
// Définition des Pions
Breakthrough.Piece = {BLACK: 1, WHITE: 2, EMPTY: 0};

// Définition de la classe
Breakthrough.Engine = function () {
	const ONE_LINE = 8;
	const SIZEBOARD = ONE_LINE * ONE_LINE;
		
	var game_Board = new Array(SIZEBOARD);
	
	this.initialisation = function () {
		var lastTwoLines = SIZEBOARD - (ONE_LINE*2);
		// Parcours des deux premières lignes 
		for ( var firstSquares = 0; firstSquares < ONE_LINE*2; firstSquares++ ) {
			setPiece(firstSquares, Breakthrough.Piece.BLACK);
		}
		// Parcours du milieu de plateau
		for ( var midSquares = ONE_LINE*2; midSquares < lastTwoLines; midSquares++ ) {
			setPiece(midSquares, Breakthrough.Piece.EMPTY);
		}
		// Parcours des deux dernières lignes
		for ( var lastSquares = lastTwoLines; lastSquares < SIZEBOARD; lastSquares++ ) {
			setPiece(lastSquares, Breakthrough.Piece.WHITE);
		}
	};

	this.getGameBoard = function () {
	  return game_Board;
    };
	
	this.setPiece = function (numSquare,typeOfPiece) {
		game_Board[numSquare] = typeOfPiece;
	};
	
	this.getPiece = function (numSquare) {
		return game_Board[numSquare];
	};
};
