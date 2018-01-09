/**
 * Created by bcleton on 08/01/18.
 */


Breakthrough.Plateau = function(c) {
        var container = c;
        var square_dim = 35;

        this.initialize = function() {

            container.write("<table border=0 cellspacing=0 cellpadding=0 width="+(square_dim*8+8) + ">");
            var color = 0;
            for(var i = 0; i < 8; i++)
            {
                container.write("<tr>");
                for(var j = 0; i < 8; i++)
                {
                    switch(color)
                    {
                        case 0:
                            container.write("<td><div style='background-color: black' width=" + square_dim + " height=" + square_dim + "</div></td>");
                            break;

                        case 1:
                            container.write("<td><div style='background-color: white' width=" + square_dim + " height=" + square_dim + "</div></td>");
                            break;
                    }

                    color = (color + 1) % 2;
                }

                container.write("</tr>");
            }

            container.write("</table>");
        };

};