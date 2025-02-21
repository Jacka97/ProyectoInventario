<?php

require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class enviarEmail
{
    
public static function enviarCorreo($email_tecnico, $email_usuario, $asunto,$incidencia) {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp-mail.outlook.com'; // Servidor SMTP (Gmail, Outlook, etc.)
        $mail->SMTPAuth   = true;
        $mail->Username   = 'equTrabajo@outlook.es'; // Tu correo real
        $mail->Password   = ''; // Tu contraseña real o contraseña de aplicación
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->SMTPDebug = 2;

        // Configuración del correo
        $mail->setFrom('equTrabajo@outlook.es', 'Soporte Técnico');
        
        // Agregar los destinatarios reales
        $mail->addAddress($email_tecnico, 'Técnico');
        $mail->addAddress($email_usuario, 'Usuario');
        
        // Asunto y cuerpo del correo
      
        $mail->Subject = "Nueva incidencia: $asunto";
        $mail->Body    =  "Detalles: $incidencia\n\nEl técnico asignado atenderá tu solicitud.";

        // Enviar el correo
        $mail->send();
        echo 'Se ha avisado un email a los interesados';
    } catch (Exception $e) {
       echo "Error: {$mail->ErrorInfo}";
        }
}
public static function enviarCorreoUsuario($email_usuario, $asunto, $incidencia, $estado) {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp-mail.outlook.com'; // Servidor SMTP (Gmail, Outlook, etc.)
        $mail->SMTPAuth   = true;
        $mail->Username   = 'equTrabajo@outlook.es'; // Tu correo real
        $mail->Password   = ''; // Tu contraseña real o contraseña de aplicación
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->SMTPDebug = 2;

        // Configuración del correo
        $mail->setFrom('equTrabajo@outlook.es', 'Soporte Técnico');
        
        // Agregar los destinatarios reales
        $mail->addAddress($email_usuario, 'Usuario');
        
        // Asunto y cuerpo del correo
      
        $mail->Subject = "Actualizacion de la incidencia: $asunto";
        $mail->Body    =  "Estado de la incidencia: " . $estado . "\n\nDetalles: $incidencia\n\nEl técnico asignado ha modificado su incidencia.";

        // Enviar el correo
        $mail->send();
        echo 'Se ha avisado un email a los interesados';
    } catch (Exception $e) {
       echo "Error: {$mail->ErrorInfo}";
        }
}
}
?>
