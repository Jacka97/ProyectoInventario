<?php
include '../modelo/consultaUsu.php'; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    header("Content-Type: application/json; charset=UTF-8");

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['correo']) || !isset($input['pass'])) {
        http_response_code(400);
        echo json_encode(["error" => "Correo y contraseña son requeridos"]);
        exit;
    }

    $correo = filter_var($input['correo'], FILTER_SANITIZE_EMAIL);
    $pass = $input['pass'];

    if (consultaUsu::logincheck($correo, $pass)) {
        $tipo = consultaUsu::getRolByCorreo($correo);
        echo json_encode(["success" => true, "message" => "Login exitoso"]);
        echo json_encode(["Rol" => $tipo]);
    } else {
        echo json_encode(["success" => false, "message" => "Correo o contraseña incorrectos"]);
    }
}
?>