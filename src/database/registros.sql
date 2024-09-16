CREATE DATABASE registros_recogidas;

USE registros_recogidas;

CREATE TABLE registros(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tienda VARCHAR(30) NOT NULL,
    articulo VARCHAR(30) NOT NULL,
    referencia VARCHAR(30) NOT NULL,
    agencia VARCHAR(20) NOT NULL,
    numero_envio VARCHAR(40) NOT NULL,
    fecha_creacion VARCHAR(20),
    motivo VARCHAR(60),
    fecha_recepcion VARCHAR(20), 
    observaciones VARCHAR(90),
    finalizado TINYINT(1)
);


SELECT * FROM registros;