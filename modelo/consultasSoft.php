<?php
include "../modelo/dbConex.php";
class consultaSoft{
    private $id;
    private $nombre;
  
    public static function getAllSoftware(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Software";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getSoftById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Software WHERE id = " . $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarSoftware($nombre){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Software (nombre) VALUES ('$nombre')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarSoftw($id, $nombre){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Software SET nombre = '$nombre' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
    public static function eliminarSoftware($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Software WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }

}
?>