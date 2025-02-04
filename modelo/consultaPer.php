<?php
include "./dbConex.php";
class consultaPeriferico{
    private $id;
    private $nombre;
    private $ordenador_id;
    private $marca;
    private $precio;
    private $fechaCompra;

    public static function getAllPerifericos(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Perifericos";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getPerifericoById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Perifericos WHERE id_producto = $id";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarPeriferico($nombre, $ordenador_id, $marca,  $precio, $fechaCompra){
        $conexion = conexionBD::conectar();
        $sql = "INSERT INTO Perifericos (nombre, ordenador_id, marca, precio, fechaCompra) VALUES ('$nombre', '$ordenador_id','$marca', '$precio', $fechaCompra)";
        $conexion->query($sql);
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizarPeriferico($id, $nombre, $ordenador_id, $marca,  $precio, $fechaCompra){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Perifericos SET nombre = '$nombre', ordenador_id = '$ordenador_id', marca = '$marca', $precio = '$fechaCompra' WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
    }
    public static function eliminarPeriferico($id){
        $conexion = conexionBD::conectar();
        $sql = "DELETE FROM Perifericos WHERE id = $id";
        $conexion->query($sql);
        return $conexion->affected_rows;
        $conexion->close();
        
    }

}
?>