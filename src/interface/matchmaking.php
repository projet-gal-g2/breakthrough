<?php
    session_start();

    include "../bdd/connect_pdo.php";

    $updatePlayer= 'update utilisateur set en_recherche=1 where pseudo LIKE "'.$_SESSION["pseudo"].'"';
    $idPlayer = $bdd->query('select id_usr from utilisateur where pseudo LIKE "'.$_SESSION["pseudo"].'"')->fetch()['id_usr'];

    $bdd->query($updatePlayer);

    $opposenteName = $bdd->query('select pseudo from utilisateur where not pseudo LIKE "'.$_SESSION["pseudo"].'" and en_recherche=1')->fetch()['pseudo'];

    while(!isset($opposenteName) && !isset($idGame)){
       $opposenteName = $bdd->query('select pseudo from utilisateur where not pseudo LIKE "'.$_SESSION["pseudo"].'" and en_recherche=1')->fetch()['pseudo'];
        sleep(1);
    };

    $updatePlayer= 'update utilisateur set en_recherche=0 where pseudo LIKE "'.$_SESSION["pseudo"].'"';
    $bdd->query($updatePlayer);

    if(isset($idGame))s
    {
        $_SESSION['idGame'] = $idGame;
        echo "gameFound";
    }
    else
    {
        echo $opposenteName;
    }


?>