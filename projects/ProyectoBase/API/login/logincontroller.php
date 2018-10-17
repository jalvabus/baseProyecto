<?php 

class logincontroller {

    function __construct() {}

        function getConnection () {
           require_once('../config/DB.php');
            $db = new DB();

            return $db -> getConnection();
        }
        
        function getUsuario($usuario) {
            $matricula = $usuario['matricula'];
            $pass = $usuario['password'];
        
            $sql = "SELECT * FROM usuario where matricula = '$matricula' and password = '$pass';";
                if(!$result=pg_query($this->getConnection(),$sql)){
                    return False;
                }
                $combined=array();
                while ($row = pg_fetch_assoc($result)) {
                        $id = $row['id_usuario'];
                        $matricula = $row['matricula'];
                        $password = $row['password'];
                        $tipo = $row['tipo'];
                       
                        $combined[] = array('id_usuario' => $id, 'matricula' => $matricula, 'password' => $password, 
                        'tipo' => $tipo);
                }
                $json = array('status' => 0, 'data' => $combined);
                echo json_encode($json);
        }

}

?>