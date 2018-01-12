<?php
    include "../bdd/connect_pdo.php";
    $res=$bdd->query('select * from utilisateur where pseudo LIKE "'.$_POST['pseudo'].'"')->fetch();

    echo "nom : ".$res['nom']."<br>prenom : ".$res['prenom']."<br>pseudo :".$res['pseudo']."<br>score :".$res['score'];
?>
