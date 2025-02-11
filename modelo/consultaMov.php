<?php
include "../modelo/dbConex.php";
class consultaMove{

    public static function getAllMoves(){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Historico_Movimientos";
        $result = $conexion->query($sql); 
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function getMoveByID($id){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM Historico_Movimientos WHERE id = " . $id;
        $result = $conexion->query($sql); 
        $conexion->close();
        return $result->fetch_assoc();
    }
}
?>