"use strict"

Breakthrough.AlphaBeta = function (engine, realGameBoard) {
    var engineGame = engine;
    var gameBoard = realGameBoard;
    var bestStrokeChoose;

    this.evalBoard = function(gameBoard){
        var sum = 0;
        if(engineGame.getCurrentPlayer() === engineGame.currentPlayerWin()){
            return 1000;
        }

        if(engineGame.getOpposingPlayer() === engineGame.currentPlayerWin()){
            return -1000;
        }

        for (var lineSquare = 0; lineSquare < Breakthrough.ONE_LINE; lineSquare++){
            for (var columnSquare = 0; columnSquare < Breakthrough.ONE_LINE; columnSquare++){
                if ( engineGame.getPiece2D(lineSquare, columnSquare) === engineGame.getCurrentPlayer().getColorPlayer()){
                    sum += 10;
                } else {
                    if (engineGame.getPiece2D(lineSquare, columnSquare) === engineGame.getOpposingPlayer().getColorPlayer()){
                        sum -= 10;
                    }
                }
            }
        }
        var coefsBoard = [];
        coefsBoard[0] = [5,15,15,5,5,15,15,5];
        coefsBoard[1] = [2,3,3,3,3,3,3,2];
        coefsBoard[2] = [4,6,6,6,6,6,6,4];
        coefsBoard[3] = [7,10,10,10,10,10,10,7];
        coefsBoard[4] = [11,15,15,15,15,15,15,11];
        coefsBoard[5] = [16,21,21,21,21,21,21,16];
        coefsBoard[6] = [20,28,28,28,28,28,28,20];
        coefsBoard[7] = [36,36,36,36,36,36,36,36];

        var coefPion = Breakthrough.Piece.BLACK === engineGame.getCurrentPlayer().getColorPlayer() ? 1 : -1;

        for (var line = 0; line < Breakthrough.ONE_LINE; line++){
            for ( var column = 0; column < Breakthrough.ONE_LINE; column++ ){
                if (engine.getPiece2D(line, column)=== Breakthrough.Piece.BLACK ){
                    sum += coefsBoard[line][column] * coefPion;
                } else {
                    if (engine.getPiece2D(line, column)=== Breakthrough.Piece.WHITE){
                        sum -= coefsBoard[7-line][column] * coefPion;
                    }
                }
            }
        }
        return sum;
    };

    this.getMoveAlphaBeta = function (depthMax, alpha, beta ){
        if (engineGame.currentPlayerWin() !== null || depthMax <= 0){
            return this.evalBoard(gameBoard);
        }

        var valueSimulate;
        var bestStroke;
        var possibleStroke = engineGame.possibleStroke();

        for (var index = 0; index < possibleStroke.length; index++){
            var tabCopyEngine = engineGame.clone();
            var copyEngine = new Breakthrough.Engine();
            copyEngine.setBoard(tabCopyEngine[0]);
            copyEngine.setCurrentPlayer(tabCopyEngine[1]);
            copyEngine.setOpposingPlayer(tabCopyEngine[2]);
            copyEngine.setPlayer1(tabCopyEngine[3]);
            copyEngine.setPlayer2(tabCopyEngine[4]);
            copyEngine.majBoard(possibleStroke[index]);
           // copyEngine.nextPlayer();
            valueSimulate = -this.getMoveAlphaBeta(depthMax-1, -beta, -alpha);
            if (valueSimulate > alpha ){
                alpha = valueSimulate;
                bestStroke = possibleStroke[index];
            }
            if (alpha >= beta){
                break;
            }
        }
         bestStrokeChoose = bestStroke;
        return alpha;
    };
    this.moveStroke = function () {
        this.getMoveAlphaBeta(3,-10000, 10000 );
        return bestStrokeChoose;
    };
};