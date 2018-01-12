<?php
	session_start();

	include "../bdd/connect_pdo.php";

	$idGame = $_POST['idGame'];
	$departL = $_POST['departL'];
	$departC = $_POST['departC'];
	$arriveL = $_POST['arriveL'];
	$arriveC = $_POST['arriveC'];
	$timer = 0;
	$nombreDeCoup = $bdd->query('select nombreDeCoup from plateau where id_partie='.$idGame)->fetch()['nombreDeCoup'] + 1;

	$updateGame='update plateau set ' +
					'departL='.$departL +
					'departC='.$departC +
					'darriveL='.$arriveL +
					'arriveC='.$arriveC +
					'timer='.$timer +
					'nombreDeCoup='.$nombreDeCoup +
					'where id_partie='.$idGame;

	$bdd->query($updateGame);
?>