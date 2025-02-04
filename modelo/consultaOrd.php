<?php
include "./dbConex.php";
class consultaUsu{
    private $id;
    private $nombre;
    private $correo;
    private $telefono;
    private $contrasenya;
    
    public static function getAllOrdenadores(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM usuarios";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getOrdenadorByID($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM usuarios WHERE id_ordenador = " . $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    public static function altaOrdenador($nombre, $correo, $contrasenya, $telefono){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO usuarios (nombre, correo, contrasenya, telefono) VALUES ('$nombre', '$correo', '$contrasenya', $telefono)";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarOrdenador($id, $nombre, $correo, $contrasenya, $telefono){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE usuarios SET nombre = '$nombre', correo = '$correo', contrasenya = '$contrasenya', telefono = $telefono WHERE id_usuario = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
   
    public static function eliminarOrdenador($correo){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM usuarios WHERE correo = " . $correo;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}

?>