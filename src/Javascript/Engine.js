"use strict"
// Définition des Pions
Breakthrough.Piece = {BLACK: 1, WHITE: 2, EMPTY: 0};
Breakthrough.ONE_LINE = 8;
Breakthrough.SIZEBOARD = Breakthrough.ONE_LINE * Breakthrough.ONE_LINE;

// Définition de la classe
Breakthrough.Engine = function () {

		
	var game_Board = new Array(Breakthrough.SIZEBOARD);
	
	this.initialisation = function () {
		var lastTwoLines = Breakthrough.SIZEBOARD - (Breakthrough.ONE_LINE*2);
		// Parcours des deux premières lignes 
		for ( var firstSquares = 0; firstSquares < Breakthrough.ONE_LINE*2; firstSquares++ ) {
			this.setPiece(firstSquares, Breakthrough.Piece.BLACK);
		}
		// Parcours du milieu de plateau
		for ( var midSquares = Breakthrough.ONE_LINE*2; midSquares < lastTwoLines; midSquares++ ) {
			this.setPiece(midSquares, Breakthrough.Piece.EMPTY);
		}
		// Parcours des deux dernières lignes
		for ( var lastSquares = lastTwoLines; lastSquares < Breakthrough.SIZEBOARD; lastSquares++ ) {
			this.setPiece(lastSquares, Breakthrough.Piece.WHITE);
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

	this.setPiece2D = function (lineSquare, columnSquare, typeOfPiece) {
		game_Board[lineSquare * Breakthrough.ONE_LINE+ columnSquare] = typeOfPiece;
	};
	this.getPiece2D = function (lineSquare, columnSquare){
		return game_Board[lineSquare * Breakthrough.ONE_LINE+ columnSquare];
	};
};
