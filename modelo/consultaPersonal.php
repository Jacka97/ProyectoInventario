<?php
include "../modelo/dbConex.php";
class consultaPersonal{
    private $id;
    private $correo;
    private $contrasenya;
    private $nombre;
    private $activo = true;  // por defecto el usuario está activo
    private $rol = null;
   
    public static function getAllPersonal(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Usuarios WHERE id_rol = 2";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}
}
?>