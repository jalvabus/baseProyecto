<?php

class cursosController {

    function __construct() {}

    function getConnection () {
        require_once('../config/DB.php');
        $db = new DB();

        return $db -> getConnection();
    }

    function insert($insert) {
        $id_alumno = $insert['id_alumno'];
        $materia = $insert['materia'];
        $id_usuario = $insert['id_profesor'];

        $sql = "SELECT insertAlumnoCurso($id_usuario, $id_alumno, '$materia');";

        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se ha registrado el usuario al curso";	
        
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

        $sql = "UPDATE usuarios SET nombre = '$nombre', apellido_paterno='$apellido_paterno', apellido_materno='$apellido_materno',
        sexo='$sexo' where id_usuario = $id";

        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se ha registrado el usuario";	
    }

    function delete($delete) {
        $id = $delete['id_curso'];
        $sql = "DELETE FROM cursos WHERE id_calificacion = $id;";
        pg_query($this->getConnection(), $sql);
        pg_close($this->getConnection());
        echo "Se elimino el registro";	
    }

    function getAll(){ 
        $sql = "SELECT * FROM cursos JOIN alumno ON cursos.id_alumno = alumno.id_alumno JOIN usuario ON alumno.id_usuario = usuario.id_usuario;";
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
        $json = array('status' => 0, 'alumnos_inscritos' => $combined);
        echo json_encode($json);
    }


}

?>