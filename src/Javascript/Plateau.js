/**
 * Created by bcleton on 08/01/18.
 */


Breakthrough.Plateau = function() {
        var square_dim = 50;
        var pion_dim = 40;
        var engine;
        var selectedPawn = null;
        var choosenStroke = null;
        var currentPossibleStrokes;
        var hasHumanChooseStroke = false;

        this.initialize = function() {
            engine = new Breakthrough.Engine();
            engine.initialisation();

            var tab = "<table style='margin: auto;' border=0 cellspacing=0 cellpadding=0 width="+(square_dim*8+8) + ">";
            var color = 0;
            for(var i = 0; i < 8; i++)
            {
                tab += "<tr>";

                for(var j = 0; j < 8; j++)
                {
                    tab += "<td id='l" + i + "c" + j + "' class='not_selected'";
                    switch(color)
                    {
                        case 0:
                            tab += "color='orange' style='background-color: orange; ";
                            break;

                        case 1:
                            tab += "color='maroon' style='background-color: maroon; ";
                            break;
                    }

                    tab += "width: " + square_dim + "; height: " + square_dim + ";'>";
                    var src = getSourceFromPawn(engine.getPiece2D(i, j));

                    tab += "<a href='#' class='case' i='"+i+"' j='"+j+"' style='height: " + square_dim + "px; width: " + square_dim + "px; display: block;'>";

                    if (src !== "none")
                    {
                        tab += "<img src='../interface/img/" + src + "' height='" + square_dim + "px' width='" + square_dim + "px;'>";
                    }

                    tab += "</a> </td>";

                    color = (color + 1) % 2;
                }

                tab += "</tr>";
                color = (color + 1) % 2;
            }

            tab += "</table>";

            $("#pContainer").html(tab);

        };

    $(document).on('click','.case',function(){
        var lign = parseInt($(this).attr('i'));
        var column = parseInt($(this).attr('j'));
        var id_case= "#l" + lign + "c" + column;


        if($(id_case).hasClass('not_selected')){
            unSelecteAll();
            var pawn = engine.getPiece2D(lign, column);
            if (pawn === engine.getCurrentPlayer())
            {
                selectedPawn = new SelectedPawn(lign, column);
                selectCase(lign, column, "red");

                var startStroke = engine.coordToStroke(lign, column);
                var possibleStrokes = engine.possibleStroke();
                var human = new Breakthrough.Human();
                currentPossibleStrokes = human.chooseStroke(possibleStrokes, startStroke);

                for(var i = 0; i < currentPossibleStrokes.length; i++)
                {
                    var coords = engine.strokeToCoord(currentPossibleStrokes[i]);
                    selectCase(coords[2], coords[3], "green");
                }
            }
            else if (selectedPawn !== null)
            {
                for(var i = 0; i < currentPossibleStrokes.length; i++)
                {
                    var coords = engine.strokeToCoord(currentPossibleStrokes[i]);
                    if (coords[2] === lign, coords[3] === column)
                    {
                        hasHumanChooseStroke = true;
                        choosenStroke = engine.coordToStroke(lign, column);
                        break;
                    }
                }
                //movePawn(selectedPawn, new SelectedPawn(parseInt(lign), parseInt(column)));
            }
        }
        else if($(id_case).hasClass('is_selected')){
            selectedPawn = null;
            unSelecteAll();
            //changeClassAndColor(id_case, "is_selected", "not_selected", $(id_case).attr('color'));
        }

    });

    this.getCurrentPlayer = function()
    {
        return engine.getCurrentPlayer();
    };

    var getHumanChoosenStroke = function(player)
    {
        var timeOut = false;
        while(!hasHumanChooseStroke)
        {
           sleep(50);
        }

        if (timeOut)
            return null;

        return choosenStroke;
    };

    this.startGame = function (vsIa)
    {
        var possiblesStroke;
        var strokeChoose;
        var player1 = new Breakthrough.Human();
        var player2;

        if (vsIa)
        {
            player2 = new Breakthrough.Random();
        }
        else
        {
            player2 = new Breakthrough.Human();
        }

        var gameLife = 0;
        while ( gameLife !== 1){

            possiblesStroke = engine.possibleStroke();
            strokeChoose = randomIa.randomChooseStroke(possiblesStroke);
            engine.majBoard(strokeChoose);

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

    var movePawn = function(from, to)
    {
        var idFrom = "#l" + from.lign + "c" + from.column;
        var idTo = "#l" + to.lign + "c" + to.column;
        var pawnFrom = engine.getPiece2D(from.lign, from.column);
        var pawnTo = engine.getPiece2D(to.lign, to.column);

        var src = getSourceFromPawn(engine.getPiece2D(from.lign, from.column));

        if(src !== "none")
        {
            $(idFrom).find('img:first').remove();
            $(idTo).find('a:first').html("<img src='../interface/img/" + src + "' height='" + square_dim + "px' width='" + square_dim + "px;'>");

            engine.setPiece2D(from.lign, from.column, Breakthrough.Piece.EMPTY);
            engine.setPiece2D(to.lign, to.column, pawnFrom);

            unSelecteAll();

            return true;
        }

        return false;
    };

    function SelectedPawn(lign,column) {
        this.lign = lign;
        this.column = column;
    }

    var getSourceFromPawn = function(p)
    {
        switch (p)
        {
            case Breakthrough.Piece.WHITE:
                return "pion_blanc.png";

            case Breakthrough.Piece.BLACK:
                return "pion_noir.png";

            default:
                return "none";
        }
    };

    var unSelecteAll = function()
    {
        $('.is_selected').each(function(){
            var className = $(this).attr('class');

            className=className.replace(/is_selected/g,'');
            className+="not_selected";
            $(this).attr("class",className);
            $(this).css({'background-color' : $(this).attr('color')});
        });
    };

    var selectCase = function (ligne, column, color) {
        var id_case = "#l" + ligne + "c" + column;
        changeClassAndColor(id_case, "not_selected", "is_selected", color);
    };

    var changeClassAndColor = function(id_case, class1, class2, color)
    {
        var my_class= $(id_case).attr('class');
        var reg = new RegExp(class1,"g");
        my_class = my_class.replace(reg,'');
        my_class += class2;

        $(id_case).attr("class", my_class);
        $(id_case).css({'background-color' : color });
    };

    var sleep = function(milliseconds)
    {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    };
};