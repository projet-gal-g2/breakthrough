<?php
	include "../bdd/connect_pdo.php";
	session_start();
	$sql ='update utilisateur set en_ligne=0 where pseudo LIKE "'.$_SESSION['pseudo'].'"';
	$bdd->query($sql);
	unset($_SESSION['pseudo']);
	session_destroy();
?>
