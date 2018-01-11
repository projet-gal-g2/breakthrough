"use strict"

Breakthrough.AlphaBeta = function () {
    var bestStrokeChoose;
    var counterStrokeSimulate = 0;

    this.getCounterStroke = function () {
        return counterStrokeSimulate;
    };

    this.evalBoard = function(engineCopy){
        var sum = 0;
        if(engineCopy.getCurrentPlayer() === engineCopy.currentPlayerWin()){
            return 10000;
        }

        if(engineCopy.getOpposingPlayer() === engineCopy.currentPlayerWin()){
            return -10000;
        }

        for (var lineSquare = 0; lineSquare < Breakthrough.ONE_LINE; lineSquare++){
            for (var columnSquare = 0; columnSquare < Breakthrough.ONE_LINE; columnSquare++){
                if ( engineCopy.getPiece2D(lineSquare, columnSquare) === engineCopy.getCurrentPlayer().getColorPlayer()){
                    sum += 10;
                } else {
                    if (engineCopy.getPiece2D(lineSquare, columnSquare) === engineCopy.getOpposingPlayer().getColorPlayer()){
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

        var coefPion = Breakthrough.Piece.BLACK === engineCopy.getCurrentPlayer().getColorPlayer() ? 1 : -1;

        for (var line = 0; line < Breakthrough.ONE_LINE; line++){
            for ( var column = 0; column < Breakthrough.ONE_LINE; column++ ){
                if (engineCopy.getPiece2D(line, column)=== Breakthrough.Piece.BLACK ){
                    sum += coefsBoard[line][column] * coefPion;
                } else {
                    if (engineCopy.getPiece2D(line, column)=== Breakthrough.Piece.WHITE){
                        sum -= coefsBoard[7-line][column] * coefPion;
                    }
                }
            }
        }
        return sum;
    };

    this.getMoveAlphaBeta = function (copyEngine,depthMax, alpha, beta ){
        if (copyEngine.currentPlayerWin() !== null || depthMax <= 0){
            return this.evalBoard(copyEngine);
        }

        var valueSimulate;
        var bestStroke;
        var possibleStroke = copyEngine.possibleStroke();

        for (var index = 0; index < possibleStroke.length; index++){
            var tabCopyEngine = copyEngine.clone();
            var newCopyEngine = new Breakthrough.Engine();
            newCopyEngine.setBoard(tabCopyEngine[0]);
            newCopyEngine.setCurrentPlayer(tabCopyEngine[1]);
            newCopyEngine.setOpposingPlayer(tabCopyEngine[2]);
            newCopyEngine.setPlayer1(tabCopyEngine[3]);
            newCopyEngine.setPlayer2(tabCopyEngine[4]);
            newCopyEngine.majBoard(possibleStroke[index]);
            counterStrokeSimulate++;
           // newCopyEngine.displayGameBoard();
            newCopyEngine.nextPlayer();
            valueSimulate = -this.getMoveAlphaBeta(newCopyEngine,depthMax-1, -beta, -alpha);
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
    this.moveStroke = function (copyEngine) {
        this.getMoveAlphaBeta(copyEngine, 4,-10000, 10000 );
        return bestStrokeChoose;
    };
};