// src/pages/HistorialCompras.jsx
import React, { useEffect, useState } from "react";
import "../styles/HistorialCompras.css";
import { obtenerHistorialCompras } from "../service/HistorialService";

/**
 * Muestra el historial de compras del cliente.
 * Incluye número de pedido, fecha, total, estado, cantidad de productos y sus imágenes.
 */
const HistorialCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Convierte una fecha en formato legible (ej: 2 de mayo de 2025)
   */
  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Carga el historial al montar el componente
  useEffect(() => {
    obtenerHistorialCompras()
      .then((comprasObtenidas) => {
        setCompras(comprasObtenidas);
        setLoading(false);
      })
      .catch(() => {
        setError("Hubo un error al cargar el historial.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="historial-container">
      <h2>📄 Historial de Compras</h2>

      {loading && <p>Cargando historial...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && compras.length === 0 && <p>No tienes compras registradas aún.</p>}

      {!loading && compras.length > 0 && (
        <ul className="lista-compras">
          {compras.map((compra) => (
            <li key={compra.id} className="compra-item">
              <div>
                <strong>Pedido:</strong> {compra.numeroPedido} <br />
                <strong>Fecha:</strong> {formatearFecha(compra.fecha)} <br />
                <strong>Total:</strong> ${compra.total} <br />
                <strong>Total productos:</strong>{" "}
                {compra.productos.reduce((acc, p) => acc + p.cantidad, 0)} <br />
                <strong>Estado:</strong>{" "}
                <span className={`estado-tag ${compra.estado.toLowerCase()}`}>
                  {compra.estado}
                </span>
                <br />
              </div>

              {/* Lista de productos con imagen y cantidad */}
              <details>
                <summary>📄 Ver productos</summary>
                <ul className="detalle-productos">
                  {compra.productos.map((p, index) => (
                    <li key={index} className="producto-item">
                      {/*Imagen del producto */}
                      {p.imagen && (
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          className="imagen-producto"
                        />
                      )}
                      {p.nombre} × {p.cantidad}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorialCompras;
