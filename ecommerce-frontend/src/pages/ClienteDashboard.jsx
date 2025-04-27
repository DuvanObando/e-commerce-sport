import React from "react";
import "../styles/ClienteDashboard.css"; // Importamos los estilos específicos

// Componente del panel de cliente
const ClienteDashboard = () => {
  return (
    <div className="cliente-dashboard">
      <h1>Bienvenido al panel del Cliente 🛍️</h1>
      <p>Aquí podrás ver tus compras, hacer pedidos, dejar reseñas y más.</p>

      <ul className="cliente-opciones">
        <li>🛒 Ver catálogo de productos</li>
        <li>📦 Seguimiento de pedidos</li>
        <li>🧾 Historial de compras</li>
        <li>💬 Dejar una reseña</li>
        <li>🔄 Solicitar devoluciones</li>
      </ul>
    </div>
  );
};

export default ClienteDashboard;