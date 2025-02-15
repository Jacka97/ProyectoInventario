<?php

class conexionBD {

    private static $hostname = "127.0.0.1";
    private static $database = "inventario";
    // private static $database = "inventario";
    // private static $user = "inventarios"; 
    // private static $password = "Q00dIr[8R*x";  
    // private static $user = "phpmyadmin";
    // private static $password = "1234";
    private static $user = "root";
    private static $password = "";
   
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