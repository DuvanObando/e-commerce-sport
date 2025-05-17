// src/pages/HistorialVentas.jsx

import React, { useState, useEffect } from "react";
import { obtenerVentas }           from "../service/ventaService";
import "../styles/HistorialVentas.css";

/**
 * HistorialVentas
 * ----------------
 * Página para que el empleado vea su historial de ventas.
 * - Ordena de más reciente a más antiguo.
 * - Muestra ID, fecha, cliente, total, estado, método de pago.
 * - Permite desplegar los productos con imagen y cantidad.
 */
export default function HistorialVentas() {
  const [ventas,  setVentas]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Formatea "2025-05-01" → "1 de mayo de 2025"
  const formatearFecha = fechaStr => {
    const opts = { day: "numeric", month: "long", year: "numeric" };
    return new Date(fechaStr).toLocaleDateString("es-ES", opts);
  };

  useEffect(() => {
    obtenerVentas()
      .then(data => {
        console.log("Ventas recibidas:", data);               // <-- comprueba en la consola
        const ordenadas = data.sort((a, b) =>
          new Date(b.fecha) - new Date(a.fecha)
        );
        setVentas(ordenadas);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar ventas:", err);
        setError("Hubo un error al cargar el historial de ventas.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="historial-container">
      <h2>Historial de Ventas</h2>

      {loading && <p>Cargando historial de ventas…</p>}

      {!loading && error && (
        <p className="error">{error}</p>
      )}

      {!loading && !error && ventas.length === 0 && (
        <p>No hay ventas registradas aún.</p>
      )}

      {!loading && !error && ventas.length > 0 && (
        <ul className="lista-ventas">
          {ventas.map(v => (
            <li key={v.id} className="venta-item">
              <p><strong>Venta:</strong> {v.id}</p>
              <p><strong>Fecha:</strong> {formatearFecha(v.fecha)}</p>
              <p><strong>Cliente:</strong> {v.cliente}</p>
              <p><strong>Total:</strong> ${v.total.toFixed(2)}</p>
              <p>
                <strong>Estado:</strong>{" "}
                <span className={`estado-tag ${v.estado.toLowerCase()}`}>
                  {v.estado}
                </span>
              </p>
              <p><strong>Método de pago:</strong> Pago contra entrega</p>

              <details>
                <summary>Ver productos</summary>
                <ul className="detalle-productos">
                  {v.productos.map(p => (
                    <li key={p.id} className="producto-item">
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="imagen-producto"
                      />
                      <span>{p.nombre} × {p.cantidad}</span>
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
}
