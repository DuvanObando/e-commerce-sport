import React from "react";
import "../styles/EmpleadoDashboard.css"; // Importamos el CSS de estilos

// Componente del panel del empleado
const EmpleadoDashboard = () => {
  return (
    <div className="empleado-dashboard">
      <h1>Panel del Empleado 🧑‍🔧</h1>
      <p>Gestiona tus tareas administrativas y de soporte.</p>

      <ul className="empleado-opciones">
        <li>📬 Responder consultas (PQRs)</li>
        <li>📈 Ver historial de ventas</li>
        <li>🧾 Ver historial de compras</li>
        <li>🆘 Solicitar ayuda interna</li>
      </ul>
    </div>
  );
};

export default EmpleadoDashboard;