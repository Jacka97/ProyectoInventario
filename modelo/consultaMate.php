<?php
include "./dbConex.php";
class consultaMarca{
    private $id;
    private $tipo;
    public static function getAllMarcas(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Materiales";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getMarcaById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Materiales WHERE id_producto = $id";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarMarca($nombre){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Materiales (nombre) VALUES ('$nombre')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizarMarca($id, $nombre){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Materiales SET nombre = '$nombre' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    public static function eliminarMarca($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Materiales WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}?>