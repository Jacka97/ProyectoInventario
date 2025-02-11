<?php
include '../modelo/consultaRed.php';
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
            $product = consultaDispoRed::getDispRedById($id);
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {

            // Obtener todos los pedidos.
            $products = consultaDispoRed::getAllDispRed();
            echo json_encode($products);
        }
        break;

    case 'POST':
        header("Content-Type: application/json; charset=UTF-8");

        if (!empty($input)) {
            $nombre = isset($input['nombre']) ? $input['nombre'] : null;
            $idMarca = isset($input['idMarca']) ? (int) $input['idMarca'] : null;
            $modelo = isset($input['modelo']) ? $input['modelo'] : null;
            $idUbicacion = isset($input['idUbicacion']) ? $input['idUbicacion'] : null;
            $red = isset($input['Red']) ? $input['Red'] : null;
            $macWifi = isset($input['MACWIFI']) ? $input['MACWIFI'] : null;
            $ipWifi = isset($input['IPWIFI']) ? $input['IPWIFI'] : null;
            $macLAN = isset($input['MACLAN']) ? $input['MACLAN'] : null;
            $ipLan = isset($input['IPLAN']) ? $input['IPLAN'] : null;
            $tipoConexion = isset($input['tipoConexion']) ? $input['tipoConexion'] : null;
            $tipoDisp = isset($input['tipoDisp']) ? $input['tipoDisp'] : null;
            $observaciones = isset($input['Observable']) ? $input['Observaciones'] : null;
            $precio = isset($input(['precio'])) ? $input['precio'] : null;


            $result = consultaDispoRed::insertarDisRed($nombre, $idUbicacion, $idMarca, $modelo, $red, $macWifi, $ipWifi, $macLAN, $ipLAN, $tipoConexion, $tipoDisp, $observaciones, $precio);

            if ($result) {
                echo json_encode(["id" => $result]);
            } else {
                echo json_encode(["error" => "No se pudo crear el ordenador"]);
            }
        } else {
            echo json_encode(["error" => "Datos inválidos o incompletos"]);
        }
        break;

    case 'PUT':
        header("Content-Type: application/json; charset=UTF-8");

        if (!empty($input) && isset($_GET['id'])) {
            $id = $_GET['id'];
            $nombre = isset($input['nombre']) ? $input['nombre'] : null;
            $idMarca = isset($input['idMarca']) ? (int) $input['idMarca'] : null;
            $modelo = isset($input['modelo']) ? $input['modelo'] : null;
            $idUbicacion = isset($input['idUbicacion']) ? $input['idUbicacion'] : null;
            $red = isset($input['Red']) ? $input['Red'] : null;
            $macWifi = isset($input['MACWIFI']) ? $input['MACWIFI'] : null;
            $ipWifi = isset($input['IPWIFI']) ? $input['IPWIFI'] : null;
            $macLAN = isset($input['MACLAN']) ? $input['MACLAN'] : null;
            $ipLan = isset($input['IPLAN']) ? $input['IPLAN'] : null;
            $tipoConexion = isset($input['tipoConexion']) ? $input['tipoConexion'] : null;
            $tipoDisp = isset($input['tipoDisp']) ? $input['tipoDisp'] : null;
            $observaciones = isset($input['Observable']) ? $input['Observaciones'] : null;
            $precio = isset($input(['precio'])) ? $input['precio'] : null;

            $result = consultaDispoRed::actualizarDispositivoRed($id, $nombre, $idUbicacion, $idMarca, $modelo, $red, $macWifi, $ipWifi, $macLAN, $ipLAN, $tipoConexion, $tipoDisp, $observaciones, $precio);

            if ($result) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "No se pudo actualizar el ordenador"]);
            }
        } else {
            echo json_encode(["error" => "Datos inválidos o incompletos"]);
        }
        break;

    case 'DELETE':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            // Eliminar un producto por ID.
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $result = consultaDispoRed::eliminarDisRed($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
