import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iniciarSesion } from "../service/InicioService"; // Importamos el servicio de autenticación
import "../styles/Inicio.css"; // Importamos los estilos

const Inicio = () => {

  const navigate = useNavigate(); // Para redirigir después del login

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recuerdame, setRecuerdame] = useState(false);
  const [mensaje, setMensaje] = useState(""); // Para mostrar errores o confirmaciones

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Correo:", correo, "Contraseña:", contrasena, "Recordar:", recuerdame);
    
     // Llamamos a la función de autenticación
     const resultado = await iniciarSesion(correo, contrasena);

  // Si el login es exitoso, redirigimos al Home después de 2 segundos
  if (resultado.success) {
    setMensaje("Inicio de sesión exitoso. Redirigiendo...");
    
    const tipoUsuario = resultado.usuario?.tipo || "";
    
    // Redirigir según el tipo
    setTimeout(() => {
      if (tipoUsuario === "ADMINISTRADOR") navigate("/admin");
      else if (tipoUsuario === "EMPLEADO") navigate("/empleado");
      else if (tipoUsuario === "CLIENTE") navigate("/cliente");
      else navigate("/");
    }, 2000);

  } else {
    setMensaje(resultado.message);
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Correo" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              required 
            />
            <span className="icon">📧</span>
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={contrasena} 
              onChange={(e) => setContrasena(e.target.value)} 
              required 
            />
            <span className="icon">🔒</span>
          </div>
          <div className="extra-options">
            <label>
              <input 
                type="checkbox" 
                checked={recuerdame} 
                onChange={(e) => setRecuerdame(e.target.checked)} 
              />
              Recordarme
            </label>
            <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
          </div>
          <button type="submit" className="login-btn">Ingresar</button>
          <p className="login-text">No tienes cuenta? <Link to="/registro">Registro</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Inicio;