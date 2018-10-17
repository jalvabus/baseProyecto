<?php

require_once('DB.php');
$db = new DB();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if ($db->validateConnection()) {
        echo("CONEXION A LA BASE EXITOSA");
    } else {
        echo("ERROR");
    }
}

?>