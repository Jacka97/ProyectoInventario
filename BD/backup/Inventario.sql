-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-02-2025 a las 14:36:41
-- Versión del servidor: 8.0.41-0ubuntu0.24.04.1
-- Versión de PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DispRed`
--

CREATE TABLE `DispRed` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `idUbicacion` int DEFAULT NULL,
  `idMarca` int DEFAULT NULL,
  `modelo` varchar(100) NOT NULL,
  `Red` varchar(100) DEFAULT NULL,
  `MACWIFI` varchar(100) DEFAULT NULL,
  `IPWIFI` varchar(100) DEFAULT NULL,
  `MACLAN` varchar(100) DEFAULT NULL,
  `IPLAN` varchar(100) DEFAULT NULL,
  `tipoConexion` varchar(100) DEFAULT NULL,
  `tipoDisp` varchar(100) NOT NULL,
  `Observaciones` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `DispRed`
--

INSERT INTO `DispRed` (`id`, `nombre`, `idUbicacion`, `idMarca`, `modelo`, `Red`, `MACWIFI`, `IPWIFI`, `MACLAN`, `IPLAN`, `tipoConexion`, `tipoDisp`, `Observaciones`, `precio`) VALUES
(11, 'Access Point', 6, 37, 'Ubiquiti UAP-AC-LR', 'LAN3', '00:1B:2C:3D:4E:7F', '192.168.1.3', '', '', 'WiFi', 'Access Point', 'Extiende la cobertura WiFi', 18.75),
(14, 'Access Point 3', 6, 37, 'Ubiquiti UAP-AC-LR', 'LAN3', '00:1B:2C:3D:4E:7F', '192.168.1.3', '', '', 'WiFi', 'Access Point', 'Extiende la cobertura WiFi', 1.75),
(15, 'Access Point3', 6, 37, 'Ubiquiti UAP-AC-LR', 'LAN3', '00:1B:2C:3D:4E:7F', '192.168.1.3', '', '', 'WiFi', 'Access Point', 'Extiende la cobertura WiFi', 11.75),
(16, 'salva', 0, 35, 'Portatil', 'LAN5', '', '', '', '', 'sdf', 'sadf', 'rfdgs', 12.55),
(18, 'salva', 0, 36, 'Portatil', 'LAN5', '', '', '', '', 'fds', 'sadf', 'gfddfhg', 12.55),
(19, 'salva gomez', 0, 36, 'gfd', 'fdg', '', '', '', '', 'fds', 'dfgs', 'dfsg', 12.45);

--
-- Disparadores `DispRed`
--
DELIMITER $$
CREATE TRIGGER `after_dispred_delete` AFTER DELETE ON `DispRed` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('borrado', CURDATE(), OLD.id, OLD.nombre, "Dispositivo de Red", OLD.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = OLD.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_dispred_insert` AFTER INSERT ON `DispRed` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('insercion', CURDATE(), NEW.id, NEW.nombre, "Dispositivo de Red", NEW.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_dispred_update` AFTER UPDATE ON `DispRed` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('actualizacion', CURDATE(), NEW.id, NEW.nombre, "Dispositivo de Red", NEW.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion))$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Historico_Movimientos`
--

CREATE TABLE `Historico_Movimientos` (
  `id` int NOT NULL,
  `TipoMovimiento` enum('insercion','actualizacion','borrado') NOT NULL DEFAULT 'insercion',
  `fecha` date NOT NULL,
  `idMaterial` int NOT NULL,
  `nombreMaterial` varchar(100) NOT NULL,
  `tipoMaterial` varchar(100) NOT NULL,
  `idUbicacion` int NOT NULL,
  `nombreUbicacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Historico_Movimientos`
--

INSERT INTO `Historico_Movimientos` (`id`, `TipoMovimiento`, `fecha`, `idMaterial`, `nombreMaterial`, `tipoMaterial`, `idUbicacion`, `nombreUbicacion`) VALUES
(4, 'borrado', '2025-02-11', 12, 'Router2', 'Dispositivo de Red', 4, 'taller1'),
(5, 'insercion', '2025-02-11', 13, 'Router2', 'Dispositivo de Red', 4, 'taller1'),
(6, 'actualizacion', '2025-02-11', 13, 'Router2', 'Dispositivo de Red', 4, 'taller1'),
(7, 'actualizacion', '2025-02-11', 1, 'Ordenador1', 'Ordenador', 1, 'aula1'),
(8, 'actualizacion', '2025-02-11', 2, 'Ordenador2', 'Ordenador', 2, 'aula2'),
(9, 'actualizacion', '2025-02-11', 4, 'Ordenador3', 'Ordenador', 4, 'taller1'),
(10, 'actualizacion', '2025-02-11', 4, 'Ordenador4', 'Ordenador', 4, 'taller1'),
(11, 'actualizacion', '2025-02-11', 4, 'Ordenador4', 'Ordenador', 4, 'taller1'),
(12, 'borrado', '2025-02-11', 9, 'Router1', 'Dispositivo de Red', 1, 'aula1'),
(13, 'actualizacion', '2025-02-11', 1, 'Ordenador1', 'Ordenador', 0, 'almacen'),
(14, 'actualizacion', '2025-02-11', 10, 'Switch1', 'Dispositivo de Red', 0, 'almacen'),
(15, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 6, 'pasillo1'),
(16, 'actualizacion', '2025-02-11', 10, 'Switch12', 'Dispositivo de Red', 0, 'almacen'),
(17, 'borrado', '2025-02-11', 10, 'Switch12', 'Dispositivo de Red', 0, 'almacen'),
(18, 'actualizacion', '2025-02-11', 11, 'Access Point', 'Dispositivo de Red', 6, 'pasillo1'),
(19, 'insercion', '2025-02-11', 12, 'Ordenador1', 'Ordenador', 0, 'almacen'),
(20, 'insercion', '2025-02-11', 14, 'Access Point 3', 'Dispositivo de Red', 6, 'pasillo1'),
(21, 'actualizacion', '2025-02-11', 1, 'Ordenador1', 'Ordenador', 0, 'almacen'),
(22, 'actualizacion', '2025-02-11', 2, 'Ordenador2', 'Ordenador', 2, 'aula2'),
(23, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 6, 'pasillo1'),
(24, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 6, 'pasillo1'),
(25, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 6, 'pasillo1'),
(26, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 6, 'pasillo1'),
(27, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 6, 'pasillo1'),
(28, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 6, 'pasillo1'),
(29, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 0, 'almacen'),
(30, 'actualizacion', '2025-02-11', 2, 'Ordenador2', 'Ordenador', 4, 'taller1'),
(31, 'actualizacion', '2025-02-11', 1, 'raton', 'Periférico', 0, 'almacen'),
(32, 'actualizacion', '2025-02-11', 1, 'Ordenador1', 'Ordenador', 2, 'aula2'),
(33, 'insercion', '2025-02-11', 2, 'teclado', 'Periférico', 4, 'taller1'),
(34, 'actualizacion', '2025-02-11', 2, 'teclado', 'Periférico', 0, 'almacen'),
(35, 'actualizacion', '2025-02-11', 2, 'teclado', 'Periférico', 2, 'aula2'),
(36, 'actualizacion', '2025-02-11', 1, 'Ordenador1', 'Ordenador', 2, 'aula2'),
(37, 'borrado', '2025-02-11', 13, 'Router2', 'Dispositivo de Red', 4, 'taller1'),
(38, 'insercion', '2025-02-12', 15, 'Access Point3', 'Dispositivo de Red', 6, 'pasillo1'),
(39, 'actualizacion', '2025-02-12', 1, 'raton', 'Periférico', 4, 'taller1'),
(40, 'insercion', '2025-02-12', 16, 'salva', 'Dispositivo de Red', 0, 'almacen'),
(41, 'actualizacion', '2025-02-12', 1, 'raton', 'Periférico', 2, 'aula2'),
(42, 'actualizacion', '2025-02-12', 1, 'raton', 'Periférico', 4, 'taller1'),
(43, 'insercion', '2025-02-12', 17, 'salvadsfsgg', 'Dispositivo de Red', 0, 'almacen'),
(44, 'actualizacion', '2025-02-12', 1, 'raton', 'Periférico', 4, 'taller1'),
(45, 'insercion', '2025-02-12', 18, 'salva', 'Dispositivo de Red', 0, 'almacen'),
(46, 'borrado', '2025-02-12', 17, 'salvadsfsgg', 'Dispositivo de Red', 0, 'almacen'),
(47, 'insercion', '2025-02-12', 19, 'salva gomez', 'Dispositivo de Red', 0, 'almacen');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Marcas`
--

CREATE TABLE `Marcas` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Marcas`
--

INSERT INTO `Marcas` (`id`, `nombre`) VALUES
(10, 'SAMSUNG'),
(11, 'SONIC'),
(15, 'LLENOVO'),
(17, 'SONIC'),
(25, '212'),
(26, '1212'),
(27, '1212'),
(28, '1213'),
(33, 'salvador'),
(34, 'tp-link'),
(35, 'Cisco'),
(36, 'MikroTik'),
(37, 'Ubiquiti');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ordenadores`
--

CREATE TABLE `Ordenadores` (
  `id` int NOT NULL,
  `numero` varchar(100) DEFAULT NULL,
  `idMarca` int DEFAULT NULL,
  `modelo` varchar(100) NOT NULL,
  `idUbicacion` int DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `numeroSerie` varchar(100) NOT NULL,
  `Red` varchar(100) DEFAULT NULL,
  `MACLAN` varchar(100) DEFAULT NULL,
  `IPLAN` varchar(100) DEFAULT NULL,
  `MACWIFI` varchar(100) DEFAULT NULL,
  `IPWIFI` varchar(100) DEFAULT NULL,
  `HD1` varchar(100) DEFAULT NULL,
  `HD2` varchar(100) DEFAULT NULL,
  `Observaciones` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Ordenadores`
--

INSERT INTO `Ordenadores` (`id`, `numero`, `idMarca`, `modelo`, `idUbicacion`, `nombre`, `tipo`, `numeroSerie`, `Red`, `MACLAN`, `IPLAN`, `MACWIFI`, `IPWIFI`, `HD1`, `HD2`, `Observaciones`, `precio`) VALUES
(1, 'PC001', 28, 'ThinkPad X1', 2, 'Ordenador1', 'Portátil', 'SN123456', 'LAN1', '00:1A:2B:3C:4D:5E', '192.168.1.10', '00:1A:2B:3C:4D:5F', '192.168.1.20', 'SSD 512GB', 'HDD 1TB', 'Buen estado', 990.00),
(2, 'PC002', 33, 'MSI GF63', 4, 'Ordenador2', 'Portátil', 'SN654321', 'LAN2', '00:1A:2B:3C:4D:6E', '192.168.1.11', '00:1A:2B:3C:4D:6F', '192.168.1.21', 'SSD 1TB', 'HDD 2TB', 'Requiere limpieza', 599.00),
(4, 'PC004', 10, 'ASUS ROG Strix', 4, 'Ordenador4', 'Sobremesa', 'SN345678', 'LAN4', '00:1A:2B:3C:4D:8E', '192.168.1.13', '00:1A:2B:3C:4D:8F', '192.168.1.23', 'SSD 2TB', 'HDD 4TB', 'Uso en proyectos de diseño y mas', 200.99),
(12, 'PC001', 11, 'ThinkPad X1', 0, 'Ordenador1', 'Portátil', 'SN123456', 'LAN1', '00:1A:2B:3C:4D:5E', '192.168.1.10', '00:1A:2B:3C:4D:5F', '192.168.1.20', 'SSD 512GB', 'HDD 1TB', 'Buen estado', 990.00);

--
-- Disparadores `Ordenadores`
--
DELIMITER $$
CREATE TRIGGER `after_ordenadores_delete` AFTER DELETE ON `Ordenadores` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('borrado', CURDATE(), OLD.id, OLD.nombre, "Ordenador", OLD.idUbicacion, (SELECT nombre FROM Ubicaciones WHERE id = OLD.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_ordenadores_insert` AFTER INSERT ON `Ordenadores` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('insercion', CURDATE(), NEW.id, NEW.nombre, "Ordenador", NEW.idUbicacion, (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_ordenadores_update` AFTER UPDATE ON `Ordenadores` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('actualizacion', CURDATE(), NEW.id, NEW.nombre, "Ordenador", NEW.idUbicacion, (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_ordenador_ubicacion` AFTER UPDATE ON `Ordenadores` FOR EACH ROW BEGIN
    -- Si la ubicación del ordenador ha cambiado
    IF OLD.idUbicacion <> NEW.idUbicacion THEN
        -- Actualizar la ubicación de los periféricos asociados
        UPDATE Perifericos
        SET idUbicacion = NEW.idUbicacion
        WHERE ordenador_id = NEW.id$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Perifericos`
--

CREATE TABLE `Perifericos` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ordenador_id` int DEFAULT NULL,
  `marca_id` int DEFAULT NULL,
  `idUbicacion` int DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `numeroSerie` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Perifericos`
--

INSERT INTO `Perifericos` (`id`, `nombre`, `ordenador_id`, `marca_id`, `idUbicacion`, `precio`, `numeroSerie`) VALUES
(1, 'raton', 2, 15, 4, 44.45, '123456789'),
(2, 'teclado', 1, 10, 2, 44.45, '234567');

--
-- Disparadores `Perifericos`
--
DELIMITER $$
CREATE TRIGGER `after_perifericos_delete` AFTER DELETE ON `Perifericos` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('borrado', CURDATE(), OLD.id, OLD.nombre, 'Periférico', OLD.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = OLD.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_perifericos_insert` AFTER INSERT ON `Perifericos` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('insercion', CURDATE(), NEW.id, NEW.nombre, 'Periférico', NEW.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_perifericos_update` AFTER UPDATE ON `Perifericos` FOR EACH ROW BEGIN
    INSERT INTO Historico_Movimientos (TipoMovimiento, fecha, idMaterial, nombreMaterial, tipoMaterial, idUbicacion, nombreUbicacion)
    VALUES ('actualizacion', CURDATE(), NEW.id, NEW.nombre, 'Periférico', NEW.idUbicacion, 
            (SELECT nombre FROM Ubicaciones WHERE id = NEW.idUbicacion))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_perifericos` BEFORE INSERT ON `Perifericos` FOR EACH ROW BEGIN
    -- Declarar la variable al inicio del bloque
    DECLARE ubicacion_ordenador INT DEFAULT NULL$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_perifericos` BEFORE UPDATE ON `Perifericos` FOR EACH ROW BEGIN
    -- Declarar la variable al inicio del bloque
    DECLARE ubicacion_ordenador INT DEFAULT NULL$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

CREATE TABLE `Roles` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Roles`
--

INSERT INTO `Roles` (`id`, `nombre`) VALUES
(1, 'administrador'),
(3, 'tecnico'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Software`
--

CREATE TABLE `Software` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Software`
--

INSERT INTO `Software` (`id`, `nombre`) VALUES
(1, 'Linux'),
(2, 'Windows'),
(3, 'iOS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Software_PC`
--

CREATE TABLE `Software_PC` (
  `id` int NOT NULL,
  `idPC` int DEFAULT NULL,
  `idSoftware` int DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Software_PC`
--

INSERT INTO `Software_PC` (`id`, `idPC`, `idSoftware`, `fecha`) VALUES
(1, 2, 1, '2025-02-06 15:38:59'),
(2, 2, 2, '2025-02-06 15:38:59'),
(3, NULL, 3, '2025-02-06 15:38:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ubicaciones`
--

CREATE TABLE `Ubicaciones` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Ubicaciones`
--

INSERT INTO `Ubicaciones` (`id`, `nombre`) VALUES
(0, 'almacen'),
(1, 'aula1'),
(2, 'aula2'),
(6, 'pasillo1'),
(4, 'taller1'),
(5, 'taller2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id` int NOT NULL,
  `correo` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `id_rol` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `correo`, `pass`, `nombre`, `activo`, `id_rol`) VALUES
(4, 'admin@admin.com', 'admin', 'adminqweq', 1, 1),
(5, 'usuario@usuario.com', 'usuario', 'usuarioGOD', 1, 2),
(6, 'tecnico@tecnico.com', 'tecnico', 'tecnicoqrtyrt', 1, 3),
(28, 'juan@juan.com', 'juan', 'juan', 1, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `DispRed`
--
ALTER TABLE `DispRed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUbicacion` (`idUbicacion`),
  ADD KEY `idMarca` (`idMarca`);

--
-- Indices de la tabla `Historico_Movimientos`
--
ALTER TABLE `Historico_Movimientos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Marcas`
--
ALTER TABLE `Marcas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Ordenadores`
--
ALTER TABLE `Ordenadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUbicacion` (`idUbicacion`),
  ADD KEY `idMarca` (`idMarca`);

--
-- Indices de la tabla `Perifericos`
--
ALTER TABLE `Perifericos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordenador_id` (`ordenador_id`),
  ADD KEY `marca_id` (`marca_id`),
  ADD KEY `idUbicacion` (`idUbicacion`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `Software`
--
ALTER TABLE `Software`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Software_PC`
--
ALTER TABLE `Software_PC`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPC` (`idPC`),
  ADD KEY `idSoftware` (`idSoftware`);

--
-- Indices de la tabla `Ubicaciones`
--
ALTER TABLE `Ubicaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `DispRed`
--
ALTER TABLE `DispRed`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `Historico_Movimientos`
--
ALTER TABLE `Historico_Movimientos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `Marcas`
--
ALTER TABLE `Marcas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `Ordenadores`
--
ALTER TABLE `Ordenadores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `Perifericos`
--
ALTER TABLE `Perifericos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Software`
--
ALTER TABLE `Software`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Software_PC`
--
ALTER TABLE `Software_PC`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Ubicaciones`
--
ALTER TABLE `Ubicaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `DispRed`
--
ALTER TABLE `DispRed`
  ADD CONSTRAINT `DispRed_ibfk_1` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicaciones` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `DispRed_ibfk_2` FOREIGN KEY (`idMarca`) REFERENCES `Marcas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `Ordenadores`
--
ALTER TABLE `Ordenadores`
  ADD CONSTRAINT `Ordenadores_ibfk_1` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicaciones` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `Ordenadores_ibfk_2` FOREIGN KEY (`idMarca`) REFERENCES `Marcas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `Perifericos`
--
ALTER TABLE `Perifericos`
  ADD CONSTRAINT `Perifericos_ibfk_1` FOREIGN KEY (`ordenador_id`) REFERENCES `Ordenadores` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `Perifericos_ibfk_2` FOREIGN KEY (`marca_id`) REFERENCES `Marcas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `Perifericos_ibfk_3` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicaciones` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `Software_PC`
--
ALTER TABLE `Software_PC`
  ADD CONSTRAINT `Software_PC_ibfk_1` FOREIGN KEY (`idPC`) REFERENCES `Ordenadores` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `Software_PC_ibfk_2` FOREIGN KEY (`idSoftware`) REFERENCES `Software` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `Roles` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
