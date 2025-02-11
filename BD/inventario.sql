/**********************************/
CREATE DATABASE Inventario;

/* USUARIOS */
CREATE TABLE Usuarios ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    correo VARCHAR(255) UNIQUE NOT NULL, 

    pass VARCHAR(255) NOT NULL, 

    nombre VARCHAR(255) NOT NULL, 

    activo BOOLEAN,

    id_rol INT,

    FOREIGN KEY (id_rol) REFERENCES Roles(id) ON DELETE SET NULL

); 

INSERT INTO Usuarios (correo, pass, nombre, activo, id_rol) VALUES('admin@admin.com','admin', 'admin', TRUE, 1);
INSERT INTO Usuarios (correo, pass, nombre, activo, id_rol) VALUES('usuario@usuario.com','usuario', 'usuario', TRUE, 2);
INSERT INTO Usuarios (correo, pass, nombre, activo, id_rol) VALUES('tecnico@tecnico.com','tecnico', 'tecnico', TRUE, 3);
  

CREATE TABLE Roles ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(255) UNIQUE NOT NULL

); 

INSERT INTO Roles (nombre) VALUES ('administrador'), ('usuario'), ('tecnico'); 
 

/**********************************/
/* MATERIALES Y UBICACIONES */


/* tabla provisional de ordenadores */
CREATE TABLE Ordenadores (

    id INT AUTO_INCREMENT PRIMARY KEY,

    numero VARCHAR(100),

    idMarca INT NULL,

    modelo VARCHAR(100) NOT NULL, 

    idUbicacion INT NULL, 

    nombre VARCHAR(100) NOT NULL, 

    tipo VARCHAR(100) NOT NULL, 

    numeroSerie VARCHAR(100) NOT NULL, 

    Red VARCHAR(100) NULL, 

    MACLAN VARCHAR(100) NULL, 

    IPLAN VARCHAR(100) NULL, 

    MACWIFI VARCHAR(100) NULL, 

    IPWIFI VARCHAR(100) NULL, 

    HD1 VARCHAR(100) NULL, 

    HD2 VARCHAR(100) NULL, 

    Observaciones VARCHAR(100) NULL, 

    precio DECIMAL(10,2) NOT NULL , 


    FOREIGN KEY (idUbicacion) REFERENCES Ubicaciones(id) ON DELETE SET NULL,

    FOREIGN KEY (idMarca) REFERENCES Marcas(id) ON DELETE SET NULL

);
(i) Al borrar una marca de la tabla Marcas los ordenadores que tenian esa marca se quedan con idMarca = null, pensar si esto es lo mejor

INSERT INTO Ordenadores (numero, idMarca, modelo, idUbicacion, nombre, tipo, numeroSerie, Red, MACLAN, IPLAN, MACWIFI, IPWIFI, HD1, HD2, Observaciones) VALUES 
('PC001', 1, 'ThinkPad X1', 1, 'Ordenador1', 'Portátil', 'SN123456', 'LAN1', '00:1A:2B:3C:4D:5E', '192.168.1.10', '00:1A:2B:3C:4D:5F', '192.168.1.20', 'SSD 512GB', 'HDD 1TB', 'Buen estado'),
('PC002', 2, 'MSI GF63', 2, 'Ordenador2', 'Portátil', 'SN654321', 'LAN2', '00:1A:2B:3C:4D:6E', '192.168.1.11', '00:1A:2B:3C:4D:6F', '192.168.1.21', 'SSD 1TB', 'HDD 2TB', 'Requiere limpieza'),
('PC003', 3, 'HP EliteBook', 3, 'Ordenador3', 'Portátil', 'SN789012', 'LAN3', '00:1A:2B:3C:4D:7E', '192.168.1.12', '00:1A:2B:3C:4D:7F', '192.168.1.22', 'SSD 256GB', 'N/A', 'En reparación'),
('PC004', 4, 'ASUS ROG Strix', 4, 'Ordenador4', 'Sobremesa', 'SN345678', 'LAN4', '00:1A:2B:3C:4D:8E', '192.168.1.13', '00:1A:2B:3C:4D:8F', '192.168.1.23', 'SSD 2TB', 'HDD 4TB', 'Uso en proyectos de diseño');


CREATE TABLE Software (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL

);

INSERT INTO Software (nombre) VALUES 
('Linux'),
('Windows'),
('iOS');

/* tabla de relacion entre software y ordenadores, registra el software que tiene cada ordenador y su fecha de instalacion */
CREATE TABLE Software_PC (

    id INT AUTO_INCREMENT PRIMARY KEY,

    idPC INT,

    idSoftware INT,

    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    FOREIGN KEY (idPC) REFERENCES Ordenadores(id) ON DELETE SET NULL,

    FOREIGN KEY (idSoftware) REFERENCES Software(id) ON DELETE SET NULL

);
/* tal vez haga falta un trigger para que al borrar uno de los dos se borren todos los registros de esta tabla */

INSERT INTO Software_PC (idPC, idSoftware) VALUES 
(2, 1),
(2, 2),
(3, 3);


CREATE TABLE Marcas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL

);

INSERT INTO Marcas (nombre) VALUES 
('Thinkpad'),
('MSI'),
('HP'),
('ASUS'),
('Dell');


CREATE TABLE Ubicaciones ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(100) NOT NULL UNIQUE 

); 

INSERT INTO Ubicaciones (nombre) VALUES 
('aula1'),
('aula2'),
('almacen'),
('taller1'),
('taller2'),
('pasillo1');


CREATE TABLE DispRed (
    
    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(100) NOT NULL,

    idUbicacion INT NULL, 

    idMarca INT NULL,

    modelo VARCHAR(100) NOT NULL, 

    Red VARCHAR(100) NULL,  

/*opcionales*/
    MACWIFI VARCHAR(100) NULL, 

    IPWIFI VARCHAR(100) NULL, 

    MACLAN VARCHAR(100) NULL, 

    IPLAN VARCHAR(100) NULL, 
/**/

    tipoConexion VARCHAR(100) NULL, /*si va por cable o por wifi*/

    tipoDisp VARCHAR(100) NOT NULL, /*si es un switch, un router, Access Point, etc*/

    Observaciones VARCHAR(100) NULL, 

    precio DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (idUbicacion) REFERENCES Ubicaciones(id) ON DELETE SET NULL,

    FOREIGN KEY (idMarca) REFERENCES Marcas(id) ON DELETE SET NULL

);

(!)Uso de tipoDisp:
    Router → Dispositivos que gestionan la conexión a internet.
    Switch → Dispositivos que conectan varios ordenadores por cable.
    Access Point → Dispositivos que extienden la red WiFi.

INSERT INTO DispRed (nombre, idUbicacion, idMarca, modelo, Red, MACWIFI, IPWIFI, MACLAN, IPLAN, tipoConexion, tipoDisp, Observaciones, precio) VALUES 
('Router1', 1, 34, 'TP-Link Archer C7', 'LAN1', '00:1B:2C:3D:4E:5F', '192.168.1.1', NULL, NULL, 'WiFi', 'Router', 'Suministra WiFi al aula', 120.50),
('Switch1', 2, 35, 'Cisco SG350', 'LAN2', NULL, NULL, '00:1B:2C:3D:4E:6F', '192.168.1.2', 'Cable', 'Switch', 'Conectado a los ordenadores del aula', 250.00),
('Access Point', 6, 37, 'Ubiquiti UAP-AC-LR', 'LAN3', '00:1B:2C:3D:4E:7F', '192.168.1.3', NULL, NULL, 'WiFi', 'Access Point', 'Extiende la cobertura WiFi', 180.75),
('Router2', 4, 36, 'MikroTik hEX', 'LAN4', NULL, NULL, '00:1B:2C:3D:4E:8F', '192.168.1.4', 'Cable', 'Router', 'Gestiona la red del taller', 140.00);



(!) Inserts en esta tabla solo por trigger cuando se haga update en (ordenador, periferico, dispositivo de red) sobre la ubicacion
CREATE TABLE Historico_Movimientos ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    TipoMovimiento ENUM('insercion', 'actualizacion', 'borrado') NOT NULL DEFAULT 'insercion', 

    fecha DATE NOT NULL, 

    /* datos del material a registrar en el historico (se ponen por trigger para evitar borrado) */

    idMaterial INT NOT NULL, 

    nombreMaterial VARCHAR(100) NOT NULL,

    tipoMaterial VARCHAR(100) NOT NULL,

    idUbicacion INT NOT NULL,

    nombreUbicacion VARCHAR(100) NOT NULL

); 

(!)Trigger para su correcto funcionamiento

/* En Ordenadores */

/*insert*/
DELIMITER //

CREATE TRIGGER after_ordenadores_insert
AFTER INSERT ON Ordenadores
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('insercion', CURDATE(), NEW.id, NEW.nombre, "Ordenador", NEW.idUbicacion, (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion));
END;

//

DELIMITER ;

/*update*/
DELIMITER //

CREATE TRIGGER after_ordenadores_update
AFTER UPDATE ON Ordenadores
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('actualizacion', CURDATE(), NEW.id, NEW.nombre, "Ordenador", NEW.idUbicacion, (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion));
END;

//

DELIMITER ;

/*delete*/
DELIMITER //

CREATE TRIGGER after_ordenadores_delete
AFTER DELETE ON Ordenadores
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('borrado', CURDATE(), OLD.id, OLD.nombre, "Ordenador", OLD.idUbicacion, (SELECT nombre FROM Ubicaciones WHERE id = OLD.idUbicacion));
END;

//

DELIMITER ;




/* En Disp Red */
/*insert*/
DELIMITER //

CREATE TRIGGER after_dispred_insert
AFTER INSERT ON DispRed
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('insercion', CURDATE(), NEW.id, NEW.nombre, "Dispositivo de Red", NEW.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion));
END;

//

DELIMITER ;

/*update*/
DELIMITER //

CREATE TRIGGER after_dispred_update
AFTER UPDATE ON DispRed
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('actualizacion', CURDATE(), NEW.id, NEW.nombre, "Dispositivo de Red", NEW.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion));
END;

//

DELIMITER ;

/*delete*/
DELIMITER //

CREATE TRIGGER after_dispred_delete
AFTER DELETE ON DispRed
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('borrado', CURDATE(), OLD.id, OLD.nombre, "Dispositivo de Red", OLD.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = OLD.idUbicacion));
END;

//

DELIMITER ;

(!)Si ordenador_id != null entonces idUbicacion == ordenador_id.ubicacion (trigger)
CREATE TABLE Perifericos ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(100) NOT NULL,
    
    ordenador_id INT NULL, 

    marca_id INT NULL,

    idUbicacion INT NULL, 

    precio DECIMAL(10,2) NOT NULL ,

    fechaCompra DATE NOT NULL, 
    
    FOREIGN KEY (ordenador_id) REFERENCES Ordenadores(id) ON DELETE SET NULL,
    FOREIGN KEY (marca_id) REFERENCES Marcas(id) ON DELETE SET NULL,
    FOREIGN KEY (idUbicacion) REFERENCES Ubicaciones(id) ON DELETE SET NULL
);


/* SIN TERMINAR */

CREATE TABLE Incidencia ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    idUser INT NOT NULL, 

    idUbicacion INT NOT NULL, 

    asunto VARCHAR(255) NOT NULL, 

    descripcion TEXT NOT NULL, 

    estado ENUM('pendiente', 'en trámite', 'resuelto', 'cerrada') NOT NULL DEFAULT 'pendiente', 

    fechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    fechaCierre DATETIME NULL,  

    FOREIGN KEY (idUser) REFERENCES Usuarios(id) ON DELETE CASCADE, 

    FOREIGN KEY (idUbicacion) REFERENCES Ubicaciones(id) ON DELETE CASCADE 

); 

 
    1) Historico_Movimientos registrara cada movimiento de posicion que se haga en un material, es decir, si un material se 
    mueve de ubicacion este registrara el id del material, la fecha de movimiento y la ubicacion atraves de trigger

    2) 
 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 