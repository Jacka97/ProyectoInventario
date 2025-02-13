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

        /*
        evita inyeccion sql

            $sql = "SELECT * FROM `Historico_Movimientos` WHERE `TipoMovimiento` = :tipo";
            $params = [':tipo' => $tipo];

            if (!is_null($fechamin)) {
                $sql .= " AND `fecha` >= :fechamin";
                $params[':fechamin'] = $fechamin;
            }

            if (!is_null($fechamax)) {
                $sql .= " AND `fecha` < :fechamax";
                $params[':fechamax'] = $fechamax;
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        */
    }
}
?>