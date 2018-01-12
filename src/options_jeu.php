
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
var interval;
var lock=false;
var cpt=0;
var attente=30;
var opponent="";
$(document).on("click", "#pvp", function(){
	if(!lock){
		lock=true;
		interval=setInterval(findOpponent, 3000);
		$.ajax({
			type: "POST",
			url: "en_attente.php",
			data:{pseudo:$("#vsIa").attr("pseudo"),timeout:0},
			success: 
				function(data) { 
					console.log("vous etes en attente");
				}
		});
	}
	
});
var my_trim = function(str){
	var new_str="";
	for(var i=0;i<str.length;i++){
		if(str.charCodeAt(i) > 25){
			new_str+=str.charAt(i);
		}
	}
	return new_str;
}
var findOpponent = function(){
	cpt++;
	 $.ajax({
		type: "POST",
		url: "matchmaking.php",
		data:{pseudo:$("#vsIa").attr("pseudo")},
		success: 
			function(data) {
				opponent=my_trim(data);
			}
	});
	opponent=opponent.trim();
	console.log(opponent=="");
	if(opponent !=""){
		$.ajax({
			type: "POST",
			url: "creation_partie.php",
			data:{pseudo1:$("#vsIa").attr("pseudo"),pseudo2:opponent,type:1},
			success: 
				function(data) { 
					document.location.href="jeu.php";
				}
		});
	}
	if(cpt>attente){
		cpt=0;
		lock=false;
		clearInterval(interval);
		
		$.ajax({
			type: "POST",
			url: "en_attente.php",
			data:{pseudo:$("#vsIa").attr("pseudo"),timeout:1},
			success: 
				function(data) { 
					alert("pas de parties trouvées");
				}
		});
	}
};
</script>
