<?php
class controller {

    function __construct() {}

    function getConnection () {
        $host        = "host = 127.0.0.1";
        $port        = "port = 5432";
        $dbname      = "dbname = escuela";
        $credentials = "user = postgres password=123456";

        return $db = pg_connect("$host $port $dbname $credentials");
    }

    function insert($insert) {
        $nombre = $insert['nombre'];
        $apellido_paterno = $insert['apellido_paterno'];
        $apellido_materno = $insert['apellido_materno'];
        $sexo = $insert['sexo'];
        $sql = "INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, sexo) VALUES ('$nombre','$apellido_paterno','$apellido_materno','$sexo');";
        echo($sql);
        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se ha registrado el usuario";	
    }
    
    function update($update) {
        $id = $update['id_calificacion'];
        $primer_parcial = $update['primer_parcial'];
        $segundo_parcial = $update['segundo_parcial'];
        $tercer_parcial = $update['tercer_parcial'];

        $sql = "UPDATE cursos SET primer_parcial = '$primer_parcial', segundo_parcial='$segundo_parcial', tercer_parcial = '$tercer_parcial'  where id_calificacion = $id";
        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se ha registrado el usuario";	
    }
    function delete($delete) {
        $id = $delete['id_usuario'];
        $sql = "DELETE FROM usuarios WHERE id_usuario = $id";
        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se elimino el registro";	
    }

    function getAll($select){ 
        $id_usuario = $select['id_usuario'];
        $sql = "SELECT * FROM cursos JOIN alumno ON cursos.id_alumno = alumno.id_alumno JOIN usuario ON alumno.id_usuario = usuario.id_usuario WHERE usuario.id_usuario = $id_usuario;";
        if(!$result=pg_query($this->getConnection(),$sql)){
            return False;
        }
        $combined=array();
        while ($row = pg_fetch_assoc($result)) {
                $id_calificacion = $row['id_calificacion'];
                $id_alumno = $row['id_alumno'];
                $id_profesor = $row['id_profesor'];
                $materia = $row['materia'];
                $primer_parcial = $row['primer_parcial'];
                $segundo_parcial = $row['segundo_parcial'];
                $tercer_parcial = $row['tercer_parcial'];
                $fecha = $row['fecha'];
                $nombre = $row['nombre'];
                $apellido_paterno = $row['apellido_paterno'];
                $apellido_materno = $row['apellido_materno'];
                $sexo = $row['sexo'];
                $grupo = $row['grupo'];
                $direccion = $row['direccion'];
                $telefono = $row['telefono'];
                $matricula = $row['matricula'];

                $combined[] = array('id_alumno' => $id_alumno, 
                'nombre' => $nombre, 
                'apellido_paterno' => $apellido_paterno, 
                'apellido_materno' => $apellido_materno, 
                'grupo'=> $grupo, 
                'direccion' => $direccion, 
                'telefono' => $telefono,
                'sexo' => $sexo, 
                'id_calificacion' => $id_calificacion,
                'id_profesor' => $id_profesor,
                'materia' => $materia,
                'primer_parcial' => $primer_parcial,
                'segundo_parcial' => $segundo_parcial,
                'tercer_parcial' => $tercer_parcial,
                'fecha' => $fecha);
        }
        $json = array('status' => 0, 'cursos' => $combined);
        echo json_encode($json);
    }

}
?>