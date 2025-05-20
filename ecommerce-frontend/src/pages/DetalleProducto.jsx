import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaArrowLeft } from "react-icons/fa"; // ícono de flecha
import articulo1 from "../assets/articulo1.jpg";
import articulo2 from "../assets/articulo2.jpg";
import articulo3 from "../assets/articulo3.jpg";
import "../styles/DetalleProducto.css";

const productos = [
  {
    id: 1,
    nombre: "Air Jordan 5 Retro",
    precio: 180000,
    precioAnterior: 250000,
    imagen: articulo1,
    descripcion: "Calzado para correr femenino",
    tallas: ["7", "7.5", "8", "9"],
    colores: ["#ff6600", "#7f3fbf", "#3f87ff", "#d40000"],
  },
  {
    id: 2,
    nombre: "Raqueta de Tennis",
    precio: 130000,
    imagen: articulo2,
    descripcion: "Raqueta profesional para competidores",
    tallas: ["L2", "L3", "L4"],
    colores: ["#ff6600", "#7f3fbf", "#3f87ff", "#d40000"],
  },
  {
    id: 3,
    nombre: "Gorro + Gafas de natación",
    precio: 210000,
    imagen: articulo3,
    descripcion: "Kit de natación cómodo y resistente",
    tallas: ["S", "M", "L"],
  },
];

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const producto = productos.find((p) => p.id === parseInt(id));

  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  if (!producto) return <p>Producto no encontrado</p>;

  const handleAgregarCarrito = () => {
    // Verificar si el usuario ha iniciado sesión
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (!isLoggedIn) {
      setMensaje("Debes iniciar sesión para añadir productos al carrito.");
      setTimeout(() => {
        navigate("/inicio");
      }, 1500);
      return;
    }

    if (!tallaSeleccionada) {
      setMensaje("Debes seleccionar una talla.");
      return;
    }

    // Calculamos el precio total basado en la cantidad
    const precioTotal = producto.precio * cantidad;

    const item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: precioTotal,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      talla: tallaSeleccionada,
      color: colorSeleccionado,
      cantidad: cantidad,
      precioUnitario: producto.precio
    };

    addToCart(item);
    setMensaje("Producto añadido al carrito 🛒");

    // Opcional: Redirigir al carrito después de un breve delay
    setTimeout(() => {
      navigate('/carrito');
    }, 1500);
  };

  return (
    <div className="detalle-page">
      <div className="detalle-header">
        <button className="btn-volver" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>
      </div>

      <div className="detalle-flotante">
        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p className="descripcion">{producto.descripcion}</p>

          <div className="precio-box">
            <span className="precio-actual">${producto.precio.toLocaleString()}</span>
            {producto.precioAnterior && (
              <span className="precio-anterior">${producto.precioAnterior.toLocaleString()}</span>
            )}
          </div>

          <div className="linea-sutil"></div>

          <div className="opciones">
            <label>Talla:</label>
            <div className="tallas">
              {producto.tallas.map((t, index) => (
                <button
                  key={index}
                  className={tallaSeleccionada === t ? "activa" : ""}
                  onClick={() => setTallaSeleccionada(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {producto.colores && (
              <>
                <label>Color:</label>
                <div className="colores">
                  {producto.colores.map((c, i) => (
                    <div
                      key={i}
                      className={`color-circulo ${colorSeleccionado === c ? "seleccionado" : ""}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColorSeleccionado(c)}
                    />
                  ))}
                </div>
              </>
            )}

            <label>Cantidad:</label>
            <div className="cantidad-box">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)}>+</button>
            </div>
          </div>

          <button 
            className="btn-carrito" 
            onClick={handleAgregarCarrito}
            disabled={!tallaSeleccionada}
          >
            🛒 Añadir al carrito
          </button>

          {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;