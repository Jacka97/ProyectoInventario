<?php
include "../modelo/dbConex.php";
class consultaRol{
    private $id;
    private $nombre;
    
    public static function getAllRoles(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Roles";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getRolByID($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Roles WHERE id = " . $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
   

}

?>