import React from "react";
import "../styles/AdminDashboard.css"; // Importamos los estilos CSS para el admin

// Componente del panel de administrador
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración 👨‍💼</h1>
      <p>Control total del sistema, gestión y reportes.</p>

      <ul className="admin-opciones">
        <li>🛠️ Gestionar productos</li>
        <li>👥 Gestionar usuarios</li>
        <li>📦 Monitorear pedidos</li>
        <li>📊 Ver reportes</li>
        <li>🏷️ Gestionar promociones y cupones</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;