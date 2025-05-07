// src/pages/DetalleCatalogo.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DetalleProducto.css";

// Simulación de productos cargados desde backend o servicio
const productosMock = [
{
    id: 1,
    nombre: "Balón de Fútbol",
    imagen: "https://via.placeholder.com/300",
    precio: 120000,
    descripcion: "Balón profesional. Tallas: 5, 4",
    deporte: "futbol",
    marca: "Nike",
},
{
    id: 2,
    nombre: "Camiseta de Baloncesto",
    imagen: "https://via.placeholder.com/300",
    precio: 85000,
    descripcion: "Camiseta oficial. Tallas: M, L, XL",
    deporte: "baloncesto",
    marca: "Adidas",
}
];

const DetalleCatalogo = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const producto = productosMock.find(p => p.id === parseInt(id)); // Buscamos el producto por ID

const [talla, setTalla] = useState("");

  // Extraemos las tallas desde la descripción (ej: "Tallas: M, L")
const tallasDisponibles = producto?.descripcion
    ?.split("Tallas:")[1]
    ?.split(",")
    .map(t => t.trim()) || [];

if (!producto) return <p>Producto no encontrado</p>;

return (
    <div className="detalle-container">
    <img src={producto.imagen} alt={producto.nombre} className="detalle-img" />
    <h2>{producto.nombre}</h2>
    <p className="precio">${producto.precio.toLocaleString()}</p>
    <p>{producto.descripcion}</p>

    <div className="formulario-pago">
        <label>Seleccionar talla:</label>
        <select value={talla} onChange={(e) => setTalla(e.target.value)} required>
        <option value="">-- Selecciona --</option>
        {tallasDisponibles.map((t, i) => (
            <option key={i} value={t}>{t}</option>
        ))}
        </select>

        <button disabled={!talla} onClick={() => alert("Producto agregado al carrito")}>
        Agregar al carrito
        </button>
    </div>
    </div>
);
};

export default DetalleCatalogo;
