import React, { useState } from "react";
import "../styles/ReportesAdmin.css";

const ReportesAdmin = () => {
  // Datos simulados para los reportes
  const [ventasPorFecha] = useState([
    { fecha: "2024-03-01", total: 1500, cantidad: 15 },
    { fecha: "2024-03-02", total: 2300, cantidad: 23 },
    { fecha: "2024-03-03", total: 1800, cantidad: 18 },
    { fecha: "2024-03-04", total: 2100, cantidad: 21 },
    { fecha: "2024-03-05", total: 1900, cantidad: 19 }
  ]);

  const [productosMasVendidos] = useState([
    { id: 1, nombre: "Camiseta Deportiva", ventas: 150, total: 4500 },
    { id: 2, nombre: "Zapatillas Running", ventas: 120, total: 7200 },
    { id: 3, nombre: "Pantalón Deportivo", ventas: 100, total: 3000 },
    { id: 4, nombre: "Raqueta de Tenis", ventas: 80, total: 4000 },
    { id: 5, nombre: "Balón de Fútbol", ventas: 75, total: 1500 }
  ]);

  const [usuariosActivos] = useState([
    { id: 1, nombre: "Juan Pérez", compras: 15, total: 4500 },
    { id: 2, nombre: "María López", compras: 12, total: 3600 },
    { id: 3, nombre: "Carlos Rodríguez", compras: 10, total: 3000 },
    { id: 4, nombre: "Ana Martínez", compras: 8, total: 2400 },
    { id: 5, nombre: "Pedro Gómez", compras: 7, total: 2100 }
  ]);

  const [resenasAltas] = useState([
    { id: 1, producto: "Camiseta Deportiva", usuario: "Juan Pérez", calificacion: 5, comentario: "Excelente calidad" },
    { id: 2, producto: "Zapatillas Running", usuario: "María López", calificacion: 5, comentario: "Muy cómodas" },
    { id: 3, producto: "Pantalón Deportivo", usuario: "Carlos Rodríguez", calificacion: 5, comentario: "Perfecto ajuste" },
    { id: 4, producto: "Raqueta de Tenis", usuario: "Ana Martínez", calificacion: 5, comentario: "Excelente producto" },
    { id: 5, producto: "Balón de Fútbol", usuario: "Pedro Gómez", calificacion: 5, comentario: "Muy buena calidad" }
  ]);

  // Función para formatear fechas
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Función para formatear moneda
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP"
    }).format(valor);
  };

  return (
    <div className="reportes-container">
      <h1>📊 Reportes Administrativos</h1>

      {/* Ventas por Fecha */}
      <section className="reporte-section">
        <h2>📈 Ventas por Fecha</h2>
        <div className="reporte-grid">
          {ventasPorFecha.map((venta, index) => (
            <div key={index} className="reporte-card">
              <h3>{formatearFecha(venta.fecha)}</h3>
              <p className="total">Total: {formatearMoneda(venta.total)}</p>
              <p className="cantidad">Pedidos: {venta.cantidad}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productos más Vendidos */}
      <section className="reporte-section">
        <h2>🏆 Productos más Vendidos</h2>
        <div className="tabla-container">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Unidades Vendidas</th>
                <th>Total Ventas</th>
              </tr>
            </thead>
            <tbody>
              {productosMasVendidos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.ventas}</td>
                  <td>{formatearMoneda(producto.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usuarios más Activos */}
      <section className="reporte-section">
        <h2>👥 Usuarios más Activos</h2>
        <div className="tabla-container">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Compras Realizadas</th>
                <th>Total Gastado</th>
              </tr>
            </thead>
            <tbody>
              {usuariosActivos.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.compras}</td>
                  <td>{formatearMoneda(usuario.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reseñas más Altas */}
      <section className="reporte-section">
        <h2>⭐ Reseñas más Altas</h2>
        <div className="resenas-grid">
          {resenasAltas.map((resena) => (
            <div key={resena.id} className="resena-card">
              <div className="resena-header">
                <h3>{resena.producto}</h3>
                <span className="calificacion">{"★".repeat(resena.calificacion)}</span>
              </div>
              <p className="usuario">Por: {resena.usuario}</p>
              <p className="comentario">{resena.comentario}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReportesAdmin; 