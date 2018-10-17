<?php

require_once('logincontroller.php');
$db = new logincontroller();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    print_r($db->getUsuario($_POST));
}

?>