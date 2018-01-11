<table id="table_leaderboard">
	<td class="non_aff"></td>
	<td class="non_aff">
		<font face="verdana" color="red">LEADER BOARD</font>
	</td>
<?php
	if(isset($_POST['pseudo_lb'])){
		$sql='select * from utilisateur where pseudo LIKE "%'.$_POST['pseudo_lb'].'%" order by score desc limit 10';
	}else{
		$sql='select * from utilisateur order by score desc limit 10';
	}
	
	session_start();
	include "../bdd/connect_pdo.php";
	$res=$bdd->query($sql);
	$cpt=1;
	while($data=$res->fetch()){
		echo "
		<tr>
			<td>
				".$cpt."
			</td>
		";
		if($_SESSION['pseudo'] != $data['pseudo']){
			echo "<td>";
		}else{
			echo "<td style='border:solid red 2px;'>";
		}
		echo "
				".$data['pseudo']."
			</td>
		";
		echo "
			<td>
				".$data['score']."
			</td>
		</tr>
		";
		$cpt=$cpt+1;
	}
	
?>
</table>
