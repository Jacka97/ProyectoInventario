<?php
include "../modelo/dbConex.php";
class consultaSoft{
    private $id;
    private $idPC;
    private $nombre;
  
    public static function getAllSoftwarePC(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Software_PC";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getSoftPCById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Software_PC WHERE id = " . $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarSoftwarePC($nombre){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Software_PC (nombre) VALUES ('$nombre')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarSoftwPC($id, $nombre){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Software_PC SET nombre = '$nombre' WHERE id = ".$id;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
    public static function eliminarSoftwarePC($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Software_PC WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }

}
?>