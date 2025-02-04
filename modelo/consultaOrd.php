<?php
include "../modelo/dbConex.php";
class consultaOrdenadores{
    private $id;
    private $nombre;
    private $ubicacion;
    private $marca;
    private $precio;
    private $fechaCompra;
    
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
    public static function altaOrdenador($nombre, $ubicacion, $marca, $precio, $fechaCompra){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Ordenadores (nombre, ubicacion, marca, precio, fechaCompra) VALUES ('$nombre', '$ubicacion', '$marca', '$precio', '$fechaCompra')";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function modificarOrdenador($id, $nombre, $ubicacion, $marca, $precio, $fechaCompra){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Ordenadores SET nombre = '$nombre', ubicacion = '$ubicacion', marca = '$marca' precio = '$precio', fechaCompra = $fechaCompra WHERE id = $id";
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