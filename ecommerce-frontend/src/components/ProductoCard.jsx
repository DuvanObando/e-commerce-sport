// src/components/ProductoCard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Usamos Link para navegación

// Recibimos un producto como prop
const ProductoCard = ({ producto }) => {
return (
    <div className="product-card">
      {/* Imagen del producto */}
    <img
        src={producto.imagen}
        alt={producto.nombre}
        className="product-image"
    />

      {/* Nombre del producto */}
    <h3>{producto.nombre}</h3>

      {/* Precio y descuento si aplica */}
    {producto.descuento ? (
        <>
        <p className="discounted">${producto.precio}</p>
        <p><strong>${producto.descuento}</strong></p>
        </>
    ) : (
        <p><strong>${producto.precio}</strong></p>
    )}

      {/* Botón de acción que lleva al detalle del producto */}
    <Link to={`/catalogo/producto/${producto.id}`}>
        <button>Ver más</button>
    </Link>
    </div>
);
};

export default ProductoCard;
