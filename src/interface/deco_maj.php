<?php
	include "connect_pdo.php";
	session_start();
	echo $_SESSION['pseudo'];
	$sql ='update utilisateur set en_ligne=0 where pseudo LIKE "'.$_SESSION['pseudo'].'"';
	$bdd->query($sql);
	session_destroy();
	
?>
