<?php
include '../modelo/consultaMar.php'; // Archivo para manejar las consultas de la base de datos.
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
        if (!empty($input) && isset($input['nombre'], $input['descripcion'], $input['precio'])) {
            // Crear un nuevo producto.
            $nombre = $input['nombre'];
            $descripcion = $input['descripcion'];
            $precio = (float) $input['precio']; // Asegurar tipo numérico.

            $result = consultaUsu::insertar($nombre, $correo, $telefono, $contrasenya);
            echo json_encode(["id" => $result]);
        } else {
            echo json_encode(["error" => "Datos inválidos"]);
        }
        break;

    case 'PUT':
        header("Content-Type: application/json; charset=UTF-8");
    case 'PATCH':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            $id = (int) $_GET['id']; // Sanitizar el ID.
 

            if ($input) {
                // Construir la consulta dinámicamente
                $fields = [];
                if (isset($input['nombre'])) {
                    $fields[] = "nombre='" . $conexion->real_escape_string($input['nombre']) . "'";
                }
                if (isset($input['correo'])) {
                    $fields[] = "correo='" . $conexion->real_escape_string($input['correo']) . "'";
                }
                if (isset($input['telefono'])) {
                    $fields[] = "telefono=" . $input['telefono'];
                }

                if (isset($input['contrasenya'])) {
                    $fields[] = "contrasenya=" . $input['contrasenya'];
                }

                // Ejecutar la consulta solo si hay campos a actualizar
                if (!empty($fields)) {
                    $query = "UPDATE usuarios SET " . implode(', ', $fields) . " WHERE id_Usu = $id";
                    $result = consultaUsu::actualizar($query);

                    echo json_encode(["success" => $result]);
                } else {
                    echo json_encode(["error" => "No se proporcionaron campos válidos para actualizar"]);
                }
            } else {
                echo json_encode(["error" => "Datos de entrada no válidos"]);
            }
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
