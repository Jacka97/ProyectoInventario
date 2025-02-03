<?php
include "./dbConex.php";
class consultaMarc{
    private $id;
    private $nombre;
    private $correo;
    private $contacto;
    // HU101: Login de usuario Como usuario quiero solicitar el registro y logearme en el sistema,
    // así como cerrar la sesión
    // HU102: Dar de alta marcas Como administrador quiero entrar en el sistema para dar de alta al
    // usuario, así como aceptar registros de marcas
    // HU103: Modificar datos de
    // marcas
    // Como administrador poder editar y modificar los datos de los
    // marcas de la aplicación
    // HU104: Dar de baja marcas Como administrador quiero entrar en el sistema para dar de baja al
    // usuario
    // HU105: Listado de marcas Como administrador quiero obtener un listado de los marcas
    public static function getAllMarcas(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM marcas";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getMarcaByNombre($nombre){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM marcas WHERE nombre = " . $nombre;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarMarca($nombre, $correo, $contrasenya, $telefono){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO marcas (nombre, correo, contrasenya, telefono) VALUES ('$nombre', '$correo', '$contrasenya', $telefono)";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizarMarcas($nombre, $correo, $contacto){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE from marcas WHERE nombre = '$nombre', correo = '$correo', contacto = '$contacto'";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    public static function eliminarMarca($nombre){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM marcas WHERE nombre = " . $nombre;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}
?>