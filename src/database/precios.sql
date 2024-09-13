CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    familia ENUM('pae', 'electro', 'bricolaje', 'accesorios-tech', 'belleza-salud', 'deportes-aire-libre') NOT NULL,
    sku VARCHAR(50) NOT NULL,
    tarifa_ewin DECIMAL(10, 2) NOT NULL,
    agencia VARCHAR(100) DEFAULT 'CTT Express',
    peso DECIMAL(5, 2) NOT NULL,
    alto DECIMAL(5, 2) NOT NULL,
    ancho DECIMAL(5, 2) NOT NULL,
    longitud DECIMAL(5, 2) NOT NULL,
    fecha_insercion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
