<?php
include '../modelo/consultaUsu.php'; // Archivo para manejar las consultas de la base de datos.
// Configuración de CORS para permitir la comunicación con el cliente.
// Este código deja todos los encabezados de CORS habilitados para cualquier origen.
// En su lugar, puede establecer reglas más específicas según su necesidad.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            
            // Obtener un producto por ID.
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $product = consultaUsu::getUsuById($id);
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {
            
            // Obtener todos los pedidos.
            $products = consultaUsu::getAllUsu();
            echo json_encode($products);
        }
        break;

    case 'POST':
        header("Content-Type: application/json; charset=UTF-8");
        if (!empty($input) && isset($input['correo'], $input['pass'], $input['nombre'], $input['activo'], $input['id_rol'])) {
            // Crear un nuevo producto.
            $correo = $input['correo'];
            $contrasenya = $input['contrasenya'];
            $nombre = $input['nombre']; // Asegurar tipo numérico.

            $result = consultaUsu::altaUsu($correo, $contrasenya, $nombre, $activo, $id_rol);
            echo json_encode(["id" => $result]);
        } else {
            echo json_encode(["error" => "Datos inválidos"]);
        }
        break;

    case 'PUT':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $correo = $input['correo'];
            $contrasenya = $input['contrasenya'];
            $nombre = $input['nombre']; // Asegurar tipo numérico.
            $activo = $input['activo'];
            $rol = $input['id_rol'];
            $result = consultaUsu::modificarUsu($id,$correo, $contrasenya, $nombre, $activo, $rol);
            echo json_encode(["success" => $result]);

        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;


    case 'DELETE':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            // Eliminar un producto por ID.
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $result= consultaUsu::eliminarUsu($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
