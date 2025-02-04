/**********************************/
/* USUARIOS */

CREATE TABLE Usuarios ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    correo VARCHAR(255) UNIQUE NOT NULL, 

    pass VARCHAR(255) NOT NULL, 

    nombre VARCHAR(255) NOT NULL, 

    activo BOOLEAN,

    id_rol INT,

    FOREIGN KEY (id_rol) REFERENCES Roles(id), 

); 

  

CREATE TABLE Roles ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(255) UNIQUE NOT NULL, 

); 

INSERT INTO Roles (nombre) VALUES ('administrador'), ('usuario'), ('tecnico'); 
 

/**********************************/
/* MATERIALES Y UBICACIONES */


/* tabla provisional de ordenadores */
CREATE TABLE Ordenadores (

    numero VARCHAR(100) PRIMARY KEY,

    idMarca INT NOT NULL,

    modelo VARCHAR(100) NOT NULL, 

    idUbicacion INT NULL, 

    /*atributos secundarios*/

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

    FOREIGN KEY (idMarca) REFERENCES Marcas(id) ON DELETE SET NULL

);

CREATE TABLE Software (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL

);

/* tabla de relacion entre software y ordenadores, registra el software que tiene cada ordenador y su fecha de instalacion */
CREATE TABLE Software_PC (

    id INT AUTO_INCREMENT PRIMARY KEY,

    numPC VARCHAR(100) NOT NULL,

    idSoftware INT NOT NULL,

    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    FOREIGN KEY (numPC) REFERENCES Ordenadores(numero) ON DELETE SET NULL,

    FOREIGN KEY (idSoftware) REFERENCES Software(id) ON DELETE SET NULL

);


CREATE TABLE Marcas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL

);

 

CREATE TABLE Ubicaciones ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(100) NOT NULL UNIQUE 

); 


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
 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 