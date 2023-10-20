DROP DATABASE IF EXISTS avisos_db;
CREATE DATABASE avisos_db;

USE avisos_db;



CREATE TABLE `Avisos`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `permiso` VARCHAR(255) NOT NULL,
    `localidad` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NOT NULL,
    `proximoAviso` DATETIME NOT NULL,
    `ultimoAviso` DATETIME,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    `deletedAt` DATETIME,
    `estado` VARCHAR(255)
);