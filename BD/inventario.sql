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

    FOREIGN KEY (id_rol) REFERENCES Roles(id) ON DELETE SET NULL,

    


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

    numerioSerie VARCHAR(100) NOT NULL, 

    Red VARCHAR(100) NOT NULL, 

    MACLAN VARCHAR(100) NOT NULL, 

    IPLAN VARCHAR(100) NOT NULL, 

    MACWIFI VARCHAR(100) NOT NULL, 

    IPWIFI VARCHAR(100) NOT NULL, 

    HD1 VARCHAR(100) NOT NULL, 

    HD2 VARCHAR(100) NOT NULL, 

    Observaciones VARCHAR(100) NOT NULL, 


    FOREIGN KEY (idUbicacion) REFERENCES Ubicaciones(id) ON DELETE SET NULL,

    FOREIGN KEY (idMarca) REFERENCES Marcas(id) ON DELETE SET NULL,

);

INSERT INTO Ordenadores (numero, idMarca, modelo, idUbicacion, nombre, tipo, numerioSerie, Red, MACLAN, IPLAN, MACWIFI, IPWIFI, HD1, HD2, Observaciones) VALUES 
('PC001', 1, 'ThinkPad X1', 1, 'Ordenador Aula1', 'Portátil', 'SN123456', 'LAN1', '00:1A:2B:3C:4D:5E', '192.168.1.10', '00:1A:2B:3C:4D:5F', '192.168.1.20', 'SSD 512GB', 'HDD 1TB', 'Buen estado'),
('PC002', 2, 'MSI GF63', 2, 'Ordenador Aula2', 'Portátil', 'SN654321', 'LAN2', '00:1A:2B:3C:4D:6E', '192.168.1.11', '00:1A:2B:3C:4D:6F', '192.168.1.21', 'SSD 1TB', 'HDD 2TB', 'Requiere limpieza'),
('PC003', 3, 'HP EliteBook', 3, 'Ordenador Almacén', 'Portátil', 'SN789012', 'LAN3', '00:1A:2B:3C:4D:7E', '192.168.1.12', '00:1A:2B:3C:4D:7F', '192.168.1.22', 'SSD 256GB', 'N/A', 'En reparación'),
('PC004', 4, 'ASUS ROG Strix', 4, 'Ordenador Taller1', 'Sobremesa', 'SN345678', 'LAN4', '00:1A:2B:3C:4D:8E', '192.168.1.13', '00:1A:2B:3C:4D:8F', '192.168.1.23', 'SSD 2TB', 'HDD 4TB', 'Uso en proyectos de diseño');


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

    numPC VARCHAR(100) NOT NULL,

    idSoftware INT NOT NULL,

    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    FOREIGN KEY (numPC) REFERENCES Ordenadores(id),

    FOREIGN KEY (idSoftware) REFERENCES Software(id)

);

INSERT INTO Software_PC (numPC, idSoftware) VALUES 
('PC001', 1),  -- Linux en ThinkPad X1 (PC001)
('PC002', 2),  -- Windows en MSI GF63 (PC002)
('PC004', 3);  -- iOS en ASUS ROG Strix (PC004)


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


(!) Inserts en esta tabla solo por trigger cuando se haga update en (ordenador, periferico, dispositivo de red) sobre la ubicacion
CREATE TABLE Historico_Movimientos ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    idMaterial INT NOT NULL, 

    idUbicacion INT NOT NULL, 

    fechaIncio DATETIME NOT NULL, 

    fechaFinal DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    FOREIGN KEY (idUbicacion) REFERENCES Materiales(idUbicacion) ON UPDATE CASCADE 

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
 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 