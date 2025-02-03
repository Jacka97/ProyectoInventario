<?php

class conexionBD {

    private static $hostname = "127.0.0.1";
    private static $database = "Pruebas";
    private static $user = "phpmyadmin";
    private static $password = "1234";

    public static function conectar(){
        try {
            $conexion = new mysqli(self::$hostname, self::$user, self::$password, self::$database);    
            
        } catch (mysqli_sql_exception $error) {
            
            echo "¡ERROR: !".$error->getMessage();
            die();
            
        }
        
        return $conexion;
    }

    public static function cerrarConexion($conexion){
        $conexion->close();
    }
}

?>