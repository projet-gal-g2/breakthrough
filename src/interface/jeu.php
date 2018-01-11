<html>
 <head>
  <title>Breackthrough</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script type="text/javascript" src="../Javascript/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="../Javascript/Breakthrough.js"></script>
    <script type="text/javascript" src="../Javascript/Stroke.js"></script>
    <script type="text/javascript" src="../Javascript/Player.js"></script>
    <script type="text/javascript" src="../Javascript/Engine.js"></script>
    <script type="text/javascript" src="../Javascript/Plateau.js"></script>
 </head>
 <style>
.foot{
	bottom: 0px;
}
.taille300{
	height:300px;
}
.test{
	border: solid black 1px;
}
.taille400{
	height:400px;
}
.abandonner {
    position: absolute;
    bottom: 0px;
}
.time {
    position: absolute;
    top: 0px;
    width: 200px;
    border: 3px solid #582900;
    padding: 5px;
}
.Joueur1 {
    position: absolute;
    top: 0px;
    width: 200px;
    border: 3px solid #582900;
    padding: 5px;
}
.Joueur2 {
    position: absolute;
	bottom:0px;
    width: 200px;
    border: 3px solid #582900;
    padding: 5px;
}
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
}

@keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
}

/* The Close Button */
.close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: #582900;
    color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
}
.btregle {
    position: absolute;
    bottom: 0px;
    left : 150px;
}
</style>
 <body>
<?php include "header2.html"; ?>
<?php
	session_start();
	echo "pseudo est : ".$_SESSION["pseudo"];
	/*
	if(!isset($_SESSION["pseudo"])){
		header("location: acceuil.php");
	}
	*/

    $_POST['pseudo1']="IA";
    $_POST['pseudo2']="le_bagnard";
    $_POST['idGame'] = 1;
    $_POST['idj1'] = -1;
    $_POST['idj2'] = 1;

?>
<div class="container">

		<div class="row" style=" margin-top:50px" > 
			<div class="col-sm-1 col-md-2 col-lg-3 intro mini_intro taille400" pseudo=<?php echo $_POST['pseudo1'];?> id=<?php echo $_POST['idj1'];?>>
				<div class="row joueur1" pseudo=<?php echo $_POST['pseudo1'];?> id=<?php echo $_POST['idj1'];?>>
					<p align="left">Joueur1 : <?php echo $_POST['pseudo1'];?></p>
				</div>
				<div class="row joueur2" pseudo=<?php echo $_POST['pseudo2'];?> id=<?php echo $_POST['idj2'];?>>
					<p align="left">Joueur2 : <?php echo $_POST['pseudo2'];?></p>
				</div>
			</div>
			<div class="col-sm-10 col-md-8 col-lg-6 intro mini_intro " id=<?php echo $_POST['idGame'];?>>
				<div style="display: inline-block; width: 1px; vertical-align:middle; height=100%;"></div>
				<div id="pContainer" style="display: inline-block; vertical-align:middle;"></div>
			</div>
			<div class="col-sm-1 col-md-2 col-lg-3 intro mini_intro taille400">
				<div class="time row">
					<p id="timer" align="left">Time :</p>
				</div>
				<div class="abandonner row">
					<button type="button" id="leave" align="middle-right" class="btn btn-danger">Abandonner</button>
				</div>
				<div class="row btregle"><button type="button" align="middle-right" class="btn btn-danger" id="myBtn4">Règles</button> </div>
			</div>
		</div>
		<div class="row" style="margin-top:20%;">
				<?php include "footer.html"; ?>
		</div>


<div id="myModal4" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>REGLES</h2>
    </div>
    <div class="modal-body">
      <p><h2>Déplacements et capture des pièces</h2>

Chaque joueur déplace une pièce par coup. Une pièce peut être déplacée d'une case vers l'avant, tout droit ou en diagonale, si la case d'arrivée est vide. Une pièce peut aussi être déplacée vers une case occupée par une pièce adverse, si la case d'arrivée se trouve à une case en diagonale et en avant. Le diagramme suivant montre une situation où:</p>
      <p><h2>Fin de la partie</h2>
La partie se termine si un joueur atteint la rangée de départ de l'adversaire. Le diagramme suivant montre un exemple de coup gagnant de noir:</p>
<p><h2>Autre règles importantes</h2>

    Les prises ne sont pas obligatoires. Même si un joueur peut capturer une pièce adverse, il peut choisir n'importe quel autre coup légal à la place. </p>
    </div>
  </div>
</div>


<script>

var plateau = new Breakthrough.Plateau();
var pseudo1 = $(".joueur1").attr("pseudo");
var pseudo2 = $(".joueur2").attr("pseudo");
var idj1 = parseInt($(".joueur1").attr("id"));
var idj2 = parseInt($(".joueur2").attr("id"));

var player1 = new Breakthrough.Player(Breakthrough.Piece.WHITE, true, pseudo1, idj1);
var player2 = new Breakthrough.Player(Breakthrough.Piece.BLACK, false, pseudo2, idj2);

plateau.startGame(player1, player2);


// Get the modal
var modal4 = document.getElementById('myModal4');

// Get the button that opens the modal
var btn4 = document.getElementById("myBtn4");

// Get the button that abandon
var abandonBtn = document.getElementById("leave");


// Get the <span> element that closes the modal
var span4 = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn4.onclick = function() {
    modal4.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span4.onclick = function() {
    modal4.style.display = "none";
}

abandonBtn.onclick = function() {
    plateau.abandon();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}



</script>




</body>

</html>
