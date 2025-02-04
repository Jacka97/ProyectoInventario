<?php
include "../modelo/dbConex.php";
class consultaUsu{
    private $id;
    private $correo;
    private $contrasenya;
    private $nombre;
    private $rol = null;
   
    public static function getAllUsu(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Usuarios";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getUsuByCorreo($correo){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Usuarios WHERE correo = " . $correo;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    // funcion para obtener el ususario por el id
    public static function getUsuById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Usuarios WHERE id = ". $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function altaUsu($nombre, $correo, $contrasenya){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Usuarios (correo, contrasenya, nombre) VALUES ('$nombre', '$correo', '$contrasenya')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarUsu($id, $nombre, $correo, $contrasenya, $rol){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Usuarios SET correo = '$correo',contrasenya = '$contrasenya', nombre='$nombre', rol = '$rol' WHERE id = " . $id;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
   
    public static function eliminarUsu($correo){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Usuario WHERE correo = " . $correo;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}

?>