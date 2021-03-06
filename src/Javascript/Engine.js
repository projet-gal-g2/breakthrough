"use strict"
// Définition des Pions
Breakthrough.Piece = {BLACK: 2, WHITE: 1, EMPTY: 0};
Breakthrough.ONE_LINE = 8;
Breakthrough.SIZEBOARD = Breakthrough.ONE_LINE * Breakthrough.ONE_LINE;

// Définition de la classe
Breakthrough.Engine = function () {
    
	var game_Board = new Array(Breakthrough.SIZEBOARD);
	// Définition du joueur courant / joueur adverse
    var currentPlayer;
    var opposingPlayer;
    var player1;
    var player2;

    this.clone = function () {
        var copyGameBoard = [];
        for ( var index = 0; index < game_Board.length; index++){
            copyGameBoard[index] = game_Board[index];
        }
        var copyCurrentPlayer = new Breakthrough.Player(currentPlayer.getColorPlayer(), currentPlayer.isIA(), currentPlayer.getPseudo(), currentPlayer.getId());
        var copyOpposingPlayer = new Breakthrough.Player(opposingPlayer.getColorPlayer(), opposingPlayer.isIA(), opposingPlayer.getPseudo(), opposingPlayer.getId());
        var copyPlayer1 = new Breakthrough.Player(player1.getColorPlayer(), player1.isIA(), player1.getPseudo(), player1.getId());
        var copyPlayer2 = new Breakthrough.Player(player2.getColorPlayer(), player2.isIA(), player2.getPseudo(), player2.getId());
        return [copyGameBoard,copyCurrentPlayer, copyOpposingPlayer, copyPlayer1, copyPlayer2];
    };

    this.setBoard = function (gameBoard){
        for (var index = 0; index < gameBoard.length; index++){
            game_Board[index] = gameBoard[index];
        }
    };

    this.setCurrentPlayer = function (player){
        currentPlayer = player;
    };

    this.setOpposingPlayer = function (player){
        opposingPlayer = player;
    };

    this.setPlayer1 = function (player){
        player1 = player;
    };

    this.setPlayer2 = function (player){
        player2 = player;
    };

    this.getPlayer1 = function () {
        return player1;
    };

    this.getPlayer2 = function (){
        return player2;
    };
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

	this.initializePlayer = function(p1, p2)
    {
        player1 = p1;
        player2 = p2;

        currentPlayer = player2;
        opposingPlayer = player1;

    };

	this.displayGameBoard = function () {
        var stringGameBoard ='\n';
	    for ( var index = 0; index < Breakthrough.SIZEBOARD; index++){
	        if ( this.getPiece(index) === Breakthrough.Piece.BLACK ){
                stringGameBoard += 'B ';
            }
            if ( this.getPiece(index) === Breakthrough.Piece.EMPTY ){
                stringGameBoard += '. ';
            }
            if ( this.getPiece(index) === Breakthrough.Piece.WHITE ){
                stringGameBoard += 'W ';
            }
            if ( index % Breakthrough.ONE_LINE === Breakthrough.ONE_LINE - 1 ){
	            stringGameBoard += '\n '
            }
        }
        console.log(stringGameBoard);
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

	    if (temp.getColorPlayer() === player1.getColorPlayer())
        {
            currentPlayer = player2;
            opposingPlayer = player1;
        }
        else
        {
            currentPlayer = player1;
            opposingPlayer = player2;
        }
    };

	this.possibleStroke = function () {

        var stroke = new Breakthrough.Stroke(-1, -1);

	    var listStroke = [];

        // Parcours du plateau de jeu
        for ( var square = 0; square < game_Board.length; square++ ) {
                /// Gestion des coups possibles pour le joueur des pions Noirs ///

                if (this.getCurrentPlayer().getColorPlayer() === Breakthrough.Piece.BLACK) {

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

	this.coordToStroke = function (line, column) {
	    return line * Breakthrough.ONE_LINE + column;
    };

	this.strokeToCoord = function (strokes) {
        var lineStart = strokes.getStartStroke() / Breakthrough.ONE_LINE | 0;
        var columnStart = strokes.getStartStroke() % Breakthrough.ONE_LINE;
        var lineEnd = strokes.getEndStroke() / Breakthrough.ONE_LINE | 0;
        var columnEnd = strokes.getEndStroke() % Breakthrough.ONE_LINE;

        if (lineStart < 0){
            lineStart = 0;
        }
        if (lineEnd < 0){
            lineEnd = 0;
        }

        return [lineStart, columnStart, lineEnd, columnEnd];
    };

    this.majBoard = function(stroke){
        if (currentPlayer.getColorPlayer() === Breakthrough.Piece.BLACK) {
            game_Board[stroke.getStartStroke()] = Breakthrough.Piece.EMPTY;
            game_Board[stroke.getEndStroke()] = Breakthrough.Piece.BLACK;
        } else {
            game_Board[stroke.getStartStroke()] = Breakthrough.Piece.EMPTY;
            game_Board[stroke.getEndStroke()] = Breakthrough.Piece.WHITE;
        }
    };

    this.countOfOpposingPiece = function(){
        var nbPiece = 0;
        for ( var indexPiece = 0; indexPiece < Breakthrough.SIZEBOARD; indexPiece++){
            if ( this.getPiece(indexPiece) === this.getOpposingPlayer().getColorPlayer()){
                nbPiece++;
            }
        }
        return nbPiece;
    };

    this.currentPlayerWin = function(){
        for ( var indexBoard = Breakthrough.SIZEBOARD - Breakthrough.ONE_LINE; indexBoard < Breakthrough.SIZEBOARD; indexBoard++){
            // Si le joueur des pièces noirs à une de ces pièces sur la dernière ligne du tableau ou si l'adversaire
            // n'a plus de pièces

            if (this.getPiece(indexBoard) === Breakthrough.Piece.BLACK  || this.countOfOpposingPiece() === 0){
                return player2;
            }
        }

        for ( var index = 0; index < Breakthrough.ONE_LINE; index ++){
            if (this.getPiece(index) === Breakthrough.Piece.WHITE || this.countOfOpposingPiece() === 0){
                return player1;
            }
        }
        return null;
    };

    this.getPossibleStroke = function (possibleStroke, startStroke) {
        var possibleEndStroke = [];
        for ( var indexStroke = 0;  indexStroke < possibleStroke.length ; indexStroke++){
            if (startStroke === possibleStroke[indexStroke].getStartStroke()){
                possibleEndStroke.push(new Breakthrough.Stroke(startStroke, possibleStroke[indexStroke].getEndStroke()));
            }
        }
        return possibleEndStroke;
    };

    this.randomChooseStroke = function (possibleStroke) {
        var possibleEndStroke = [];
        var startStroke = possibleStroke[Math.floor(Math.random() * possibleStroke.length)].getStartStroke();
        var endStroke;
        for ( var indexStroke = 0;  indexStroke < possibleStroke.length ; indexStroke++){
            if (startStroke === possibleStroke[indexStroke].getStartStroke()){
                possibleEndStroke.push(new Breakthrough.Stroke(startStroke, possibleStroke[indexStroke].getEndStroke()));
            }
        }

        endStroke = possibleEndStroke[Math.floor(Math.random() * possibleEndStroke.length)].getEndStroke();
        return new Breakthrough.Stroke(startStroke, endStroke);
    };
};