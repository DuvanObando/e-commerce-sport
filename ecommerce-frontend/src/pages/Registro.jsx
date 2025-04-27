import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Registro.css"; // Importamos los estilos
import { registrarUsuario } from "../service/UsuarioService"; // Importamos el servicio

const Registro = () => {

  const navigate = useNavigate(); // Hook para la navegación

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState(""); // Estado para mostrar mensajes al usuario

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Llamamos a la función del servicio para registrar el usuario
    const resultado = await registrarUsuario(nombre, correo, contrasena, direccion, telefono);

    // Si el registro es exitoso, redirigir al Home después de 2 segundos
    if (resultado.success) {
      setMensaje("Registro exitoso. Redirigiendo al inicio...");
      setTimeout(() => navigate("/Inicio"), 2000);
    } else {
      setMensaje(resultado.message);
    }
  };

  return (
    <div className="register-container">
      {/* Sección Izquierda - Imagen */}
      <div className="register-left">
        <h2>Sport Store</h2>
      </div>

      {/* Sección Derecha - Formulario */}
      <div className="register-right">
        <h2 className="register-title">Registro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
          <input type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />

          {/* Botones */}
          <div className="buttons">
            <button type="button" 
            className="cancel-btn"
            onClick={() => 
            navigate("/")}>CANCELAR
            </button> {/* Redirige al Home */}
            <button type="submit" className="confirm-btn">CONFIRMAR</button>
          </div>
        </form>

        {/* Mostrar mensaje de éxito o error */}
        {mensaje && <p className="mensaje">{mensaje}</p>}

        <p className="registro-text">¿Ya tienes una cuenta? <Link to="/inicio">Inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default Registro;