

    <?php
        try
        {
            // $bdd = new PDO('mysql:host=localhost;dbname=gestion_repas;charset=utf8', 'usr', 'µ$R');
            $bdd = new PDO('mysql:host=localhost;dbname=breakthrough;charset=utf8', 'root', 'toto');
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }
    ?>

