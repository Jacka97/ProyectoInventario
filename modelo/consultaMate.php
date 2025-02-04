<?php
include "./dbConex.php";
class consultaMateriales{
    private $id;
    private $tipo;
    private $marca;
    private $modelo;
    private $ubicacion;
    public static function getAllMats(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Materiales";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getMatById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Materiales WHERE id_producto = $id";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarMaterial($nombre, $correo, $contrasenya, $telefono){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Materiales (nombre, correo, contrasenya, telefono) VALUES ('$nombre', '$correo', '$contrasenya', $telefono)";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizarMateriales($id, $tipo, $marca, $modelo, $ubicacion){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Materiales SET tipo = '$tipo', marca = '$marca', modelo = '$modelo', ubicacion = '$ubicacion' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    public static function eliminarMaterial($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Materiales WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}?>