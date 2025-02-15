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
        header("Content-Type: application/json; charset=UTF-8");
        if (!empty($input)) {
            // Crear un nuevo producto.
            $nombre = isset($input['nombre']) ? $input['nombre'] : null;
            $ordenador_id = isset($input['ordenador_id']) ? (int) $input['ordenador_id'] : null;
            $marca_id = isset($input['marca_id']) ? (int) $input['marca_id'] : null;
            if ($input['ordenador_id'] == "-1") {
                $ordenador_id = 'null';
            } else {
                $ordenador_id = (int) $input['ordenador_id'];
            }
            $numeroSerie = isset($input['numeroSerie']);
            $idUbicacion = isset($input['idUbicacion']) ? (int) $input['idUbicacion'] : null;
            $precio = isset($input['precio']) ? (float) $input['precio'] : null;

            $result = consultaPeriferico::insertarPeriferico($nombre, $numeroSerie, $ordenador_id, $marca_id, $idUbicacion, $precio);
            echo json_encode(["id" => $result]);
        } else {
            echo json_encode(["error" => "Datos inválidos"]);
        }
        break;
        // $nombre, $ordenador_id, $marca,  $precio, $fechaCompra

    case 'PUT':
        header("Content-Type: application/json; charset=UTF-8");

        // Verificar que el JSON se haya recibido correctamente
        if (!empty($input) && isset($_GET['id'])) {
            $id = (int) $_GET['id']; // ID desde el JSON
            $nombre = isset($input['nombre']) ? $input['nombre'] : null;
            $ordenador_id = isset($input['ordenador_id']) ? (int) $input['ordenador_id'] : null;
            $marca_id = isset($input['marca_id']) ? (int) $input['marca_id'] : null;
            if ($input['ordenador_id'] == "-1") {
                $ordenador_id = 'null';
            } else {
                $ordenador_id = (int) $input['ordenador_id'];
            }

            $idUbicacion = isset($input['idUbicacion']) ? (int) $input['idUbicacion'] : null;
            $precio = isset($input['precio']) ? (float) $input['precio'] : null;

            // Validar que el ID sea válido
            if ($id <= 0) {
                echo json_encode(["error" => "ID inválido"]);
                exit();
            }

            // Llamar a la función para actualizar
            $result = consultaPeriferico::actualizarPeriferico($id, $nombre, $ordenador_id, $marca_id, $idUbicacion, $precio);

            // Verificar si la actualización fue exitosa
            if ($result) {
                echo json_encode(["success" => true, "message" => "Periférico actualizado correctamente"]);
            } else {
                echo json_encode(["error" => "Error al actualizar el periférico", "data" => $result]);
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
