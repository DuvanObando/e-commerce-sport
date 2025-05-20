// src/pages/HistorialCompras.jsx
import React, { useEffect, useState } from "react";
import "../styles/HistorialCompras.css";
import { HistorialService } from "../service/HistorialService";

/**
 * Componente para mostrar un producto individual en el historial
 */
const ProductoHistorial = ({ producto }) => (
  <div className="producto-item">
    <div className="producto-info">
      <h5>{producto.nombre}</h5>
      <div className="producto-detalles">
        <span className="producto-cantidad">
          Cantidad: {producto.cantidad}
        </span>
      </div>
      <div className="producto-precios">
        <span className="precio-unitario">
          ${producto.precio?.toLocaleString()} c/u
        </span>
        <span className="precio-total">
          ${(producto.precio * producto.cantidad)?.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
);

/**
 * Componente para mostrar la sección de productos de una compra
 */
const SeccionProductos = ({ productos }) => {
  const lista = productos || [];
  return (
    <div className="compra-productos">
      <h4>🛍 Productos ({lista.length})</h4>
      <div className="productos-lista">
        {lista.map((producto, index) => (
          <ProductoHistorial key={index} producto={producto} />
        ))}
      </div>
      <div className="productos-resumen">
        <p className="productos-total">
          Total de productos: {lista.reduce((sum, p) => sum + p.cantidad, 0)}
        </p>
      </div>
    </div>
  );
};

/**
 * Componente principal del historial de compras
 */
const HistorialCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        // Por ahora usamos el ID 1 como ejemplo, después se debe obtener del usuario logueado
        const historial = await HistorialService.obtenerHistorialCompras(1);
        setCompras(historial.data || []);
      } catch (error) {
        setError('Error al cargar el historial de compras');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarHistorial();
  }, []);

  const formatearFecha = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    return isNaN(fecha) ? "" : fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="historial-container">
        <h2>📄 Historial de Compras</h2>
        <div className="loading">
          <p>Cargando historial de compras...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="historial-container">
        <h2>📄 Historial de Compras</h2>
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="historial-container">
      <h2>📄 Historial de Compras</h2>

      {compras.length === 0 ? (
        <div className="sin-compras">
          <p>No tienes compras registradas aún.</p>
          <small>Tus compras aparecerán aquí cuando realices pedidos.</small>
        </div>
      ) : (
        <div className="lista-compras">
          {compras.map((compra) => (
            <div key={compra.pedido_id} className="compra-item">
              <div className="compra-header">
                <div className="compra-info-principal">
                  <h3>Pedido #{compra.pedido_id}</h3>
                  <span className={`estado-tag ${compra.estado?.toLowerCase()}`}>
                    {compra.estado}
                  </span>
                </div>
                <div className="compra-fecha">
                  {formatearFecha(compra.fecha_pedido)}
                </div>
              </div>

              <div className="compra-detalles">
                <SeccionProductos productos={compra.detalles} />

                <div className="compra-resumen">
                  <div className="resumen-pago">
                    <p><strong>Método de pago:</strong> Pago contra entrega</p>
                    <p className="total">
                      <strong>Total:</strong> ${compra.total?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorialCompras;
