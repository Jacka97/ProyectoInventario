<?php
include '../modelo/consultaMove.php'; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['tipo'])) {

            $tipo = $_GET['tipo'];
            $fechamin = isset($_GET['fechamin']) ? $_GET['fechamin'] : null;
            $fechamax = isset($_GET['fechamax']) ? $_GET['fechamax'] : null;
            
            // Obtener un producto entre dos fechas y por su tipo
            $product = consultaMove::getMoveBeetweenDates($tipo, $fechamin, $fechamax);
            echo json_encode($product ?: ["error" => "No hay registros"]);
        } else {
            
            // Obtener todos los pedidos.
            $products = consultaMove::getAllMoves();
            echo json_encode($products);
        }
        break;

    
    }