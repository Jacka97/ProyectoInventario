<?php
include '../modelo/consultaSoftwarePC.php'; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            
            // Obtener un producto por ID.
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $product = consultaSoft::getSoftPCById($id);
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {
            
            // Obtener todos los pedidos.
            $products = consultaSoft::getAllSoftwarePC();
            echo json_encode($products);
        }
        break;

    case 'POST':
        header("Content-Type: application/json; charset=UTF-8");
        if (!empty($input) && isset($input['idPC'], $input['idSoftware'])) {
            // Crear un nuevo producto.
            $idPC = $input['idPC'];
            $idSoftware = $input['idSoftware'];
           

            $result = consultaSoft::insertarSoftwarePC($idPC, $idSoftware);
            echo json_encode(["id" => $result]);
        } else {
            echo json_encode(["error" => "Datos inválidos"]);
        }
        break;

    case 'PUT':
            header("Content-Type: application/json; charset=UTF-8");
            if (!empty($input) && isset($_GET['id'], $input['idPC'], $input['idSoftware'])) {
                // Modificar un producto por ID.
                $id = $_GET['id'];
                $idPC = $input['idPC'];
                $idSoftware = $input['idSoftware'];
                $icPC = $input['idPC'];
    
                $result = consultaSoft::modificarSoftwPC($id, $idPC, $idSoftware);
                echo json_encode(["success" => $result]);
            } else {
                echo json_encode(["error" => "ID y/o datos inválidos"]);
            }
            break;


    case 'DELETE':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            // Eliminar un producto por ID.
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $result= consultaSoft::eliminarSoftwarePC($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
?>