
<table id="table_choix">
<tr>
	<td class="button2" id="pvp">
		Joueur vs Joueur
	</td>
</tr>
<tr>
	<td height=20% class="non_aff">
		
	</td>
</tr>
<tr>
	<td class="button3" id="vsIa" pseudo="<?php  ?>" idPlayer="<?php  ?>">
		Joueur vs IA
	</td>
</tr>
</table>

<script>
$(document).on("click", "#vsIa", function(){
    var random = Math.floor(Math.random() * Math.floor(1));
    var pseudo1;
    var pseudo2;
    var idGame;
    var idj1;
    var idj2;

    switch(random)
    {
        case 0:
            pseudo1 = "IA";
            idj1 = -1;

            pseudo2 = $("#vsIa").attr("pseudo");
            idj2 = parseInt($("#vsIa").attr("idPlayer"));
            break;

        case 1:
            pseudo2 = "IA";
            idj2 = -1;

            pseudo1 = $("#vsIa").attr("pseudo");
            idj1 = parseInt($("#vsIa").attr("idPlayer"));
            break;
    }



    $.ajax(
    {
        type: "POST",
        url: "jeu.php",
        data:
            {
                "pseudo1": pseudo1,
                "pseudo2": pseudo2,
                "idGame": idGame,
                "idj1": idj1,
                "idj2": idj2
            },
        success: function(data) {}
    });
});
</script>
