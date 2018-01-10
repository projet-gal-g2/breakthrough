<link rel="stylesheet" type="text/css" href="leader_board.css"/>
<table id="table_leaderboard">
	<td class="non_aff"></td>
	<td class="non_aff">
		<font face="verdana" color="red">LEADER BOARD</font>
	</td>
<?php
	include "../bdd/connect_pdo.php";
	$sql='select * from utilisateur order by score desc limit 10';
	$res=$bdd->query($sql);
	$cpt=1;
	while($data=$res->fetch()){
		echo "
		<tr>
			<td>
				".$cpt."
			</td>
			<td>
				".$data['pseudo']."
			</td>
			<td>
				".$data['score']."
			</td>
		</tr>
		";
		$cpt=$cpt+1;
	}
?>
</table>
