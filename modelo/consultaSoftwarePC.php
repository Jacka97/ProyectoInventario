<?php
include "../modelo/dbConex.php";
class consultaSoft{
    
    public static function getAllSoftwarePC(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT Software_PC.*, Software.nombre as softnombre, Ordenadores.nombre as pcnombre from Software_PC 
            left join Software on Software.id = Software_PC.idSoftware 
            left join Ordenadores on Ordenadores.id = Software_PC.idPC";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getSoftPCById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT Software_PC.*, Software.nombre as softnombre, Ordenadores.nombre as pcnombre from Software_PC 
            left join Software on Software.id = Software_PC.idSoftware 
            left join Ordenadores on Ordenadores.id = Software_PC.idPC WHERE id = " . $id;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarSoftwarePC($idSoft, $idPC){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Software_PC (idSoftware, idPC) VALUES ('$idSoft', '$idPC')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarSoftwPC($idSoft){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Software_PC SET idSoftware = '$idSoft' WHERE idSoftware = " . $idSoft;
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