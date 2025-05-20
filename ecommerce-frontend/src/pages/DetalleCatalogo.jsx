import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/DetalleProducto.css";
import { FaArrowLeft } from "react-icons/fa";
import balon from "../assets/Balon.jpg";
import camisetaBaloncesto from "../assets/camisaeta_baloncesto.jpg";
import raqueta from "../assets/articulo2.jpg";
import natacionKit from "../assets/articulo3.jpg";
import mochila from "../assets/Mochila.jpg";
import lazo from "../assets/Lazo elastico.jpg";

const productosMock = [
  {
    id: 1,
    nombre: "Balón de Fútbol",
    imagen: balon,
    precio: 120000,
    descripcion: "Balón profesional de fútbol.",
    deporte: "futbol",
    genero: "hombre",
    marca: "nike",
    tallas: ["4", "5", "6"],
  },
  {
    id: 2,
    nombre: "Camiseta de Baloncesto",
    imagen: camisetaBaloncesto,
    precio: 85000,
    descripcion: "Camiseta oficial de baloncesto.",
    deporte: "baloncesto",
    genero: "hombre",
    marca: "adidas",
    tallas: ["M", "L", "XL"],
  },
  {
    id: 3,
    nombre: "Raqueta de Tennis",
    imagen: raqueta,
    precio: 200000,
    descripcion: "Raqueta profesional de tennis.",
    deporte: "tennis",
    genero: "mujer",
    marca: "puma",
    tallas: ["3.5", "4", "4.5"],
  },
  {
    id: 4,
    nombre: "Gorro + Gafas de Natación",
    imagen: natacionKit,
    precio: 95000,
    descripcion: "Kit completo de natación.",
    deporte: "natacion",
    genero: "mujer",
    marca: "nike",
    tallas: ["S", "M", "L"],
  },
  {
    id: 5,
    nombre: "Mochila Deportiva",
    imagen: mochila,
    precio: 110000,
    descripcion: "Mochila deportiva resistente.",
    deporte: "futbol",
    genero: "unisex",
    marca: "nike",
    tallas: ["24", "26", "28"],
  },
  {
    id: 6,
    nombre: "Lazo Elástico de Resistencia",
    imagen: lazo,
    precio: 60000,
    descripcion: "Lazo elástico para ejercicios.",
    deporte: "fitness",
    genero: "unisex",
    marca: "puma",
    tallas: ["M", "L", "XL"],
  }
];

const DetalleCatalogo = () => {
  const { cart, addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productosMock.find((p) => p.id === parseInt(id));
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    // Calcular cantidad total y precio total en carrito para este producto
    const totalesEnCarrito = cart.reduce((acc, item) => {
      if (item.id === producto?.id && 
          item.talla === tallaSeleccionada && 
          item.color === colorSeleccionado) {
        return {
          cantidad: acc.cantidad + item.cantidad,
          precio: acc.precio + (item.cantidad * item.precioUnitario)
        };
      }
      return acc;
    }, { cantidad: 0, precio: 0 });

    setCantidadEnCarrito(totalesEnCarrito.cantidad);
    setPrecioTotal(totalesEnCarrito.precio);
  }, [cart, producto?.id, tallaSeleccionada, colorSeleccionado]);

  useEffect(() => {
    // Actualizar precio total cuando cambie la cantidad
    setPrecioTotal(cantidad * producto?.precio);
  }, [cantidad, producto?.precio]);

  if (!producto) return <p>Producto no encontrado</p>;

  const handleAgregarCarrito = () => {
    if (!tallaSeleccionada) {
      setMensaje("Debes seleccionar una talla.");
      return;
    }

    const precioTotalItem = producto.precio * cantidad;

    const item = {
      ...producto,
      talla: tallaSeleccionada,
      color: colorSeleccionado,
      cantidad: cantidad,
      precioUnitario: producto.precio,
      precio: precioTotalItem
    };

    addToCart(item);
    setMensaje(`¡${cantidad} ${cantidad === 1 ? 'unidad agregada' : 'unidades agregadas'} al carrito! 🛒`);

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
            {cantidad > 1 && (
              <span className="precio-total">
                Total: ${(producto.precio * cantidad).toLocaleString()}
              </span>
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

            {cantidadEnCarrito > 0 && (
              <div className="carrito-info">
                <p className="cantidad-carrito">
                  Ya tienes {cantidadEnCarrito} {cantidadEnCarrito === 1 ? 'unidad' : 'unidades'} en el carrito
                </p>
                <p className="precio-carrito">
                  Total en carrito: ${precioTotal.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <button 
            className="btn-carrito" 
            onClick={handleAgregarCarrito}
            disabled={!tallaSeleccionada}
          >
            🛒 {cantidadEnCarrito > 0 ? 'Agregar más al carrito' : 'Añadir al carrito'}
          </button>

          {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};

export default DetalleCatalogo;

