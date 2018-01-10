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

	<?php include "header2.html"; ?>
	<?php include "connect_pdo.php"; ?>
	<?php
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
					session_start();
					$_SESSION['pseudo']=$_POST['pseudo'];
				}
				else{
					header('Location: acceuil.php');
				}
			}
			

?>
	<div class="container test">
		<div class="row">
			<div class="col-lg-offset-1 col-lg-3  centre mini_intro">
				<div align="center">
					<button class="button">Jouer</button>
				</div>
			</div>
			<div class="col-lg-offset-4 col-lg-3  centre intro mini_intro">
				<h3>LeaderBoard</h3>
			</div>
		</div>
	</div>	
	<footer><?php include "footer.html"; ?></footer>
</body>
</html>
