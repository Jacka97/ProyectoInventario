<?php
include "../modelo/consultaUbiMats.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");


// Verificar conexión
if ($conexion->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conexion->connect_error]));
}

// Verificar método HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method == "GET") {
    //  OBTENER TODOS LOS MATERIALES POR UBICACIÓN
    if (isset($_GET['idUbicacion'])) {
        $idUbicacion = $_GET['idUbicacion'];
    $data = consultaUbiMats::getAllMatsUbi($idUbicacion);
    echo json_encode($data ?: ["error" => "Ubicacion no encontrada"]);
    } else {
        echo json_encode(["error" => "Falta el parámetro id"]);
    }
} 

elseif ($method == "PUT") {
    //  ACTUALIZAR UBICACIÓN DE TODOS LOS MATERIALES
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['idUbicacionActual']) && isset($data['idUbicacionNueva'])) {
        $idUbicacionActual = $data['idUbicacionActual'];
        $idUbicacionNueva = $data['idUbicacionNueva'];
        if ($idUbicacionActual == $idUbicacionNueva) {
            echo json_encode(["error" => "La ubicación actual y la nueva son iguales"]);
            exit;
        }

        $data = consultaUbiMats::updateMatsUbi($idUbicacionActual, $idUbicacionNueva);
            echo json_encode(["success" => true, "message" => "Ubicación actualizada correctamente"]);
        
        
    } else {
        echo json_encode(["error" => "Faltan parámetros en la solicitud"]);
    }
} 

else {
    // Si el método no es GET ni PUT
    echo json_encode(["error" => "Método no permitido"]);
}

?>
