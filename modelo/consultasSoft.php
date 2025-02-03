<?php
include "./dbConex.php";
class consultaUsu{
    private $id;
    private $nombre;
    private $correo;
    private $telefono;
    private $contrasenya;
    // HU101: Login de usuario Como usuario quiero solicitar el registro y logearme en el sistema,
    // así como cerrar la sesión
    // HU102: Dar de alta usuarios Como administrador quiero entrar en el sistema para dar de alta al
    // usuario, así como aceptar registros de usuarios
    // HU103: Modificar datos de
    // usuarios
    // Como administrador poder editar y modificar los datos de los
    // usuarios de la aplicación
    // HU104: Dar de baja usuarios Como administrador quiero entrar en el sistema para dar de baja al
    // usuario
    // HU105: Listado de Usuarios Como administrador quiero obtener un listado de los usuarios
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