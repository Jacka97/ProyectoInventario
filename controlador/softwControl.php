<?php
include '../modelo/consultaSoft.php'; // Archivo para manejar las consultas de la base de datos.
// Configuración de CORS para permitir la comunicación con el cliente.
// Este código deja todos los encabezados de CORS habilitados para cualquier origen.
// En su lugar, puede establecer reglas más específicas según su necesidad.
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
            $product = consultaSoft::getSoftById($id);
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {
            
            // Obtener todos los pedidos.
            $products = consultaSoft::getAllSoftware();
            echo json_encode($products);
        }
        break;

    case 'POST':
        header("Content-Type: application/json; charset=UTF-8");
        if (!empty($input) && isset($input['nombre'], $input['descripcion'], $input['precio'])) {
            // Crear un nuevo producto.
            $nombre = $input['nombre'];
            $descripcion = $input['descripcion'];
            $precio = (float) $input['precio']; // Asegurar tipo numérico.

            $result = consultaSoft::insertarSoftware($id, $nombre, $precio, $clave);
            echo json_encode(["id" => $result]);
        } else {
            echo json_encode(["error" => "Datos inválidos"]);
        }
        break;

    case 'PUT':
            header("Content-Type: application/json; charset=UTF-8");
            if (!empty($input) && isset($input['id'])) {
                // Modificar un producto por ID.
                $id = (int) $input['id']; // Sanitizar el ID.
                $nombre = $input['nombre'];
    
                $result = consultaSoft::modificarSoftw($id, $nombre, $precio, $clave);
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
            $result= consultaSoft::eliminarSoftware($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
