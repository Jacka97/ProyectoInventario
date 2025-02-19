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
            $id = (int) $_GET['id']; // Asegurar que sea un entero válido
    
            // 🚀 Prueba si el ID está llegando bien
            error_log("ID recibido en GET: " . $id);
    
            $product = consultaSoft::getSoftPCById($id);
    
            // 🚀 Depuración: Verificar qué devuelve la función antes de hacer json_encode

    
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {
            $products = consultaSoft::getAllSoftwarePC();
            echo json_encode($products);
        }
        break;
    

        case 'POST':
            header("Content-Type: application/json; charset=UTF-8");
            if (!empty($input) && isset($input['idPC'], $input['idUbicacion'], $input['idSoftware'])) {
                $idPC = $input['idPC'];
                $idSoftware = $input['idSoftware'];
                $idUbicacion = $input['idUbicacion'];
        
                if($idPC != 0){
                    $result = consultaSoft::insertarSoftwarePC($idSoftware, $idPC); // Asegurar orden correcto
                }else{
                    $result = consultaSoft::insertarSoftwareUbicacion($idSoftware, $idUbicacion); // Asegurar orden correcto
                }
        
                if ($result) {
                    echo json_encode(["id" => $result]); // Devolver el ID insertado
                } else {
                    echo json_encode(["error" => "No se pudo insertar el software"]);
                }
            } else {
                echo json_encode(["error" => "Datos inválidos"]);
            }
            break;
        

            case 'PUT':
                header("Content-Type: application/json; charset=UTF-8");
                if (!empty($input) && isset($_GET['id'], $input['idPC'], $input['idSoftware'])) {
                    $id = (int) $_GET['id'];
                    $idPC = $input['idPC'];
                    $idSoftware = $input['idSoftware'];
            
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