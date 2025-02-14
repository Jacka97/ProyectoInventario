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

    public static function getMoveBeetweenDates($tipo, $fechamin, $fechamax){
        $conexion = conexionBD::conectar();
        $sql = "SELECT * FROM `Historico_Movimientos` WHERE `TipoMovimiento` = '$tipo'";

        if (!is_null($fechamin)) {
            $sql .= " AND `fecha` >= '$fechamin'";
        }

        if (!is_null($fechamax)) {
            $sql .= " AND `fecha` <= '$fechamax'";
        }

        $result = $conexion->query($sql); 
        $conexion->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>