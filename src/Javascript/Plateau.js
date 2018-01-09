/**
 * Created by bcleton on 08/01/18.
 */


Breakthrough.Plateau = function() {
        var square_dim = 50;

        this.initialize = function() {
            var tab = "<table style='margin: auto;' border=0 cellspacing=0 cellpadding=0 width="+(square_dim*8+8) + ">";
            var color = 0;
            for(var i = 0; i < 8; i++)
            {
                tab += "<tr>";
                for(var j = 0; j < 8; j++)
                {
                    switch(color)
                    {
                        case 0:
                            tab += "<td><div style='background-color: orange; width: " + square_dim + "; height: " + square_dim + ";'</div></td>";
                            break;

                        case 1:
                            tab += "<td><div style='background-color: maroon; width: " + square_dim + "; height: " + square_dim + ";'</div></td>";
                            break;
                    }

                    color = (color + 1) % 2;
                }

                tab += "</tr>";
                color = (color + 1) % 2;
            }

            tab += "</table>";

            $("#pContainer").html(tab);
        };

};