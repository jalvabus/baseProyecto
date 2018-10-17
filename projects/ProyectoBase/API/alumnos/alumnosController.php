<?php
class alumnosController {

    function __construct() {}

    function getConnection () {
        require_once('../config/DB.php');
        $db = new DB();

        return $db -> getConnection();
    }

    function insert($insert) {
        $nombre = $insert['nombre'];
        $apellido_paterno = $insert['apellido_paterno'];
        $apellido_materno = $insert['apellido_materno'];
        $sexo = $insert['sexo'];
        $grupo = $insert['grupo'];
        $direccion = $insert['direccion'];
        $telefono = $insert['telefono'];
        $matricula = $insert['matricula'];

        
        $sql = "SELECT insertAlumno('$matricula', '123456', '$nombre','$apellido_paterno', '$apellido_materno', '$direccion', '$telefono', '$grupo', '$sexo', 'Alumno');";
        echo $sql;
        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se ha registrado el usuario";	
        
    }
    
    function update($update) {
        $id = $update['id_alumno'];
        $nombre = $update['nombre'];
        $apellido_paterno = $update['apellido_paterno'];
        $apellido_materno = $update['apellido_materno'];
        $sexo = $update['sexo'];
        $grupo = $update['grupo'];
        $direccion = $update['direccion'];
        $telefono = $update['telefono'];
        $matricula = $update['matricula'];

        $sql = "UPDATE alumno SET nombre = '$nombre', apellido_paterno='$apellido_paterno', apellido_materno='$apellido_materno',
        sexo='$sexo', direccion = '$direccion', grupo = '$grupo', telefono = '$telefono' where id_alumno = $id";

        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se ha registrado el usuario";	
    }

    function delete($delete) {
        $id = $delete['id_alumno'];
        $sql = "SELECT deleteUsuario($id)";
        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se elimino el registro";	
    }

    function getAll(){ 
        $sql = "SELECT * FROM alumno NATURAL JOIN usuario;";
        if(!$result=pg_query($this->getConnection(),$sql)){
            return False;
        }
        $combined=array();
        while ($row = pg_fetch_assoc($result)) {
                $id = $row['id_usuario'];
                $id_alumno = $row['id_alumno'];
                $nombre = $row['nombre'];
                $apellido_paterno = $row['apellido_paterno'];
                $apellido_materno = $row['apellido_materno'];
                $sexo = $row['sexo'];
                $grupo = $row['grupo'];
                $direccion = $row['direccion'];
                $telefono = $row['telefono'];
                $matricula = $row['matricula'];

                $combined[] = array('id_usuario' => $id, 'id_alumno' => $id_alumno, 'nombre' => $nombre, 'apellido_paterno' => $apellido_paterno, 
                'apellido_materno' => $apellido_materno, 'grupo'=> $grupo, 'direccion' => $direccion, 'telefono' => $telefono,
                'sexo' => $sexo, 'matricula' => $matricula);
        }
        $json = array('status' => 0, 'alumnos' => $combined);
        echo json_encode($json);
    }

    function getOne($select){ 
        $id_usuario = $select['id_usuario'];
        $sql = "SELECT * FROM alumno NATURAL JOIN usuario where id_usuario = $id_usuario;";
        if(!$result=pg_query($this->getConnection(),$sql)){
            return False;
        }
        $combined=array();
        while ($row = pg_fetch_assoc($result)) {
                $id = $row['id_usuario'];
                $id_alumno = $row['id_alumno'];
                $nombre = $row['nombre'];
                $apellido_paterno = $row['apellido_paterno'];
                $apellido_materno = $row['apellido_materno'];
                $sexo = $row['sexo'];
                $grupo = $row['grupo'];
                $direccion = $row['direccion'];
                $telefono = $row['telefono'];
                $matricula = $row['matricula'];

                $combined[] = array('id_usuario' => $id, 'id_alumno' => $id_alumno, 'nombre' => $nombre, 'apellido_paterno' => $apellido_paterno, 
                'apellido_materno' => $apellido_materno, 'grupo'=> $grupo, 'direccion' => $direccion, 'telefono' => $telefono,
                'sexo' => $sexo, 'matricula' => $matricula);
        }
        echo json_encode($combined);
    }

}   

?>