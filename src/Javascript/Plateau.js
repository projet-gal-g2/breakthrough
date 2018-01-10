/**
 * Created by bcleton on 08/01/18.
 */


Breakthrough.Plateau = function() {
        var square_dim = 50;
        var pion_dim = 40;
        var engine;
        var selectedPawn = null;

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
        var lign = $(this).attr('i');
        var column = $(this).attr('j');
        var id_case= "#l" + lign + "c" + column;


        if($(id_case).hasClass('not_selected')){

            if (selectedPawn !== null)
            {
                movePawn(selectedPawn, new SelectedPawn(parseInt(lign), parseInt(column)));
            }

            selectedPawn = new SelectedPawn(parseInt(lign), parseInt(column));

            unSelecteAll();
            changeClassAndColor(id_case, "not_selected", "is_selected", 'red');
        }
        else if($(id_case).hasClass('is_selected')){
            selectedPawn = null;
            changeClassAndColor(id_case, "is_selected", "not_selected", $(id_case).attr('color'));
        }



    });

    var movePawn = function(from, to)
    {
        var idFrom = "#l" + from.lign + "c" + from.column;
        var idTo = "#l" + to.lign + "c" + to.column;
        var pawnFrom = engine.getPiece2D(from.lign, from.column);
        var pawnTo = engine.getPiece2D(to.lign, to.column);

        var src = getSourceFromPawn(engine.getPiece2D(from.lign, from.column));

        if(src !== "none" && pawnTo === Breakthrough.Piece.EMPTY)
        {
            $(idFrom).find('img:first').remove();
            $(idTo).find('a:first').html("<img src='../interface/img/" + src + "' height='" + square_dim + "px' width='" + square_dim + "px;'>");

            engine.setPiece2D(from.lign, from.column, Breakthrough.Piece.EMPTY);
            engine.setPiece2D(to.lign, to.lign, pawnFrom);
        }
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