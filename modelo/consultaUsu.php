<?php
include "../modelo/dbConex.php";
class consultaUsu{
    private $id;
    private $correo;
    private $contrasenya;
    private $nombre;
    private $activo = true;  // por defecto el usuario está activo
    private $rol = null;
   
    public static function getAllUsu(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT Usuarios.*, Roles.nombre as 'rol' FROM Usuarios left join Roles on Usuarios.id_rol = Roles.id";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getRolByCorreo($correo){
        $conexion = conexionBD::conectar();
        $sql = "SELECT id_rol FROM Usuarios WHERE correo = $correo";
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
    
    public static function altaUsu($correo, $contrasenya, $nombre, $activo, $rol){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Usuarios (correo, pass, nombre, activo, id_rol) VALUES ('$correo', '$contrasenya','$nombre','$activo','$rol')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarUsu($id, $correo, $contrasenya, $nombre, $activo, $rol){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Usuarios SET correo = '$correo',pass = '$contrasenya', nombre='$nombre',activo = '$activo', id_rol = '$rol' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
   
    public static function eliminarUsu($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Usuarios WHERE id = " . $id;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }

    public static function logincheck($correo, $contrasenya) {
        $conexion = conexionBD::conectar();
    
        // Usar una consulta preparada para evitar inyección SQL
        $sql = "SELECT id FROM Usuarios WHERE correo = ? AND pass = ? AND activo = 1";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ss", $correo, $contrasenya);
        $stmt->execute();
        $resultado = $stmt->get_result();
    
        if ($resultado->num_rows > 0) {
            return true;  // Usuario autenticado correctamente
        } else {
            return false; // Credenciales incorrectas
        }
    
        $stmt->close();
        $conexion->close();
    }
}

?>