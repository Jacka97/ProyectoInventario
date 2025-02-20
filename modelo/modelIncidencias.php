<?php
include "../modelo/dbConex.php";
class modelIncidencias{

    /*Gestión de Incidencias CRUD*/

    public static function getAllIncidencias(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT Incidencia.id, Incidencia.comentarioTecnico, Incidencia.emailEnviado, Incidencia.idTecnico, Incidencia.idUbicacion, Incidencia.asunto, Incidencia.descripcion, Incidencia.estado, Incidencia.fechaCreacion, Incidencia.fechaCierre,Ubicaciones.nombre as nombreUbicacion FROM Incidencia Inner join Ubicaciones on Incidencia.idUbicacion = Ubicaciones.id;";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
    }

    public static function getIncidenciaByID($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT Incidencia.id, Incidencia.idTecnico, Incidencia.idUbicacion, Incidencia.asunto, Incidencia.descripcion, Incidencia.estado, Incidencia.fechaCreacion, Incidencia.fechaCierre,Ubicaciones.nombre as nombreUbicacion FROM Incidencia Inner join Ubicaciones on Incidencia.idUbicacion = Ubicaciones.id WHERE Incidencia.id = " . $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    public static function altaIncidencia( $idTecnico, $idUbicacion, $asunto, $descripcion){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Incidencia(idTecnico, idUbicacion, asunto, descripcion) VALUES ($idTecnico,$idUbicacion,'$asunto','$descripcion')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarIncidencia($idTecnico, $idUbicacion, $asunto, $descripcion, $estado){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Incidencia SET idTecnico = $idTecnico, idUbicacion = $idUbicacion, asunto = '$asunto', descripcion = '$descripcion', estado = '$estado'";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
    public static function actualizarEstado($id, $estado){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Incidencia SET estado = '$estado' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
 
    }
   
    public static function eliminarIncidencia($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Incidencia WHERE id = " . $id;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }


/*Voy a obtener el técnico que tenga menos Incidencias en estado cerrada para asignarle la nueva Incidencia que se cree*/
    public static function getTecnicoMenosIncidencias(){
    $conexion = conexionBD::conectar();
    $sql = "SELECT u.id AS idTecnico, u.correo AS correo, u.nombre, COUNT(i.id) AS cantidad_incidencias
    FROM Usuarios u
    LEFT JOIN Incidencia i ON u.id = i.idTecnico AND i.estado != 'cerrado'
    WHERE u.id_rol = 3 AND u.activo = 1
    GROUP BY u.id
    ORDER BY cantidad_incidencias ASC, u.id ASC
    LIMIT 1;";
    $result = $conexion->query($sql);
    $conexion->close();
    return $result->fetch_assoc();
}



}

?>