<?php

session_start();

<?php include "connect_pdo.php"; ?>

$idGame = $_POST['idGame'];
$idLooser = $_POST['idLooser'];
$idWinner = $_POST['idWinner'];
$addScoreWinner = $_POST['addScoreWinner'];
$addScoreLooser = $_POST['addScoreLooser'];
$scoreLooser = $bdd->query('select score from utilisateur where id_usr='.$idLooser)->fetch()['score'] + $addScoreLooser;
$scoreWinner = $bdd->query('select score from utilisateur where id_usr='.$idWinner)->fetch()['score'] + $addScoreWinner;

$updateGame='update partie set winner='.$idWinner.', etat=1 where id_partie='.$idGame;
$updateWinner='update utilisateur set score='.$scoreWinner.' where id_usr='.$idWinner;
$updateLooser='update utilisateur set score='.$scoreLooser.' where id_usr='.$idLooser;

$bdd->query($updateGame);
$bdd->query($updateWinner);
$bdd->query($updateLooser);
?>