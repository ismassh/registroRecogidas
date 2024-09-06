CREATE DATABASE registro;

USE registro;

CREATE TABLE registros(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tienda VARCHAR(20) NOT NULL,
    articulo VARCHAR(20) NOT NULL,
    referencia VARCHAR(40) NOT NULL,
    agencia VARCHAR(20) NOT NULL,
    numero_envio VARCHAR(40) NOT NULL,
    fecha_creacion DATE,
    motivo VARCHAR(50),
    fecha_recepcion DATE, 
    estado VARCHAR(30),
    observaciones VARCHAR(90)
);


SELECT * FROM registros;