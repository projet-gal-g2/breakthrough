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
 <body>

<?php include "header.html"; ?>

<div id="pContainer" >

</div>

<script>

    var plateau = new Breakthrough.Plateau();
    var player1 = new Breakthrough.Player(Breakthrough.Piece.WHITE, true);
    var player2 = new Breakthrough.Player(Breakthrough.Piece.BLACK, false);

    plateau.startGame(player1, player2);
</script>

<footer>
<?php include "footer.html"; ?></footer>



</body>
</html>
