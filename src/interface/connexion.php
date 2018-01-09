 <head>
  <title>Breackthrough</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
 </head>
 <?php include "header.html"; ?>
<form method="post" action="traitement.php">
	<fieldset>
		<legend>Identification</legend>
			
			<label for="pseudo">Votre pseudo :</label> 
			<input type="text" name="pseudo" id="pseudo" />
			
			<label for="password">Mot de passe :</label> 
			<input type="text" name="password" id="password" />
			
			<input type="submit" value="Connexion" />
	</fieldset>
	
	
	
	
	
</form> 
<footer>
<?php include "footer.html"; ?></footer>
