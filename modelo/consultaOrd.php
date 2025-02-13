<?php
include "../modelo/dbConex.php";
class consultaOrdenadores{
    private $id;
    private $numero;
    private $idMarca;
    private $modelo;
    private $idUbicacion;
    private $nombre;
    private $tipo;
    private $numeroSerie;
    private $red;
    private $MACLAN;
    private $IPLAN;
    private $MACWIFI;
    private $IPWIFI;
    private $HD1;
    private $HD2;
    private $observaciones;
    private $precio;
    
    public static function getAllOrdenadores(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Ordenadores";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getOrdenadorByID($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Ordenadores WHERE id = " . $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    public static function altaOrdenador( $numero, $idMarca, $modelo, $idUbicacion, $nombre, $tipo,$numeroSerie,$red,$MACLAN,$IPLAN,$MACWIFI,$IPWIFI,$HD1,$HD2,$observaciones, $precio){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Ordenadores (numero, idMarca, modelo, idUbicacion, nombre, tipo, numeroSerie, Red, MACLAN, IPLAN, MACWIFI, IPWIFI, HD1, HD2, Observaciones, precio) VALUES ( '$numero','$idMarca','$modelo','$idUbicacion','$nombre','$tipo','$numeroSerie','$red', '$MACLAN', '$IPLAN', '$MACWIFI', '$IPWIFI', '$HD1', '$HD2', '$observaciones', '$precio')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarOrdenador($id, $numero, $idMarca, $modelo, $idUbicacion, $nombre, $tipo,$numeroSerie,$red,$MACLAN,$IPLAN,$MACWIFI,$IPWIFI,$HD1,$HD2,$observaciones, $precio){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Ordenadores SET numero = '$numero', idMarca = '$idMarca', modelo = '$modelo', idUbicacion = '$idUbicacion', nombre = '$nombre', tipo = '$tipo', numeroSerie = '$numeroSerie', Red = '$red', MACLAN = '$MACLAN', IPLAN = '$IPLAN', MACWIFI = '$MACWIFI', IPWIFI = '$IPWIFI', HD1 = '$HD1', HD2 = '$HD2', Observaciones = '$observaciones' , precio = '$precio' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
    public static function actualizarUbicacion($id, $idUbicacion){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Ordenadores SET idUbicacion = '$idUbicacion' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
 
    }
   
    public static function eliminarOrdenador($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Ordenadores WHERE id = " . $id;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }
}

?>