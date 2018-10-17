<?php

require_once('alumnosController.php');
$db = new alumnosController();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Valida que haya parametro en la url
    if (isset($_GET['action'])) {
        // Valida el tipo de parametreo en la url
        if ($_GET['action'] == 'create') {
            if ($_POST) {
                print_r($db->insert($_POST));
            }
        } else if ($_GET['action'] == 'delete'){ 
            if ($_POST) {
                print_r($db->delete($_POST));
            }
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if ($_GET) {
        if ($_GET['action'] == 'getOne') {
            if ($_GET) {
                print_r($db->getOne($_GET));
            }
        } 
    } else {
        print_r($db->getAll());
    }
} else if ($_SERVER['REQUEST_METHOD'] == "PUT") {
    if (isset($_GET['action'])) { 
        if ($_GET['action'] == 'update') {
            if ($_GET) {
                print_r($db->update($_GET));
            }
        } 
    }
}
?>