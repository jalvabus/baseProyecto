<?php

class DB { 

    function __construct() { }

    function getConnection () {
        $host        = "host = 127.0.0.1";
        $port        = "port = 5432";
        $dbname      = "dbname = escuela";
        $credentials = "user = postgres password=123456";
        
        return $db = pg_connect("$host $port $dbname $credentials");
    }

    function validateConnection () {
        if($this->getConnection()) {
            return true;
         } else {
            return false;
         }
    }
}

?>