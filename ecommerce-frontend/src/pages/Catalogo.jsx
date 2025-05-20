import React, { useState, useEffect } from "react";
import "../styles/Catalogo.css";
import ProductoCard from "../components/ProductoCard";
import { obtenerProductos } from "../service/productoService";

const estadoInicialFiltros = {
  deporte: "",
  genero: "",
  marca: "",
  precioMin: "",
  precioMax: ""
};

const Catalogo = () => {
  const [filtros, setFiltros] = useState(estadoInicialFiltros);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Efecto para obtener los productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
        setProductosFiltrados(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  // Efecto para aplicar los filtros
  useEffect(() => {
    if (!productos.length) return;

    const productosFiltrados = productos.filter(producto => {
      const cumpleDeporte = !filtros.deporte || producto.deporte === filtros.deporte;
      const cumpleGenero = !filtros.genero || producto.genero === filtros.genero;
      const cumpleMarca = !filtros.marca || producto.marca === filtros.marca;
      
      // Filtrado por precio
      const precioMin = filtros.precioMin ? Number(filtros.precioMin) : 0;
      const precioMax = filtros.precioMax ? Number(filtros.precioMax) : Infinity;
      const cumplePrecio = producto.precio >= precioMin && producto.precio <= precioMax;

      return cumpleDeporte && cumpleGenero && cumpleMarca && cumplePrecio;
    });

    setProductosFiltrados(productosFiltrados);
  }, [filtros, productos]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  if (cargando) {
    return <div className="catalogo-container">Cargando productos...</div>;
  }

  return (
    <div className="catalogo-container">
      <h1>🛍️ Catálogo de Productos</h1>
      <p>Explora nuestros productos deportivos y encuentra lo que necesitas.</p>

      {/* Filtros */}
      <div className="filtros">
        {/* Filtro por deporte */}
        <div className="filtro-item">
          <label>🏅 Deporte:</label>
          <select name="deporte" onChange={handleFiltroChange} value={filtros.deporte}>
            <option value="">Todos</option>
            <option value="futbol">Fútbol</option>
            <option value="baloncesto">Baloncesto</option>
            <option value="natacion">Natación</option>
            <option value="tennis">Tennis</option>
            <option value="fitness">Fitness</option>
          </select>
        </div>

        {/* Filtro por género */}
        <div className="filtro-item">
          <label>🚻 Género:</label>
          <select name="genero" onChange={handleFiltroChange} value={filtros.genero}>
            <option value="">Todos</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Filtro por marca */}
        <div className="filtro-item">
          <label>🏷️ Marca:</label>
          <select name="marca" onChange={handleFiltroChange} value={filtros.marca}>
            <option value="">Todas</option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
            <option value="puma">Puma</option>
          </select>
        </div>

        {/* Filtro por precio mínimo y máximo */}
        <div className="filtro-item precio">
          <label>💰 Precio:</label>
          <div className="precio-inputs">
            <input
              type="number"
              name="precioMin"
              placeholder="Mín"
              value={filtros.precioMin}
              onChange={handleFiltroChange}
              min="0"
            />
            <input
              type="number"
              name="precioMax"
              placeholder="Máx"
              value={filtros.precioMax}
              onChange={handleFiltroChange}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="lista-productos">
        {productosFiltrados.length === 0 ? (
          <p>No hay productos que coincidan con los filtros seleccionados</p>
        ) : (
          productosFiltrados.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))
        )}
      </div>
    </div>
  );
};

export default Catalogo;
