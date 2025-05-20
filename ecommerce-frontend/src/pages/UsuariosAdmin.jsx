import React, { useState } from "react";
import "../styles/UsuariosAdmin.css";

const UsuariosAdmin = () => {
  // Datos simulados de usuarios
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      correo: "juan@example.com",
      tipo: "CLIENTE",
      estado: "ACTIVO",
      fechaRegistro: "2024-01-15",
      direccion: "Calle 123 #45-67",
      telefono: "3001234567"
    },
    {
      id: 2,
      nombre: "María López",
      correo: "maria@example.com",
      tipo: "EMPLEADO",
      estado: "ACTIVO",
      fechaRegistro: "2024-02-01",
      direccion: "Carrera 78 #90-12",
      telefono: "3007654321"
    },
    {
      id: 3,
      nombre: "Carlos Rodríguez",
      correo: "carlos@example.com",
      tipo: "ADMINISTRADOR",
      estado: "ACTIVO",
      fechaRegistro: "2024-01-01",
      direccion: "Avenida 5 #23-45",
      telefono: "3009876543"
    },
    {
      id: 4,
      nombre: "Ana Martínez",
      correo: "ana@example.com",
      tipo: "CLIENTE",
      estado: "INACTIVO",
      fechaRegistro: "2024-03-01",
      direccion: "Calle 90 #12-34",
      telefono: "3004567890"
    }
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [modalDetalles, setModalDetalles] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalRol, setModalRol] = useState(false);

  // Filtrar usuarios por búsqueda
  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Manejadores de eventos
  const verDetalles = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalDetalles(true);
  };

  const cambiarRol = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalRol(true);
  };

  const handleCambiarRol = (nuevoRol) => {
    setUsuarios(usuarios.map(usuario => 
      usuario.id === usuarioSeleccionado.id 
        ? { ...usuario, tipo: nuevoRol }
        : usuario
    ));
    setModalRol(false);
  };

  const handleEliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const handleCambiarEstado = (id) => {
    setUsuarios(usuarios.map(usuario => 
      usuario.id === id 
        ? { ...usuario, estado: usuario.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO" }
        : usuario
    ));
  };

  return (
    <div className="usuarios-admin-container">
      <h1>👥 Gestión de Usuarios</h1>
      
      <div className="usuarios-barra">
        <input
          type="text"
          placeholder="🔍 Buscar usuario por nombre o correo..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <div className="usuarios-lista">
        {usuariosFiltrados.length === 0 ? (
          <p className="usuarios-vacio">No se encontraron usuarios.</p>
        ) : (
          usuariosFiltrados.map(usuario => (
            <div key={usuario.id} className="usuario-card">
              <div className="usuario-info">
                <h3>{usuario.nombre}</h3>
                <p className="usuario-correo">{usuario.correo}</p>
                <p className="usuario-tipo">Tipo: {usuario.tipo}</p>
                <p className={`usuario-estado ${usuario.estado.toLowerCase()}`}>
                  Estado: {usuario.estado}
                </p>
                <p className="usuario-fecha">
                  Registro: {new Date(usuario.fechaRegistro).toLocaleDateString()}
                </p>
              </div>
              <div className="usuario-acciones">
                <button onClick={() => verDetalles(usuario)}>Ver detalles</button>
                <button onClick={() => cambiarRol(usuario)}>Cambiar rol</button>
                <button 
                  onClick={() => handleCambiarEstado(usuario.id)}
                  className={usuario.estado === "ACTIVO" ? "desactivar" : "activar"}
                >
                  {usuario.estado === "ACTIVO" ? "Desactivar" : "Activar"}
                </button>
                <button 
                  className="eliminar"
                  onClick={() => handleEliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Detalles */}
      {modalDetalles && usuarioSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalles del Usuario</h2>
            <div className="detalles-usuario">
              <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
              <p><strong>Correo:</strong> {usuarioSeleccionado.correo}</p>
              <p><strong>Tipo:</strong> {usuarioSeleccionado.tipo}</p>
              <p><strong>Estado:</strong> {usuarioSeleccionado.estado}</p>
              <p><strong>Fecha de registro:</strong> {
                new Date(usuarioSeleccionado.fechaRegistro).toLocaleDateString()
              }</p>
              <p><strong>Dirección:</strong> {usuarioSeleccionado.direccion}</p>
              <p><strong>Teléfono:</strong> {usuarioSeleccionado.telefono}</p>
            </div>
            <button onClick={() => setModalDetalles(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal de Cambio de Rol */}
      {modalRol && usuarioSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cambiar Rol de Usuario</h2>
            <div className="cambio-rol">
              <p>Usuario: {usuarioSeleccionado.nombre}</p>
              <select 
                defaultValue={usuarioSeleccionado.tipo}
                onChange={(e) => handleCambiarRol(e.target.value)}
              >
                <option value="CLIENTE">Cliente</option>
                <option value="EMPLEADO">Empleado</option>
                <option value="ADMINISTRADOR">Administrador</option>
              </select>
              <div className="modal-botones">
                <button onClick={() => setModalRol(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosAdmin; 