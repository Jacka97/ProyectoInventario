<?php
include "./dbConex.php";
class consultaDispoRed{
    private $id;
    private $nombre;
    private $idUbicacion;
    private $idMarca;
    private $modelo;
    private $red;
    private $macWifi;
    private $ipWifi;
    private $macLAN;
    private $ipLAN;
    private $tipoConexion;
    private $tipoDisp;
    private $observaciones;
    private $precio;
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
    
    public static function insertarDisRed($nombre, $idUbicacion, $idMarca, $modelo, $red, $macWifi, $ipWifi, $macLAN, $ipLAN, $tipoConexion, $tipoDisp, $observaciones, $precio){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO DispositivosRed (nombre, instalado, ip, id_ubicacion) VALUES ('$nombre', '$idUbicacion', '$idMarca', '$modelo', '$red', '$macWifi', '$ipWifi, '$macLAN', '$ipLAN', '$tipoConexion', '$tipoDisp', '$observaciones', '$precio')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizarDispositivoRed($id, $nombre, $idUbicacion, $idMarca, $modelo, $red, $macWifi, $ipWifi, $macLAN, $ipLAN, $tipoConexion, $tipoDisp, $observaciones, $precio){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE DispositivoRed SET nombre = '$nombre', idUbicacion = '$idUbicacion', idMarca = '$idMarca', modelo = '$modelo', Red = '$red', MACWIFI = '$macWifi', IPWIFI = '$ipWifi', MACLAN = '$macLAN', IPLAN = '$ipLAN', tipoConexion = '$tipoConexion', tipoDisp = '$tipoDisp', observable = '$observaciones', precio = '$precio' WHERE id = $id";
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