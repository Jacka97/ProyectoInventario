<?php
include "../modelo/dbConex.php";
class consultaSoft{
    private $id;
    private $idPC;
    private $idSoft;
    
    public static function getAllSoftwarePC(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT Software_PC.*, Software.nombre as softnombre, Ordenadores.nombre as pcnombre from Software_PC 
            left join Software on Software.id = Software_PC.idSoftware 
            left join Ordenadores on Ordenadores.id = Software_PC.idPC";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
    }

public static function getSoftPCById($id) {
    $conexion = conexionBD::conectar();
    $sql = "SELECT Software_PC.id, Software_PC.*, Software.nombre as softnombre, Ordenadores.nombre as pcnombre 
            FROM Software_PC 
            LEFT JOIN Software ON Software.id = Software_PC.idSoftware 
            LEFT JOIN Ordenadores ON Ordenadores.id = Software_PC.idPC 
            WHERE Software_PC.id = ?";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();


    $stmt->close();
    $conexion->close();
    
    return $data ?: ["error" => "Registro no encontrado"];
}

    
    public static function insertarSoftwarePC($idSoft, $idPC){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Software_PC (idSoftware, idPC) VALUES ('$idSoft', '$idPC')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }

    
    public static function insertarSoftwareUbicacion($idSoft, $idUbicacion){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Software_PC (idSoftware, idPC)
            SELECT Ordenadores.id, '$idSoft'
            FROM Ordenadores
            WHERE Ordenadores.idUbicacion = $idPC;
            ";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }

    public static function modificarSoftwPC($id, $idPC, $idSoft){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Software_PC SET idPC = '$idPC', idSoftware = '$idSoft' WHERE id = " . $id;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    public static function eliminarSoftwarePC($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Software_PC WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }

}
?>