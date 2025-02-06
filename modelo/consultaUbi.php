<?php
include "../modelo/dbConex.php";
class consultaUbicacion{
    private $id;
    private $nombre;
    public static function getAllAulas(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Ubicaciones";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getAulaByNombre($nombre){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Ubicaciones WHERE nombre = " . $nombre;
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }

    public static function modificarAula($id, $nombre){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Ubicaciones SET nombre = '$nombre' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    
    public static function insertarAula($nombre){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Ubicaciones (nombre) VALUES ('$nombre')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function eliminarAula($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Ubicaciones WHERE id = " . $id;
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }

}
?>