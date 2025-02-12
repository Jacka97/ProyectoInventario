<?php
include "../modelo/dbConex.php";
class consultaPeriferico{
    private $id;
    private $nombre;
    private $ordenador_id;
    private $marca;
    private $precio;
    private $idUbicacion;

    public static function getAllPerifericos(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Perifericos";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);   
}

    public static function getPerifericoById($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Perifericos WHERE id = $id";
        $result = $conexion->query($sql);
        $conexion->close();
        return $result->fetch_assoc();
    }
    
    public static function insertarPeriferico($nombre, $ordenador_id, $marca, $idUbicacion, $precio){
        $conexion = conexionBD::conectar();
        
        $sql = "INSERT INTO Perifericos (nombre, ordenador_id, marca_id, idUbicacion, precio) VALUES ('$nombre', '$ordenador_id','$marca', '$idUbicacion', '$precio')";
        var_dump($sql);
        $conexion->query($sql);
        
        return $conexion->insert_id;
        $conexion->close();
        
    }
    public static function actualizarPeriferico($id, $nombre, $ordenador_id, $marca_id, $idUbicacion,  $precio){
        $conexion = conexionBD::conectar();
        $sql = "UPDATE Perifericos SET nombre = '$nombre', ordenador_id = '$ordenador_id', marca_id = '$marca_id', idUbicacion = '$idUbicacion', precio = '$precio' WHERE id = '$id';";
        var_dump($sql);
        $conexion->query($sql);
        return $conexion->affected_rows;  // devuelve el número de filas afectadas por la operación SQL. 0 si no se realizó ninguna actualización. 1 si se realizó una actualización. 2 si se realizó una actualización en más de una fila.  -1 si se produjo un error.  -2 si se produjo un error de sintaxis.  -3 si se produ
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