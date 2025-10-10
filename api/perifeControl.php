<?php
include "../modelo/consultaPeriferico.php";
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
            $product = consultaPeriferico::getPerifericoById($id);
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {

            // Obtener todos los pedidos.
            $products = consultaPeriferico::getAllPerifericos();
            echo json_encode($products);
        }
        break;

    case 'POST':
        if (!empty($input)) {
            // Obtener los datos
            $nombre = isset($input['nombre']) ? $input['nombre'] : null;
            $numeroSerie = isset($input['numeroSerie']) ? $input['numeroSerie'] : null;
            $ordenador_id = isset($input['ordenador_id']) ? (int) $input['ordenador_id'] : null;
            $marca_id = isset($input['marca_id']) ? (int) $input['marca_id'] : null;
            $idUbicacion = isset($input['idUbicacion']) ? (int) $input['idUbicacion'] : null;
            $precio = isset($input['precio']) ? (float) $input['precio'] : null;

            // Manejar el caso especial de ordenador_id = -1
            if ($ordenador_id === -1) {
                $ordenador_id = null;
            }

            

            // Insertar en la base de datos
            $result = consultaPeriferico::insertarPeriferico($nombre, $numeroSerie, $ordenador_id, $marca_id, $idUbicacion, $precio);
            
            if ($result > 0) {
                echo json_encode(["success" => true, "id" => $result]);
            } else {
                echo json_encode(["error" => "Error al insertar el periférico"]);
            }
        } else {
            echo json_encode(["error" => "Datos inválidos"]);
        }
        break;

    case 'PUT':
        if (!empty($input) && isset($_GET['id'])) {
            $id = (int) $_GET['id']; // Obtener ID desde la URL
            $nombre = isset($input['nombre']) ? $input['nombre'] : null;
            $numeroSerie = isset($input['numeroSerie']) ? $input['numeroSerie'] : null;
            $ordenador_id = isset($input['ordenador_id']) ? (int) $input['ordenador_id'] : null;
            $marca_id = isset($input['marca_id']) ? (int) $input['marca_id'] : null;
            $idUbicacion = isset($input['idUbicacion']) ? (int) $input['idUbicacion'] : null;
            $precio = isset($input['precio']) ? (float) $input['precio'] : null;

            // Manejar el caso especial de ordenador_id = -1
            if ($ordenador_id === -1) {
                $ordenador_id = null;
            }

            // Validar ID
            if ($id <= 0) {
                echo json_encode(["error" => "ID inválido"]);
                exit();
            }

            // Llamar a la función para actualizar
            $result = consultaPeriferico::actualizarPeriferico($id, $nombre, $ordenador_id, $marca_id, $idUbicacion, $numeroSerie, $precio);

            if ($result > 0) {
                echo json_encode(["success" => true, "message" => "Periférico actualizado correctamente"]);
            } else {
                echo json_encode(["error" => "No se realizaron cambios o hubo un error", "data" => $result]);
            }
        } else {
            echo json_encode(["error" => "Datos inválidos o incompletos"]);
        }
        break;

    case 'PATCH':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            // Actualizar un producto por ID.
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $input = json_decode(file_get_contents('php://input'), true);

            // Extraer y sanitizar datos

            $idUbicacion = $input['idUbicacion'];
            $result = consultaPeriferico::actualizarUbicacion($id, $idUbicacion);
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
            $result = consultaPeriferico::eliminarPeriferico($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
