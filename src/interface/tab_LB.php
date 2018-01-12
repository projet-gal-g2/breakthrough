<table id="table_leaderboard">
	<td class="non_aff"></td>
	<td class="non_aff">
	    <?php
	    if(!stripos($_SERVER['PHP_SELF'], "leader_board_page.php")){
                  $top_10=" top 10!";
              }else{
                  $top_10="";
              };
        ?>
		<a href="leader_board_page.php"><font face="verdana" color="red" >LEADER BOARD<?php echo $top_10;?></font></a>
	</td>
<?php

    if(!stripos($_SERVER['PHP_SELF'], "leader_board_page.php")){
        $limit="limit 10";
    }else{
        $limit="";
    }
	if(isset($_POST['pseudo_lb'])){
		$sql='select * from utilisateur where pseudo LIKE "%'.$_POST['pseudo_lb'].'%" order by score desc limit 10';
	}else{
		$sql='select * from utilisateur order by score desc '.$limit;
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
