

    <?php
        try
        {
            $bdd = new PDO('mysql:host=localhost;dbname=breakthrough;charset=utf8', 'root', 'toto');
            //$bdd = new PDO('mysql:host=192.168.22.71;dbname=breakthrough;charset=utf8', 'root', 'toto');
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }
    ?>

