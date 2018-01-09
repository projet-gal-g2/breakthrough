<html>
 <head>
  <title>Breackthrough</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
 </head>
 <style>
.abandonner {
    position: absolute;
	right : 350px;
    bottom: 150px;
}
.time {
    position: absolute;
	right : 350px;
    top: 200px;
    width: 200px;
    border: 3px solid #3B5998;
    padding: 5px;
}
.Joueur1 {
    position: absolute;
	left : 350px;
    top: 200px;
    width: 200px;
    border: 3px solid #3B5998;
    padding: 5px;
}
.Joueur2 {
    position: absolute;
	left : 350px;
    bottom: 150px;
    width: 200px;
    border: 3px solid #3B5998;
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
    background-color: #3B5998;
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
	right : 275px;
    bottom: 150px;
}
</style>
 <body>
<?php include "header2.html"; ?>
<div class = "abandonner">
 <button type="button" align="middle-right" class="btn btn-danger">Abandonner</button>
</div>
<div class="time">
  <p align="left">Time :</p>
</div>
<div class="joueur1">
  <p align="left">Joueur1 :</p>
</div>
<div class="joueur2">
  <p align="left">Joueur2 :</p>
</div>
<div class="btregle"><button type="button" align="middle-right" class="btn btn-danger" id="myBtn">Règles</button> </div>


<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>REGLES</h2>
    </div>
    <div class="modal-body">
      <p><h2>Déplacements et capture des pièces</h2>

Chaque joueur déplace une pièce par coup. Une pièce peut être déplacée d'une case vers l'avant, tout droit ou en diagonale, si la case d'arrivée est vide. Une pièce peut aussi être déplacée vers une case occupée par une pièce adverse, si la case d'arrivée se trouve à une case en diagonale et en avant. Le diagramme suivant montre une situation où:

</p>
      <p><h2>Fin de la partie</h2>

La partie se termine si un joueur atteint la rangée de départ de l'adversaire. Le diagramme suivant montre un exemple de coup gagnant de noir:</p>
<p><h2>Autre règles importantes</h2>

    Les prises ne sont pas obligatoires. Même si un joueur peut capturer une pièce adverse, il peut choisir n'importe quel autre coup légal à la place. </p>
    </div>
  </div>

</div>
<script>
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>
<footer>
<?php include "footer.html"; ?></footer>



</body>
</html>