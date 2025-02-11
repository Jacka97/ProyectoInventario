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

        if (!empty($input) &&  isset($input['nombre'], $input['idUbicacion'], $input['idMarca'], $input['modelo'], $input['Red'], $input['MACWIFI'], $input['IPWIFI'], $input['MACLAN'], $input['IPLAN'], $input['tipoConexion'], $input['tipoDisp'], $input['Observaciones'], $input['precio'])) {
            $nombre = $input['nombre'];
            $idMarca = $input['idMarca'];
            $modelo = $input['modelo'];
            $idUbicacion = $input['id_ubicacion'];
            $red = $input['Red'];
            $macWifi = $input['MACWIFI'];
            $ipWifi = $input['IPWIFI'];
            $macLAN = $input['MACLAN'];
            $ipLan = $input['IPLAN'];
            $tipoConexion = $input['tipoConexion'];
            $tipoDisp = $input['tipoDisp'];
            $observaciones = $input['Observaciones'];
            $precio = $input['precio'];


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

        if (!empty($input) &&  isset($_GET['id'], $input['nombre'], $input['idUbicacion'], $input['idMarca'], $input['modelo'], $input['Red'], $input['MACWIFI'], $input['IPWIFI'], $input['MACLAN'], $input['IPLAN'], $input['tipoConexion'], $input['tipoDisp'], $input['Observaciones'], $input['precio'])) {
            $id = $_GET['id'];
            $nombre = $input['nombre'];
            $idMarca = $input['idMarca'];
            $modelo = $input['modelo'];
            $idUbicacion = $input['id_ubicacion'];
            $red = $input['Red'];
            $macWifi = $input['MACWIFI'];
            $ipWifi = $input['IPWIFI'];
            $macLAN = $input['MACLAN'];
            $ipLan = $input['IPLAN'];
            $tipoConexion = $input['tipoConexion'];
            $tipoDisp = $input['tipoDisp'];
            $observaciones = $input['Observaciones'];
            $precio = $input['precio'];

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
