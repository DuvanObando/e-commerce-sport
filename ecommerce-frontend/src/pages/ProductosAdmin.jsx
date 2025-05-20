import React, { useState } from "react";
import "../styles/ProductosAdmin.css";
import articulo1 from "../assets/articulo1.jpg";
import articulo2 from "../assets/articulo2.jpg";
import articulo3 from "../assets/articulo3.jpg";
import balon from "../assets/Balon.jpg";
import camiseta from "../assets/camiseta.jpg";
import camisaeta_baloncesto from "../assets/camisaeta_baloncesto.jpg";
import guantes from "../assets/guantes.jpg";
import lazo from "../assets/Lazo elastico.jpg";
import mochila from "../assets/Mochila.jpg";
import pantaloneta from "../assets/pantaloneta.webp";
import registro1 from "../assets/registro1.jpg";
import rodilleras from "../assets/rodilleras.webp";

// Simulación de productos (reemplaza por fetch a tu API)
const PRODUCTOS_INICIALES = [
  {
    id: 1,
    nombre: "Air Jordan 5 Retro",
    precio: 180000,
    stock: 10,
    descripcion: "Calzado para correr femenino",
    imagen: articulo1,
  },
  {
    id: 2,
    nombre: "Raqueta de Tennis",
    precio: 130000,
    stock: 5,
    descripcion: "Raqueta profesional para competidores",
    imagen: articulo2,
  },
  {
    id: 3,
    nombre: "Gorro + Gafas de natación",
    precio: 210000,
    stock: 8,
    descripcion: "Kit de natación cómodo y resistente",
    imagen: articulo3,
  },
  {
    id: 4,
    nombre: "Balón de fútbol profesional",
    precio: 95000,
    stock: 15,
    descripcion: "Balón de alta calidad para partidos oficiales.",
    imagen: balon,
  },
  {
    id: 5,
    nombre: "Camiseta deportiva",
    precio: 60000,
    stock: 20,
    descripcion: "Camiseta transpirable para entrenamiento.",
    imagen: camiseta,
  },
  {
    id: 6,
    nombre: "Camiseta baloncesto",
    precio: 70000,
    stock: 12,
    descripcion: "Camiseta oficial para baloncesto.",
    imagen: camisaeta_baloncesto,
  },
  {
    id: 7,
    nombre: "Guantes de portero",
    precio: 85000,
    stock: 10,
    descripcion: "Guantes con excelente agarre y protección.",
    imagen: guantes,
  },
  {
    id: 8,
    nombre: "Lazo elástico de resistencia",
    precio: 35000,
    stock: 25,
    descripcion: "Lazo para ejercicios de fuerza y estiramiento.",
    imagen: lazo,
  },
  {
    id: 9,
    nombre: "Mochila deportiva",
    precio: 120000,
    stock: 7,
    descripcion: "Mochila espaciosa y resistente para deporte.",
    imagen: mochila,
  },
  {
    id: 10,
    nombre: "Pantaloneta deportiva",
    precio: 40000,
    stock: 18,
    descripcion: "Pantaloneta cómoda para entrenamiento.",
    imagen: pantaloneta,
  },
  {
    id: 11,
    nombre: "Rodilleras deportivas",
    precio: 50000,
    stock: 14,
    descripcion: "Rodilleras para protección en deportes de impacto.",
    imagen: rodilleras,
  },
];

export default function ProductosAdmin() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(null); // "agregar", "editar", "detalle"
  const [productoActual, setProductoActual] = useState(null);

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Handlers
  const abrirModal = (tipo, producto = null) => {
    setProductoActual(producto);
    setModal(tipo);
  };

  const cerrarModal = () => {
    setModal(null);
    setProductoActual(null);
  };

  const handleAgregar = (nuevo) => {
    setProductos([...productos, { ...nuevo, id: Date.now() }]);
    cerrarModal();
  };

  const handleEditar = (editado) => {
    setProductos(productos.map(p => p.id === editado.id ? editado : p));
    cerrarModal();
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="productos-admin-container">
      <h1>🛠️ Gestión de Productos</h1>
      <div className="productos-barra">
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button className="btn-agregar" onClick={() => abrirModal("agregar")}>+ Agregar producto</button>
      </div>

      <div className="productos-lista">
        {productosFiltrados.length === 0 ? (
          <p className="productos-vacio">No hay productos para mostrar.</p>
        ) : (
          productosFiltrados.map(p => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen} alt={p.nombre} className="producto-img" />
              <div className="producto-info">
                <h3>{p.nombre}</h3>
                <p className="producto-precio">${p.precio.toLocaleString()}</p>
                <p className="producto-stock">Stock: {p.stock}</p>
              </div>
              <div className="producto-acciones">
                <button onClick={() => abrirModal("detalle", p)}>Ver</button>
                <button onClick={() => abrirModal("editar", p)}>Editar</button>
                <button className="eliminar" onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de agregar/editar */}
      {(modal === "agregar" || modal === "editar") && (
        <ProductoForm
          producto={modal === "editar" ? productoActual : null}
          onGuardar={modal === "editar" ? handleEditar : handleAgregar}
          onCancelar={cerrarModal}
        />
      )}

      {/* Modal de detalle */}
      {modal === "detalle" && productoActual && (
        <ProductoDetalle producto={productoActual} onCerrar={cerrarModal} />
      )}
    </div>
  );
}

// Formulario para agregar/editar producto
function ProductoForm({ producto, onGuardar, onCancelar }) {
  const [form, setForm] = useState(
    producto || { nombre: "", precio: "", stock: "", descripcion: "", imagen: "" }
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.stock) return;
    onGuardar({ ...form, precio: Number(form.precio), stock: Number(form.stock), id: producto?.id || Date.now() });
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>{producto ? "Editar producto" : "Agregar producto"}</h2>
        <form onSubmit={handleSubmit}>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="Precio" required />
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" required />
          <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL de imagen o importar" />
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
          <div className="modal-acciones">
            <button type="submit">{producto ? "Guardar cambios" : "Agregar"}</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal de detalle de producto
function ProductoDetalle({ producto, onCerrar }) {
  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>Detalles del producto</h2>
        <img src={producto.imagen} alt={producto.nombre} className="producto-img-detalle" />
        <h3>{producto.nombre}</h3>
        <p><strong>Precio:</strong> ${producto.precio.toLocaleString()}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <div className="modal-acciones">
          <button onClick={onCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
} 