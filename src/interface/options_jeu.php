
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
	<td class="button3" id="vsIa" pseudo="<?php session_start();echo $_SESSION['pseudo'];?>">
		Joueur vs IA
	</td>
</tr>
</table>

<script>
$(document).on("click", "#vsIa", function(){
    var random = Math.floor(Math.random() * Math.floor(2));
    var pseudo1;
    var pseudo2;
    var idGame;

    switch(random)
    {
        case 0:
            pseudo1 = "IA";
            pseudo2 = $("#vsIa").attr("pseudo");

            break;

        case 1:
            pseudo2 = "IA";
            pseudo1 = $("#vsIa").attr("pseudo");

            break;
    }



    $.ajax(
    {
        type: "POST",
        url: "creation_partie.php",
        data:
            {
                "pseudo1": pseudo1,
                "pseudo2": pseudo2,
                "type": 0
            },
        success: function(data) { document.location.href="jeu.php"; }
    });
});

$(document).on("click", "#pvp", function(){
    var random = Math.floor(Math.random() * Math.floor(1));
    var pseudo1;
    var pseudo2;
    var idGame;

    switch(random)
    {
        case 0:
            pseudo1 = "IA";
            pseudo2 = $("#vsIa").attr("pseudo");

            break;

        case 1:
            pseudo2 = "IA";
            pseudo1 = $("#vsIa").attr("pseudo");

            break;
    }




});
</script>
