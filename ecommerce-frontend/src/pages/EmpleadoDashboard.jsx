// src/pages/EmpleadoDashboard.jsx

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/EmpleadoDashboard.css";

const EmpleadoDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="empleado-dashboard">
      <h1>Panel del Empleado 🧑‍🔧</h1>
      <p>Gestiona tus tareas administrativas y de soporte.</p>

      <ul className="empleado-opciones">
        <li onClick={() => navigate('/responder-pqrs')}> 📬 Responder consultas (PQRs)</li>
        <li><Link to="/empleado/ventas">📈 Ver historial de ventas</Link></li>
        <li>🧾 Ver historial de compras</li>
        <li>🆘 Solicitar ayuda interna</li>
      </ul>
    </div>
  );
};

export default EmpleadoDashboard;
