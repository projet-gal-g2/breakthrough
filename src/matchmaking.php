<?php
    session_start();

    include "../bdd/connect_pdo.php";

    $res=$bdd->query('select pseudo from utilisateur where pseudo NOT LIKE "'.$_POST['pseudo'].'" and en_recherche=1')->fetch()['pseudo'];
	echo $res;
?>