<?php
include "./dbConex.php";
class consultaUsu{
    private $id;
    private $nombre;
    private $correo;
    private $telefono;
    private $contrasenya;
    
    public static function getAll(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM usuarios";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM usuarios WHERE id_producto = $id";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertar($nombre, $correo, $contrasenya, $telefono){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO usuarios (nombre, correo, contrasenya, telefono) VALUES ('$nombre', '$correo', '$contrasenya', $telefono)";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizar($query){
        $conexion = conexionBD::conectar();
        $sql = $query;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    public static function eliminar($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM usuarios WHERE id_usu = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}
?>