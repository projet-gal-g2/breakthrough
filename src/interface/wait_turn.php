<?php
	
	session_start();

	include "../bdd/connect_pdo.php";

	$idGame = $_POST['idGame'];
	
	$nombreDeCoup = $bdd->query('select nombreDeCoup from plateau where id_partie='.$idGame)->fetch()['nombreDeCoup'];
	$abandon = $bdd->query('select abandon from plateau where id_partie='.$idGame)->fetch()['abandon'];
	$nbPlusUn = $nombreDeCoup + 1;

	while($nombreDeCoup < $nbPlusUn && $abandon === 0)
	{
		$nombreDeCoup = $bdd->query('select nombreDeCoup from plateau where id_partie='.$idGame)->fetch()['nombreDeCoup'];
		$abandon = $bdd->query('select abandon from plateau where id_partie='.$idGame)->fetch()['abandon'];
		sleep(1);
	}

	$coords = $bdd->query('select departL, departC, arriveL, arriveC from plateau where id_partie='.$idGame)->fetch();


	if ($abandon !=== 0)
	{
		echo "Le joueur adversaire a abandonné !";
	}
	else
	{
		echo $coords[0].",".$coords[1].",".$coords[2].",".$coords[3];
	}
	
?>