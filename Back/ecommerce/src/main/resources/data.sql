-- Insertar cliente de prueba si no existe
INSERT INTO clientes (cliente_id, nombre, correo, contrasena, direccion, telefono)
SELECT 1, 'María García Martínez', 'maria@example.com', 'password123', 'Calle 123 #45-67, Bogotá', '3001234567'
WHERE NOT EXISTS (SELECT 1 FROM clientes WHERE cliente_id = 1);

-- Insertar categoría si no existe
INSERT INTO categoria (categoria_id, nombre, descripcion)
SELECT 1, 'Deportes', 'Todo tipo de artículos deportivos'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE categoria_id = 1);

-- Insertar proveedor si no existe
INSERT INTO proveedor (proveedor_id, nombre, correo, telefono)
SELECT 1, 'Proveedor Principal', 'contacto@proveedor.com', '123456789'
WHERE NOT EXISTS (SELECT 1 FROM proveedor WHERE proveedor_id = 1);

-- Insertar productos si no existen
INSERT INTO producto (producto_id, nombre, descripcion, precio, stock, categoria_id, proveedor_id)
SELECT 1, 'Balón de Fútbol', 'Balón profesional de fútbol.', 120000, 50, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE producto_id = 1);

INSERT INTO producto (producto_id, nombre, descripcion, precio, stock, categoria_id, proveedor_id)
SELECT 2, 'Camiseta de Baloncesto', 'Camiseta oficial de baloncesto.', 85000, 30, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE producto_id = 2);

INSERT INTO producto (producto_id, nombre, descripcion, precio, stock, categoria_id, proveedor_id)
SELECT 3, 'Raqueta de Tennis', 'Raqueta profesional de tennis.', 200000, 20, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE producto_id = 3);

INSERT INTO producto (producto_id, nombre, descripcion, precio, stock, categoria_id, proveedor_id)
SELECT 4, 'Gorro + Gafas de Natación', 'Kit completo de natación.', 95000, 25, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE producto_id = 4);

INSERT INTO producto (producto_id, nombre, descripcion, precio, stock, categoria_id, proveedor_id)
SELECT 5, 'Mochila Deportiva', 'Mochila deportiva resistente.', 110000, 40, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE producto_id = 5);

INSERT INTO producto (producto_id, nombre, descripcion, precio, stock, categoria_id, proveedor_id)
SELECT 6, 'Lazo Elástico de Resistencia', 'Lazo elástico para ejercicios.', 60000, 60, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE producto_id = 6); 