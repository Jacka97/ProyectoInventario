<?php
include '../modelo/consultaOrd.php'; // Archivo para manejar las consultas de la base de datos.
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
            $product = consultaOrdenadores::getOrdenadorByID($id);
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {
            
            // Obtener todos los pedidos.
            $products = consultaOrdenadores::getAllOrdenadores();
            echo json_encode($products);
        }
        break;

        case 'POST':
            header("Content-Type: application/json; charset=UTF-8");
        
            if (!empty($input) && isset($input['nombre'], $input['idMarca'], $input['modelo'], $input['idUbicacion'], $input['tipo'], $input['numeroSerie'], $input['Red'], $input['MACLAN'], $input['IPLAN'], $input['MACWIFI'], $input['IPWIFI'], $input['HD1'], $input['HD2'], $input['Observaciones'], $input['precio'])) {
                
                // Extraer datos del JSON recibido
                $nombre = $input['nombre'];
                $idMarca = $input['idMarca'];
                $modelo = $input['modelo'];
                $idUbicacion = $input['idUbicacion'];
                $tipo = $input['tipo'];
                $numeroSerie = $input['numeroSerie'];
                $red = $input['Red'];
                $MACLAN = $input['MACLAN'];
                $IPLAN = $input['IPLAN'];
                $MACWIFI = $input['MACWIFI'];
                $IPWIFI = $input['IPWIFI'];
                $HD1 = $input['HD1'];
                $HD2 = $input['HD2'];
                $observaciones = $input['Observaciones'];
                $precio = (float) $input['precio'];
                $numero = $input['numero'];
        
                // Llamar a la función para insertar el ordenador
                $result = consultaOrdenadores::altaOrdenador($numero, $idMarca, $modelo, $idUbicacion, $nombre, $tipo, $numeroSerie, $red, $MACLAN, $IPLAN, $MACWIFI, $IPWIFI, $HD1, $HD2, $observaciones, $precio);
        
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
            
                if (!empty($input) && isset($input['id'], $input['numero'], $input['idMarca'], $input['modelo'], $input['idUbicacion'], $input['nombre'], $input['tipo'], $input['numeroSerie'], $input['Red'], $input['MACLAN'], $input['IPLAN'], $input['MACWIFI'], $input['IPWIFI'], $input['HD1'], $input['HD2'], $input['Observaciones'], $input['precio'])) {
                    
                    // Extraer y sanitizar datos
                    $id = (int) $input['id'];
                    $nombre = $input['nombre'];
                    $idMarca = $input['idMarca'];
                    $modelo = $input['modelo'];
                    $idUbicacion = $input['idUbicacion'];
                    $tipo = $input['tipo'];
                    $numeroSerie = $input['numeroSerie'];
                    $red = $input['Red'];
                    $MACLAN = $input['MACLAN'];
                    $IPLAN = $input['IPLAN'];
                    $MACWIFI = $input['MACWIFI'];
                    $IPWIFI = $input['IPWIFI'];
                    $HD1 = $input['HD1'];
                    $HD2 = $input['HD2'];
                    $observaciones = $input['Observaciones'];
                    $precio = (float) $input['precio'];
                    $numero = $input['numero'];
            
                    // Llamar a la función de actualización
                    $result = consultaOrdenadores::modificarOrdenador($id, $numero, $idMarca, $modelo, $idUbicacion, $nombre, $tipo, $numeroSerie, $red, $MACLAN, $IPLAN, $MACWIFI, $IPWIFI, $HD1, $HD2, $observaciones, $precio);
            
                    // Verificar el resultado
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
            $result= consultaOrdenadores::eliminarOrdenador($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
