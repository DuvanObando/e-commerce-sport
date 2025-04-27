import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsuarioAutenticado } from "../utils/auth";
import { cerrarSesion } from "../service/InicioService"; // Usamos la función de logout
import "../styles/Navbar.css";
 
const Navbar = () => {
    const usuario = getUsuarioAutenticado();
    const tipo = usuario?.tipo;
    const nombre = usuario?.nombre;
    const navigate = useNavigate();
  
    const [mostrarMenu, setMostrarMenu] = useState(false);
  
    const handleLogout = () => {
      cerrarSesion(); // Limpiar localStorage
      navigate("/inicio"); // Redirigir
    };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">Sports Store</div>
        <ul className="nav-links">
          <li><Link to="/">🏠 Home</Link></li>

          {tipo === "CLIENTE" && (
            <>
              <li><Link to="/catalogo">🛍️ Catálogo</Link></li>
              <li><Link to="/historial">📄 Compras</Link></li>
              <li><Link to="/seguimiento">📦 Seguimiento</Link></li>
            </>
          )}

          {tipo === "EMPLEADO" && (
            <>
              <li><Link to="/empleado/pqrs">📬 PQRs</Link></li>
              <li><Link to="/empleado/ventas">📈 Ventas</Link></li>
            </>
          )}

          {tipo === "ADMINISTRADOR" && (
            <>
              <li><Link to="/admin/productos">🛠️ Productos</Link></li>
              <li><Link to="/admin/usuarios">👥 Usuarios</Link></li>
              <li><Link to="/admin/reportes">📊 Reportes</Link></li>
            </>
          )}

          {!tipo && (
            <>
              <li><Link to="/inicio">🔐 Iniciar sesión</Link></li>
              <li><Link to="/registro">📝 Registro</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Íconos a la derecha */}
      <div className="navbar-icons">
        <span title="Buscar">🔍</span>
        {tipo === "CLIENTE" && <Link to="/carrito" title="Carrito">🛒</Link>}
        
        {tipo ? (
          <div className="cuenta-dropdown" onClick={() => setMostrarMenu(!mostrarMenu)}>
            👤
            {mostrarMenu && (
              <div className="cuenta-menu">
                <p>👋 {nombre}</p>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/inicio" title="Mi cuenta">👤</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;