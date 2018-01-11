<?php
    include "../bdd/connect_pdo.php";
	$sql='select * from utilisateur where pseudo = "'.$_POST['pseudo'].'"';
    $res=$bdd->query($sql)->fetch();
    echo "nom : ".$res['nom']."<br>prenom : ".$res['prenom']."<br>pseudo :".$res['pseudo']."<br>score :".$res['score'];
?>
