// src/pages/Factura.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Factura.css";
import { ClienteService } from "../service/ClienteService";

const Factura = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const datos = location.state || {
    pedido_id: Math.floor(Math.random() * 100000),
    fecha_pedido: new Date().toISOString().split("T")[0],
    cliente: {
      nombre: "María García Martínez",
      direccion: "Calle 123 #45-67, Bogotá",
      telefono: "3001234567",
      correo: "maria@example.com",
    },
    clienteId: 1, // Por defecto, puedes cambiarlo
    detalles: [],
    metodo_pago: "Pago contra entrega",
    estado: "Pendiente",
    subtotal: 0,
    total: 0
  };

  const [cliente, setCliente] = useState(datos.cliente || null);

  useEffect(() => {
    const cargarCliente = async () => {
      if (!cliente && datos.clienteId) {
        try {
          const clienteData = await ClienteService.obtenerClientePorId(datos.clienteId);
          setCliente(clienteData);
        } catch (e) {
          setCliente({ nombre: "-", direccion: "-", telefono: "-", correo: "-" });
        }
      }
    };
    cargarCliente();
    // eslint-disable-next-line
  }, []);

  const subtotal = (datos.detalles || []).reduce((sum, p) => {
    if (p.precioUnitario && p.cantidad) {
      return sum + (p.precioUnitario * p.cantidad);
    } else if (p.precio && p.cantidad) {
      return sum + (p.precio * p.cantidad);
    } else if (p.precio) {
      return sum + p.precio;
    }
    return sum;
  }, 0);

  return (
    <div className="factura-container">
      <div className="factura-box">
        <h1>🧾 Factura de Compra</h1>

        <div className="factura-info">
          <p><strong>Número de Pedido:</strong> #{datos.pedido_id}</p>
          <p><strong>Fecha:</strong> {datos.fecha_pedido}</p>
          <p><strong>Estado:</strong> {datos.estado}</p>
        </div>

        <div className="factura-cliente">
          <h3>👤 Datos del Cliente</h3>
          <p><strong>Nombre:</strong> {(cliente?.nombre || datos.cliente?.nombre) ?? "-"}</p>
          <p><strong>Dirección:</strong> {(cliente?.direccion || datos.cliente?.direccion) ?? "-"}</p>
          <p><strong>Teléfono:</strong> {(cliente?.telefono || datos.cliente?.telefono) ?? "-"}</p>
          <p><strong>Correo:</strong> {(cliente?.correo || datos.cliente?.correo) ?? "-"}</p>
        </div>

        <div className="factura-detalle">
          <h3>🛍 Productos</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {(datos.detalles || []).map((p, index) => {
                const precioUnit = p.precioUnitario || p.precio || 0;
                const cantidad = p.cantidad || 1;
                const totalProd = precioUnit * cantidad;
                return (
                  <tr key={index}>
                    <td>{p.nombre}</td>
                    <td>{cantidad}</td>
                    <td>${precioUnit?.toLocaleString()}</td>
                    <td>${totalProd?.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="factura-total">
          <p><strong>Subtotal:</strong> ${subtotal?.toLocaleString()}</p>
          <p><strong>Método de Pago:</strong> Pago contra entrega</p>
          <p className="total-final"><strong>Total:</strong> ${datos.total?.toLocaleString()}</p>
        </div>

        <div className="factura-acciones">
          <button onClick={() => window.print()} className="imprimir-btn">
            🖨️ Imprimir Factura
          </button>
          <button onClick={() => navigate("/")} className="volver-btn">
            🏠 Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Factura;