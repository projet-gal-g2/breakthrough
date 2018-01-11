<link rel="stylesheet" type="text/css" href="leader_board.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<div id="container_tab">
<?php include "tab_LB.php";?>
</div>
Chercher : <input type="text" id="choix" />

<script>
	$(document).on('keyup','#choix',function(){
		console.log("salut");
    $.ajax({
			type: 'POST',
			url: 'tab_LB.php',
			data:{pseudo_lb:$(this).val()},
			success:
				function(data){
					$("#container_tab").html(data);
				}
		});
});
</script>
