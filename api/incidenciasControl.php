<?php
include '../modelo/modelIncidencias.php';
include '../modelo/enviarEmail.php';
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
            $id = (int) $_GET['id'];
            $product = modelIncidencias::getIncidenciaByID($id);
            echo json_encode($product ?: ["error" => "Producto no encontrado"]);
        } else {

            // Obtener todos los pedidos.
            $products = modelIncidencias::getAllIncidencias();
            echo json_encode($products);
        }
        break;

    case 'POST':
        header("Content-Type: application/json; charset=UTF-8");
        $tecnico = modelIncidencias::getTecnicoMenosIncidencias(); //busco al técnico que se le va a asignar la incidencia

        if (!empty($input) && isset($input['idUbicacion'], $input['asunto'], $input['descripcion'], $input['estado'], $input['emailUsuario'] )) {

            // Extraer datos del JSON recibido
            $idTecnico = $tecnico['idTecnico'];
            $idUbicacion = $input['idUbicacion'];
            $asunto = $input['asunto'];
            $descripcion = $input['descripcion'];
            $estado = $input['estado'];
            $emailUsuario=$input['emailUsuario']; //recibe el email del usuario que crea la incidencia                 


            // Llamar a la función para insertar el ordenador
            $result = modelIncidencias::altaIncidencia($idTecnico, $idUbicacion, $asunto, $descripcion, $estado);

            if ($result) {
                //si se crea la incidencia se informa por correo al técnico que la va a gestionar y al usuario que la creó
                //$enviadoEmail=enviarEmail::enviarCorreo( $tecnico['correo'],$emailUsuario,$asunto,$incidencia);
                echo json_encode(["id" => $result]);
            } else {
                echo json_encode(["error" => "No se pudo crear la incidencia"]);
            }
        } else {
            echo json_encode(["error" => "Datos inválidos o incompletos"]);
        }
        break;

    case 'PUT':
        header("Content-Type: application/json; charset=UTF-8");

        if (!empty($input) && isset($input['id'], $input['idTecnico'], $input['idUbicacion'], $input['asunto'], $input['descripcion'], $input['estado'])) {

            // Extraer y sanitizar datos
            $id = (int) $input['id'];
            $idTecnico = $input['idTecnico'];
            $idUbicacion = $input['idUbicacion'];
            $asunto = $input['asunto'];
            $descripcion = $input['descripcion'];
            $estado = $input['estado'];
            
            // Llamar a la función de actualización
            $result = modelIncidencias::modificarIncidencia($id, $idTecnico, $idUbicacion, $asunto, $descripcion, $estado);

            // Verificar el resultado
            if ($result) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "No se pudo actualizar la incidencia"]);
            }
        } else {
            echo json_encode(["error" => "Datos inválidos o incompletos"]);
        }
        break;

    case 'PATCH':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            // Actualizar una incidencia por ID.
            $id = (int) $_GET['id'];
            $input = json_decode(file_get_contents('php://input'), true);

            // Extraer y sanitizar datos

            $estado = $input['estado'];
            $result = modelIncidencias::actualizarEstado($id, $estado);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;


    case 'DELETE':
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_GET['id'])) {
            // Eliminar una incidencia por ID
            $id = (int) $_GET['id']; // Sanitizar el ID.
            $result = modelIncidencias::eliminarIncidencia($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
