<?php
include "../modelo/dbConex.php";
class consultaUbiMats{
    private $idUbicacion;
    private $nombre;
    private $tipo;

    public static function getAllMatsUbi($idUbicacion) {
        $conexion = conexionBD::conectar();
    
        // Consulta SQL con placeholders
        $sql = "SELECT 'Periferico' as tipo, nombre, idUbicacion from Perifericos WHERE idUbicacion = " .$idUbicacion. " UNION ALL SELECT 'Ordenador' as tipo, nombre, idUbicacion from Ordenadores WHERE idUbicacion = ". $idUbicacion." UNION ALL SELECT 'Dispositivo de Red' as tipo, nombre, idUbicacion from DispRed WHERE idUbicacion = ". $idUbicacion;

        // Ejecutar la consulta
            $result = $conexion->query($sql);
    
            // Cerrar la conexión
            $conexion->close();
    
    
        
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    

    public static function updateMatsUbi($idUbicacionActual, $idUbicacionNueva) {
        $conexion = conexionBD::conectar();
    
        // Iniciar transacción para asegurar que todas las actualizaciones se completen juntas
        $conexion->begin_transaction();
    
        try {
            
            // Actualizar Ordenadores
            $sql2 = "UPDATE Ordenadores SET idUbicacion = ? WHERE idUbicacion = ?";
            $stmt2 = $conexion->prepare($sql2);
            $stmt2->bind_param("ii", $idUbicacionNueva, $idUbicacionActual);
            $stmt2->execute();
            // Actualizar Periféricos
            $sql1 = "UPDATE Perifericos SET idUbicacion = ? WHERE idUbicacion = ?";
            $stmt1 = $conexion->prepare($sql1);
            $stmt1->bind_param("ii", $idUbicacionNueva, $idUbicacionActual);
            $stmt1->execute();
    
            
    
            // Actualizar Dispositivos de Red
            $sql3 = "UPDATE DispRed SET idUbicacion = ? WHERE idUbicacion = ?";
            $stmt3 = $conexion->prepare($sql3);
            $stmt3->bind_param("ii", $idUbicacionNueva, $idUbicacionActual);
            $stmt3->execute();
    
            // Confirmar la transacción
            $conexion->commit();
    
            // Cerrar declaraciones
            $stmt1->close();
            $stmt2->close();
            $stmt3->close();
            $conexion->close();
    
            return ["success" => true, "message" => "Ubicación actualizada correctamente"];
        } catch (Exception $e) {
            // Revertir transacción en caso de error
            $conexion->rollback();
            return ["success" => false, "message" => "Error al actualizar: " . $e->getMessage()];
        }
    }
    
    
    
}?>