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

CREATE TABLE Materiales ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    tipo VARCHAR(100) NOT NULL, 

    marca VARCHAR(100) NOT NULL, 

    modelo VARCHAR(100) NOT NULL, 

    idUbicacion INT NULL, 

    FOREIGN KEY (idUbicacion) REFERENCES Ubicaciones(id) ON DELETE SET NULL 

);

(!) Falta hacerle una especializacion en ordenador para que este tenga el atributo software,
de forma que se pueda saber que software usa cada ordenador, y de perifericos talvez


/* tabla provisional de ordenadores */
CREATE TABLE Ordenadores (

    numero VARCHAR(100) PRIMARY KEY,

    idMarca INT NOT NULL,

    modelo VARCHAR(100) NOT NULL, 

    idUbicacion INT NULL, 

    FOREIGN KEY (idUbicacion) REFERENCES Ubicaciones(id) ON DELETE SET NULL,

    FOREIGN KEY (idMarca) REFERENCES Marcas(id) ON DELETE SET NULL,

);

CREATE TABLE Software (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL

);


CREATE TABLE Marcas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL

);

 

CREATE TABLE Ubicaciones ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(100) NOT NULL UNIQUE 

); 



CREATE TABLE Historico_Movimientos ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    idMaterial INT NOT NULL, 

    idUbicacion INT NOT NULL, 

    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    FOREIGN KEY (idMaterial) REFERENCES Materiales(id) ON UPDATE CASCADE,

    FOREIGN KEY (idUbicacion) REFERENCES Materiales(idUbicacion) ON UPDATE CASCADE 

); 


/**********************************/
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
 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 