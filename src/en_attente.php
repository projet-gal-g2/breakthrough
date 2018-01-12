 <?php
    session_start();
	include "../bdd/connect_pdo.php";
	
	if($_POST['timeout'] == 1){
		$sql='update utilisateur set en_attente=0 where pseudo="'.$_POST['pseudo'].'"';		
	}else{
		$sql='update utilisateur set en_attente=1 where pseudo="'.$_POST['pseudo'].'"';
	}
	$bdd->query($sql);
    
?>