
<head>
	<title> Jeu de breakthrough </title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="acceuil.css"/>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="script2.js"></script>
		
</head>
<style>
.test{
	border: solid black 1px;
}
</style>
<body>

	<?php include "header.html"; ?>
	
	<div class="container">
		<div class="row"> 
			 <div class="col-sm-4 col-md-5 col-lg-6 intro mini_intro">
				<h3>Vidéo</h3>
				<p>Lorem ipsum dolor..</p>
				<p>Ut enim ad..</p>
			</div>
			<div class="col-sm-4 col-md-5 col-lg-6 intro mini_intro">
				<?php include "leader_board.php" ;?>
			</div>
			<div class="col-sm-8 col-md-10 col-lg-12 intro">    
				<h3>Règles</h3><br>
				<p>Il est joué sur un damier, d´habitude 8x8, mais on peut utiliser des tableaux de différentes dimensions. Chaque joueur dispose de 16 pions (blancs et noirs chacun d´eux) situés sur les 2 premières rangées les plus proches de chacun d´eux.</p>
				<p>A tour de rôle, les joueurs déplacent une pièce de leur couleur.</p>
				<p>Atteindre la première ligne de l'adversaire, ou capturer tous les pions de l'adversaire</p>
				<p>Une pièce peut avancer en diagonale, tout droit seulement si la case est vide</p>
				<p>Les captures se font uniquement en diagonale. Une fois capturée, la pièce est retirée du plateau</p>
			</div>
		</div>
				<div class="row" style="margin-top:20%;">
				<?php include "footer.html"; ?>
		</div>
	</div>	

