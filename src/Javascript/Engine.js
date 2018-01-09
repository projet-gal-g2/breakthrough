"use strict"
// Définition des Pions
Breakthrough.Piece = {BLACK: 1, WHITE: 2, EMPTY: 0};
Breakthrough.ONE_LINE = 8;
Breakthrough.SIZEBOARD = Breakthrough.ONE_LINE * Breakthrough.ONE_LINE;

// Définition de la classe
Breakthrough.Engine = function () {

		
	var game_Board = new Array(Breakthrough.SIZEBOARD);
	// Définition du joueur courant / joueur adverse
    var currentPlayer;
    var opposingPlayer;

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
		currentPlayer = Breakthrough.Piece.WHITE;
		opposingPlayer = Breakthrough.Piece.BLACK;
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

	this.getCurrentPlayer = function () {
	    return currentPlayer;
    };

	this.getOpposingPlayer = function () {
        return opposingPlayer;
    };

	this.nextPlayer = function () {
	    var temp = currentPlayer;
	    currentPlayer = opposingPlayer;
	    opposingPlayer = temp;
    };

	this.possibleStroke = function () {

        var stroke = new Breakthrough.Stroke(-1, -1);

	    var listStroke = [];

        // Parcours du plateau de jeu
        for ( var square = 0; square < game_Board.length; square++ ) {
                /// Gestion des coups possibles pour le joueur des pions Noirs ///

                if (this.getCurrentPlayer() === Breakthrough.Piece.BLACK) {

                    if (game_Board[square] === Breakthrough.Piece.BLACK){
                        stroke.startCoord = square;
                        stroke.endCoord = -1;
                        // Gestion avancement pions bords gauche
                        if ( stroke.startCoord % Breakthrough.ONE_LINE === 0){
                            stroke.endCoord = square + Breakthrough.ONE_LINE;
                            if ( game_Board[square + Breakthrough.ONE_LINE] === Breakthrough.Piece.EMPTY){
                                listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                            }
                            stroke.endCoord = square + Breakthrough.ONE_LINE +1;
                            if ( game_Board[square + Breakthrough.ONE_LINE +1] !== Breakthrough.Piece.BLACK){
                                listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                            }
                        } else {// Gestion avancement pions bords Droite
                            if ( stroke.startCoord % Breakthrough.ONE_LINE === Breakthrough.ONE_LINE - 1){
                                stroke.endCoord = square + Breakthrough.ONE_LINE;
                                if ( game_Board[square + Breakthrough.ONE_LINE] === Breakthrough.Piece.EMPTY){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                                stroke.endCoord = square + Breakthrough.ONE_LINE -1;
                                if ( game_Board[square + Breakthrough.ONE_LINE - 1] !== Breakthrough.Piece.BLACK){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                            } else { // Avancement normal
                                // Diagonale gauche
                                stroke.endCoord = square + Breakthrough.ONE_LINE -1;
                                if ( game_Board[square + Breakthrough.ONE_LINE -1] !== Breakthrough.Piece.BLACK){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                                // Devant
                                stroke.endCoord = square + Breakthrough.ONE_LINE;
                                if ( game_Board[square + Breakthrough.ONE_LINE] === Breakthrough.Piece.EMPTY){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                                // Diagonale  droite
                                stroke.endCoord = square + Breakthrough.ONE_LINE +1;
                                if (game_Board[square + Breakthrough.ONE_LINE + 1] !== Breakthrough.Piece.BLACK){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                            }
                        }
                    }
                } else {
                    if (game_Board[square] === Breakthrough.Piece.WHITE) {
                        stroke.startCoord = square;
                        stroke.endCoord = -1;
                        // Gestion avancement pions bords gauche
                        if ( stroke.startCoord % Breakthrough.ONE_LINE === 0){
                            stroke.endCoord = square - Breakthrough.ONE_LINE;
                            if ( game_Board[square - Breakthrough.ONE_LINE] === Breakthrough.Piece.EMPTY){
                                listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                            }
                            stroke.endCoord = square - Breakthrough.ONE_LINE +1;
                            if ( game_Board[square - Breakthrough.ONE_LINE +1] !== Breakthrough.Piece.WHITE){
                                listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                            }
                        } else {// Gestion avancement pions bords Droite
                            if ( stroke.startCoord % Breakthrough.ONE_LINE === Breakthrough.ONE_LINE - 1){
                                stroke.endCoord = square - Breakthrough.ONE_LINE;
                                if ( game_Board[square - Breakthrough.ONE_LINE] === Breakthrough.Piece.EMPTY){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                                stroke.endCoord = square - Breakthrough.ONE_LINE -1;
                                if ( game_Board[square - Breakthrough.ONE_LINE - 1] !== Breakthrough.Piece.WHITE){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                            } else { // Avancement normal
                                // Diagonale gauche
                                stroke.endCoord = square - Breakthrough.ONE_LINE -1;
                                if ( game_Board[square - Breakthrough.ONE_LINE -1] !== Breakthrough.Piece.WHITE){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                                // Devant
                                stroke.endCoord = square - Breakthrough.ONE_LINE;
                                if ( game_Board[square - Breakthrough.ONE_LINE] === Breakthrough.Piece.EMPTY){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                                // Diagonale  droite
                                stroke.endCoord = square - Breakthrough.ONE_LINE +1;
                                if (game_Board[square - Breakthrough.ONE_LINE + 1] !== Breakthrough.Piece.WHITE){
                                    listStroke.push(new Breakthrough.Stroke(stroke.startCoord, stroke.endCoord));
                                }
                            }
                        }
                    }
                }
        }
        return listStroke;
    };

	this.coordToStroke = function (coordX, coordY) {
	    var strokeCoord =  coordX * Breakthrough.ONE_LINE + coordY;
	    return strokeCoord;
    };
};
