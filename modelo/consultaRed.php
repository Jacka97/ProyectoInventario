<?php
include "./dbConex.php";
class consultaDispoRed{
    private $id;
    private $nombre;
    private bool $instalado = false;
    private $ip = null;
    private $id_ubicacion = null;
    public static function getAllDispRed(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM usuarios";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getDispRedById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM DispositivosRed WHERE id = $id";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarDisRed($nombre, $instalado, $ip, $id_ubicacion){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO DispositivosRed (nombre, instalado, ip, id_ubicacion) VALUES ('$nombre', '$instalado', '$ip', $id_ubicacion)";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizarDispositivoRed($id, $nombre, $instalado, $ip, $id_ubicacion){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE DispositivoRed SET nombre = '$nombre', instalado = '$instalado', ip = '$ip', id_ubicacion = '$id_ubicacion' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    public static function eliminarDisRed($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM DispositivoRed WHERE id_usu = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}
?>