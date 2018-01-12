/**
 * Created by bcleton on 08/01/18.
 */


Breakthrough.Plateau = function() {
        var square_dim = 50;
        var engine;
        var selectedPawn = null;
        var currentPossibleStrokes;
        var hasHumanChooseStroke = false;
        var isEndGame = false;
        var player1;
        var player2;
        var time = 0;
        var intervalId = null;

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
        if (!isEndGame && engine.getCurrentPlayer().getPseudo() === $("#mainContainer").attr("playerPseudo"))
        {
            var lign = parseInt($(this).attr('i'));
            var column = parseInt($(this).attr('j'));
            var id_case= "#l" + lign + "c" + column;

            if($(id_case).hasClass('not_selected')){
                unSelecteAll();
                var pawn = engine.getPiece2D(lign, column);
                if (pawn === engine.getCurrentPlayer().getColorPlayer())
                {
                    selectedPawn = new SelectedPawn(lign, column);
                    selectCase(lign, column, "red");

                    var startStroke = engine.coordToStroke(lign, column);
                    var possibleStrokes = engine.possibleStroke();

                    currentPossibleStrokes = engine.getPossibleStroke(possibleStrokes, startStroke);

                    for(var i = 0; i < currentPossibleStrokes.length; i++)
                    {
                        var coords = engine.strokeToCoord(currentPossibleStrokes[i]);
                        selectCase(coords[2], coords[3], "green");
                    }
                }
            }
            else if($(id_case).hasClass('is_selected')){
                if (selectedPawn !== null && !(selectedPawn.column === column && selectedPawn.lign === lign))
                {
                    if (currentPossibleStrokes !== null && currentPossibleStrokes.length > 0)
                    {
                        for(var i = 0; i < currentPossibleStrokes.length; i++)
                        {
                            var coords = engine.strokeToCoord(currentPossibleStrokes[i]);
                            if (coords[2] === lign, coords[3] === column)
                            {
                                hasHumanChooseStroke = true;
                                var from = selectedPawn;
                                var to = new SelectedPawn(lign, column);

                                movePawn(from, to);

                                engine.majBoard(currentPossibleStrokes[i]);

                                $.ajax(
                                {
                                    type: "POST",
                                    url: "update_game.php",
                                    data:
                                        {
                                            "idGame": parseInt($("#mainContainer").attr("gameId")),
                                            "departL": from.lign,
                                            "departC": from.column,
                                            "arriveL": to.lign,
                                            "arriveC": to.column
                                        },
                                    success: function(data) {
                                        play();
                                    }
                                });

                                
                                break;
                            }
                        }
                    }
                }

                selectedPawn = null;
                unSelecteAll();
            }
        }
    });

    this.getCurrentPlayer = function()
    {
        return engine.getCurrentPlayer();
    };

    this.startGame = function (p1, p2)
    {
        player1 = p1;
        player2 = p2;
        this.initialize();
        engine.initializePlayer(p1, p2);

        play();
    };

    this.abandon = function()
    {
        doAbandon();
    };

    var doAbandon = function()
    {
        window.clearInterval(intervalId);

        var idWinner = engine.getOpposingPlayer().getId();
        var idLooser = engine.getCurrentPlayer().getId();
        var idGame = parseInt($(".gameContainer").attr("id"));

        $.ajax(
            {
                type: "POST",
                url: "end_game_maj.php",
                data:
                    {
                        "idGame":idGame,
                        "idLooser":idLooser,
                        "idWinner":idWinner,
                        "addScoreWinner": 10,
                        "addScoreLooser": -1
                    },
                success: function(data) {
                    alert("Le joueur " + engine.getOpposingPlayer().getPseudo() + " a gagné !");
                    document.location.href = "principale.php";
                }
            });
    };

    var increaseTimer = function()
    {
        time++;
        $("#timer").html("Timer : " + time + "s");

        if (time >= 30)
        {
            window.clearInterval(intervalId);
            doAbandon();
        }
    };

    var play = function()
    {
        if (intervalId !== null)
        {
            window.clearInterval(intervalId);
        }

        time = 0;
        $("#timer").html("Timer : " + time + "s");
        intervalId = window.setInterval(increaseTimer, 1000);

        if (engine.currentPlayerWin() === null){
            engine.nextPlayer();
        }
        else
        {
            gameWin();
        }

        var possiblesStroke;
        var strokeChoose;
        var currentPlayer = engine.getCurrentPlayer();
        alert($("#mainContainer").attr("playerPseudo") + " "+ currentPlayer.getPseudo());
        if (currentPlayer.isIA())
        {
            possiblesStroke = engine.possibleStroke();
            strokeChoose = engine.randomChooseStroke(possiblesStroke);
            var coords = engine.strokeToCoord(strokeChoose);
            var from = new SelectedPawn(coords[0], coords[1]);
            var to = new SelectedPawn(coords[2], coords[3]);

            movePawn(from, to);

            engine.majBoard(strokeChoose);

            play();
        }
        else if (currentPlayer.getPseudo() !== $("#mainContainer").attr("playerPseudo"))
        {
            $.ajax(
            {
                type: "GET",
                url: "wait_turn.php",
                datatype: "text",
                data:
                    {
                        "idGame": parseInt($("#mainContainer").attr("gameId"))
                    },
                success: function(data) {
                    alert(data);
                    if (data === "Le joueur adversaire a abandonné !")
                    {
                        alert(data);
                    }
                    else
                    {
                        var coords = data.split(',');

                        var from = new SelectedPawn(parseInt(coords[0]), parseInt(coords[1]));
                        var to = new SelectedPawn(parseInt(coords[2]), parseInt(coords[3]));

                        movePawn(from, to);

                        engine.majBoard(strokeChoose);

                        play();

                    }
                }
            });
        }

    };

    var gameWin = function()
    {
        isEndGame = true;

        if (intervalId !== null)
        {
            window.clearInterval(intervalId);
        }

        var idWinner = engine.currentPlayerWin().getId();
        var idLooser = engine.getOpposingPlayer().getId();
        var idGame = parseInt($(".gameContainer").attr("id"));

        $.ajax(
            {
                type: "POST",
                url: "end_game_maj.php",
                data:
                    {
                        "idGame":idGame,
                        "idLooser":idLooser,
                        "idWinner":idWinner,
                        "addScoreWinner": 10,
                        "addScoreLooser": 1
                    },
                success: function(data) {
                    alert("Le joueur " + engine.currentPlayerWin().getPseudo() + " a gagné !");
                    document.location.href = "principale.php";
                }
            });


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
};