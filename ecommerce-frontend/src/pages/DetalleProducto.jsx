  import React, { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { crearPedido } from "../service/PedidoService"; // ✅ nuevo servicio
  import articulo1 from "../assets/articulo1.jpg";
  import articulo2 from "../assets/articulo2.jpg";
  import articulo3 from "../assets/articulo3.jpg";
import "../styles/DetalleProducto.css"; 


  const productos = [
    {
      id: 1,
      nombre: "Air Jordan 5 Retro",
      precio: 180,
      imagen: articulo1,
      descripcion: "Tallas: 38, 40, 42",
    },
    {
      id: 2,
      nombre: "Raqueta de Tennis",
      precio: 130,
      imagen: articulo2,
      descripcion: "Tallas: L2, L3, L4",
    },
    {
      id: 3,
      nombre: "Gorro + Gafas de natación",
      precio: 210,
      imagen: articulo3,
      descripcion: "Tallas: S, M, L",
    },
  ];

  const DetalleProducto = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find((p) => p.id === parseInt(id));
  const [direccion, setDireccion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const clienteId = usuario?.tipo === "CLIENTE" ? usuario.id : null;

    if (!clienteId ) {
      setMensaje("Solo los clientes pueden realizar pedidos.");
      return;
    }

    const resultado = await crearPedido(clienteId, producto, direccion);

    if (resultado.success) {
      setMensaje("Compra realizada con éxito. Serás redirigido...");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setMensaje(`Error al procesar la compra: ${resultado.message}`);
    }
  };

  if (!producto) return <p>Producto no encontrado</p>;

    return (
      <div className="detalle-container">
        <img src={producto.imagen} alt={producto.nombre} className="detalle-img" />
        <h2>{producto.nombre}</h2>
        <p className="precio">${producto.precio.toFixed(2)}</p>
        <p>{producto.descripcion}</p>

        <form onSubmit={handleSubmit} className="formulario-pago">
          <label>Dirección de entrega:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />

          <label>Método de pago:</label>
          <input type="text" value="Contra entrega" disabled />

          <button type="submit">Confirmar compra</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    );
  };

  export default DetalleProducto;