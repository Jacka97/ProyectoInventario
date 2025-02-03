Esto es para la gestión de usuarios 

 

CREATE TABLE Rol ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    tipo VARCHAR(50) UNIQUE NOT NULL 

); 

  

INSERT INTO Rol (tipo) VALUES ('administrador'), ('usuario'), ('tecnico'); 

  

CREATE TABLE Usuario ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    user VARCHAR(255) UNIQUE NOT NULL, 

    pass VARCHAR(255) NOT NULL, 

    nombre VARCHAR(255) NOT NULL 

); 

  

CREATE TABLE UsuarioRol ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    idUsuario INT NOT NULL, 

    idRol INT NOT NULL, 

    FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE, 

    FOREIGN KEY (idRol) REFERENCES Rol(id) ON DELETE CASCADE, 

    UNIQUE (idUsuario, idRol) -- Un usuario no puede tener el mismo rol dos veces 

); 

 

/************************/ 

CREATE TABLE Material ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    tipo VARCHAR(100) NOT NULL, 

    marca VARCHAR(100) NOT NULL, 

    modelo VARCHAR(100) NOT NULL, 

    almacen BOOLEAN NOT NULL DEFAULT FALSE, -- Indica si está en el almacén o en un aula 

    idAula INT NULL, 

    FOREIGN KEY (idAula) REFERENCES Aula(id) ON DELETE SET NULL 

); 

Nota: 

Si almacen = TRUE, el material está en almacén y idAula es NULL. 

Si almacen = FALSE, idAula se llena con el aula donde se encuentra. 

 

 

CREATE TABLE Aula ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    nombre VARCHAR(100) NOT NULL UNIQUE 

); 

 

Nota: 🔹 Función: Define las aulas donde puede estar el material. 

 

CREATE TABLE Almacen ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    idMaterial INT NOT NULL, 

    fechaEntrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    fechaSalida DATETIME NULL,  

    FOREIGN KEY (idMaterial) REFERENCES Material(id) ON DELETE CASCADE 

); 

Nota: Es para el historial del movimiento del almacen 

Claves Primarias: id (autoincremental). 

🔹 Gestión de Stock: 

Cada vez que un material entra al almacén, se registra con fechaEntrada. 

Cuando sale del almacén, se actualiza fechaSalida. 

Si fechaSalida IS NULL, el material está en el almacén. 

 

 

CREATE TABLE Incidencia ( 

    id INT AUTO_INCREMENT PRIMARY KEY, 

    idUser INT NOT NULL, 

    idAula INT NOT NULL, 

    asunto VARCHAR(255) NOT NULL, 

    descripcion TEXT NOT NULL, 

    estado ENUM('pendiente', 'en trámite', 'resuelto', 'cerrada') NOT NULL DEFAULT 'pendiente', 

    fechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 

    fechaCierre DATETIME NULL,  

    FOREIGN KEY (idUser) REFERENCES Usuario(id) ON DELETE CASCADE, 

    FOREIGN KEY (idAula) REFERENCES Aula(id) ON DELETE CASCADE 

); 

 

 

Nota:  

1)Consultas para Gestión del Stock en el Almacén (Para saber qué materiales están en el almacén) 

SELECT m.id, m.tipo, m.marca, m.modelo  FROM Material m JOIN Almacen a ON m.id = a.idMaterial WHERE a.fechaSalida IS NULL; 

 

2) Si quieres mover un material del almacén a un aula, haz dos pasos: 

Paso1: Actualizar Almacen para registrar su salida: 

UPDATE Almacen SET fechaSalida = NOW() WHERE idMaterial = ? AND fechaSalida IS NULL; 

Paso2: Actualizar Material para asignarlo a un aula 

UPDATE Material SET almacen = FALSE, idAula = ?  WHERE id = ?; 

 

3)Devolver material al almacén 

INSERT INTO Almacen (idMaterial) VALUES (?); 

UPDATE Material SET almacen = TRUE, idAula = NULL  WHERE id = ?; 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 