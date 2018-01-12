<?php
    session_start();
    include "../bdd/connect_pdo.php";
	$sql='select pseudo as p from utilisateur where pseudo NOT LIKE "'.$_POST['pseudo'].'" and en_attente=1';
    $res=$bdd->query($sql)->fetch()['p'];
	echo $res;
?>