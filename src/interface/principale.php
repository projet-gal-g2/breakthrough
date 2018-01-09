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
	<div class="container">
		<div align="center">
			<ul id="menu bouton" >
			<li><a href="#">Jouer</a>
				<ul>
					<li><a href="JcJ.php">Joueur vs Joueur</a></li>
					<li><a href="JcIA">Joueur vs IA</a></li>
					<li><a href="Regles.php">Règles du Jeu</a></li>
				</ul>
			</li>
		</ul>
		</div>
	</div>	
	<footer><?php include "footer.html"; ?></footer>
</body>
</html>
