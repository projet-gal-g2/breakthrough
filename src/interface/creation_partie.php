<?php
    include "../bdd/connect_pdo.php";

    $id_j1=$bdd->query('select id_usr from utilisateur where pseudo LIKE "'.$_POST['pseudo1'].'"')->fetch()['id_usr'];
    $id_j2=$bdd->query('select id_usr from utilisateur where pseudo LIKE "'.$_POST['pseudo2'].'"')->fetch()['id_usr'];

    $updateJ1='update utilisateur set en_partie=1 where id_usr='.$id_j1;
    $updateJ2='update utilisateur set en_partie=1 where id_usr='.$id_j2;

    $bdd->query($updateJ1);
    $bdd->query($updateJ2);

    $creation_partie=$bdd->prepare('insert into partie (joueur1, joueur2, type) values (:j1,:j2,:type)');
    $creation_partie->execute(array(
    							'j1'=>$id_j1,
    							'j2'=>$id_j2,
    							'type'=>$_POST['type']
    							));
    $id_game=$bdd->query('SELECT max(id_partie) as id FROM partie')->fetch()['id'];
    session_start();
    $_SESSION['idGame'] = $id_game;

 ?>