<?php
include '../modelo/consultaUsu.php'; // Archivo para manejar las consultas de la base de datos.
// Configuración de CORS para permitir la comunicación con el cliente.
// Este código deja todos los encabezados de CORS habilitados para cualquier origen.
// En su lugar, puede establecer reglas más específicas según su necesidad.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

if($method === 'GET') {
    header("Content-Type: application/json; charset=UTF-8");
    if (isset($_GET['correo']) && isset($_GET['pass'])){
        $correo = $_GET['correo'];
        $pass = $_GET['pass'];
        $datos = consultaUsu::logincheck($correo, $pass);
        echo json_encode($datos);
        break;

    }

}else{
    echo json_encode(["error" => "Método no soportado"]);
}


?>