<!DOCTYPE html>
<html>
<head>
	<title> Jeu de breakthrough </title>
	<meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="style.css"/>
	<link rel="stylesheet" type="text/css" href="principale.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

</head>

<body>


	<?php include "connect_pdo.php"; ?>
	<?php
	session_start();
	$lock=0;
	if($lock==0){
	if(count($_POST) >2){
		$ajout_commande=$bdd->prepare('insert into utilisateur(nom,prenom,pseudo,mdp,en_ligne)
		VALUES(:nom,:prenom,:pseudo,:mdp,:en_ligne)');
		$ajout_commande->execute(array(
							'nom'=>$_POST['pseudo'],
							'prenom'=>$_POST['name'],
							'pseudo'=>$_POST['prenom'],
							'mdp'=>$_POST['mdp'],
							'en_ligne'=>1
							));
	}else{
		$sql='select * from utilisateur where pseudo LIKE "'.$_POST['pseudo'].'" and mdp LIKE "'.$_POST['password'].'"';
		$res = $bdd->query($sql);
		if($data = $res->fetch()){
			$id = $data['id_usr'];
			$sql ='update utilisateur set en_ligne=1 where id_usr='.$id;
			$bdd->query($sql);
			$_SESSION['pseudo']=$_POST['pseudo'];
			$lock=1;
		}
		else{
			header('Location: acceuil.php');
		}
	}
	}
	if(!isset($_SESSION["pseudo"])){
		header("location: acceuil.php");
	}
	echo "pseudo = ".$_SESSION['pseudo'];

?>
	<?php include "header2.html"; ?>
	<div class="container test">
		<div class="row">
			<div class="col-sm-offset-2 col-sm-2 col-md-offset-2 col-md-2 col-lg-offset-1 col-lg-3  centre mini_intro">
				<div align="center">
					<button href="jeu.php" class="button" id="button_jouer">Jouer</button>
				</div>
			</div>
			<div class="col-sm-offset-3 col-sm-1 col-lg-offset-1 col-lg-3  centre mini_intro" id="button_options">
				
			</div>
			
			<div class="col-sm-offset-3 col-sm-1 col-md-offset-2 col-md-2 col-lg-offset-1 col-lg-3  centre mini_intro">
				<?php include "leader_board.php" ?>
			</div>
		</div>
	</div>	
	
	<footer><?php include "footer.html"; ?></footer>
</body>
<script>
	var cpt=0;
$(document).on("click","#button_jouer",function(){
	if(cpt==0){
		$.ajax({
				type: 'POST',
				url: 'options_jeu.php',
				data:{},
				success:
					function(data){
						$("#button_options").html(data);
						cpt=1;
					}
			});
	}else{
		$("#button_options").html("");
		cpt=0;
	}
});
</script>
</html>

