<?php
include "./dbConex.php";
class consultaSoft{
    private $id;
    private $nombre;
    private $precio;
    private $clave;
  
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
    
    public static function insertarSoftware($nombre, $precio, $clave){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Software (nombre, precio, clave) VALUES ('$nombre', '$precio', '$clave')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarSoftw($id, $nombre, $precio, $clave){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Software SET nombre = '$nombre', precio = '$precio', clave = '$clave' WHERE id = $id";
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