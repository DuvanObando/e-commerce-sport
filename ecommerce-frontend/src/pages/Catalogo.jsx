import React, { useState, useEffect } from "react";
import "../styles/Catalogo.css";
import ProductoCard from "../components/ProductoCard";
import { obtenerProductos } from "../service/productoService"; // Función que simula una API

// Componente principal del catálogo
const Catalogo = () => {
  // Estado para almacenar los filtros seleccionados por el usuario
const [filtros, setFiltros] = useState({
    deporte: "",
    genero: "",
    marca: "",
    precioMin: "",
    precioMax: ""
});

  // Estado para almacenar la lista de productos obtenidos
const [productos, setProductos] = useState([]);

  // Efecto que se ejecuta cada vez que cambian los filtros
useEffect(() => {
    // Llamamos a la función que traerá los productos (mock o real en el futuro)
    obtenerProductos(filtros).then(setProductos);
}, [filtros]);

  // Función para actualizar filtros cuando se cambia un input/select
const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
};

return (
    <div className="catalogo-container">
    <h1>🛍️ Catálogo de Productos</h1>
    <p>Explora nuestros productos deportivos y encuentra lo que necesitas.</p>

      {/* Filtros */}
    <div className="filtros">
        {/* Filtro por deporte */}
        <div className="filtro-item">
        <label>🏅 Deporte:</label>
        <select name="deporte" onChange={handleFiltroChange}>
            <option value="">Todos</option>
            <option value="futbol">Fútbol</option>
            <option value="baloncesto">Baloncesto</option>
            <option value="natacion">Natación</option>
        </select>
        </div>

        {/* Filtro por género */}
        <div className="filtro-item">
        <label>🚻 Género:</label>
        <select name="genero" onChange={handleFiltroChange}>
            <option value="">Todos</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="unisex">Unisex</option>
        </select>
        </div>

        {/* Filtro por marca */}
        <div className="filtro-item">
        <label>🏷️ Marca:</label>
        <select name="marca" onChange={handleFiltroChange}>
            <option value="">Todas</option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
            <option value="puma">Puma</option>
        </select>
        </div>

        {/* Filtro por precio mínimo y máximo */}
        <div className="filtro-item">
        <label>💰 Precio:</label>
        <input
            type="number"
            name="precioMin"
            placeholder="Mín"
            onChange={handleFiltroChange}
        />
        <input
            type="number"
            name="precioMax"
            placeholder="Máx"
            onChange={handleFiltroChange}
        />
        </div>
    </div>

      {/* Lista de productos */}
    <div className="lista-productos">
        {/* Si no hay productos, mostramos mensaje */}
        {productos.length === 0 ? (
        <p>No hay productos para mostrar</p>
        ) : (
          // Renderizamos cada producto con su tarjeta
        productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
        ))
        )}
    </div>
    </div>
);
};

export default Catalogo;
