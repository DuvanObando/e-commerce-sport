import React, { useState } from 'react';
import '../styles/SoporteAdmin.css';

const SoporteAdmin = () => {
  // Datos simulados
  const [solicitudes] = useState([
    {
      id: 1,
      tipo: 'queja',
      estado: 'pendiente',
      cliente: 'Juan Pérez',
      correo: 'juan@email.com',
      fecha: '2024-03-15',
      asunto: 'Producto defectuoso',
      descripcion: 'El producto llegó dañado y no funciona correctamente.',
      pedido: 'ORD-001',
      empleadoAsignado: null,
      respuesta: null
    },
    {
      id: 2,
      tipo: 'reclamo',
      estado: 'en_proceso',
      cliente: 'María García',
      correo: 'maria@email.com',
      fecha: '2024-03-14',
      asunto: 'Retraso en entrega',
      descripcion: 'Mi pedido lleva más de 5 días de retraso.',
      pedido: 'ORD-002',
      empleadoAsignado: 'Carlos López',
      respuesta: 'Estamos investigando el retraso de su pedido.'
    },
    {
      id: 3,
      tipo: 'sugerencia',
      estado: 'resuelto',
      cliente: 'Ana Martínez',
      correo: 'ana@email.com',
      fecha: '2024-03-13',
      asunto: 'Mejora en la app',
      descripcion: 'Sugerencia para agregar más filtros en el catálogo.',
      pedido: null,
      empleadoAsignado: 'Laura Sánchez',
      respuesta: 'Gracias por su sugerencia. La implementaremos en la próxima actualización.'
    }
  ]);

  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [respuesta, setRespuesta] = useState('');

  // Datos simulados de empleados
  const empleados = [
    { id: 1, nombre: 'Carlos López' },
    { id: 2, nombre: 'Laura Sánchez' },
    { id: 3, nombre: 'Pedro Gómez' }
  ];

  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    const cumpleTipo = filtroTipo === 'todos' || solicitud.tipo === filtroTipo;
    const cumpleEstado = filtroEstado === 'todos' || solicitud.estado === filtroEstado;
    return cumpleTipo && cumpleEstado;
  });

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cambiarEstado = (nuevoEstado) => {
    if (solicitudSeleccionada) {
      const solicitudActualizada = {
        ...solicitudSeleccionada,
        estado: nuevoEstado
      };
      setSolicitudSeleccionada(solicitudActualizada);
    }
  };

  const asignarEmpleado = (empleadoId) => {
    if (solicitudSeleccionada) {
      const empleado = empleados.find(emp => emp.id === parseInt(empleadoId));
      const solicitudActualizada = {
        ...solicitudSeleccionada,
        empleadoAsignado: empleado ? empleado.nombre : null
      };
      setSolicitudSeleccionada(solicitudActualizada);
    }
  };

  const enviarRespuesta = () => {
    if (solicitudSeleccionada && respuesta.trim()) {
      const solicitudActualizada = {
        ...solicitudSeleccionada,
        respuesta: respuesta.trim(),
        estado: 'resuelto'
      };
      setSolicitudSeleccionada(solicitudActualizada);
      setRespuesta('');
    }
  };

  return (
    <div className="soporte-admin-container">
      <h1>Sistema de Soporte y PQR</h1>

      {/* Filtros */}
      <div className="filtros">
        <div className="filtro-grupo">
          <label>Tipo de Solicitud</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="queja">Queja</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
            <option value="garantia">Garantía</option>
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Estado</label>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En Proceso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="solicitudes-lista">
        {solicitudesFiltradas.map(solicitud => (
          <div
            key={solicitud.id}
            className={`solicitud-card ${solicitudSeleccionada?.id === solicitud.id ? 'seleccionada' : ''}`}
            onClick={() => setSolicitudSeleccionada(solicitud)}
          >
            <div className="solicitud-header">
              <span className={`tipo-badge ${solicitud.tipo}`}>
                {solicitud.tipo.charAt(0).toUpperCase() + solicitud.tipo.slice(1)}
              </span>
              <span className={`estado-badge ${solicitud.estado}`}>
                {solicitud.estado.replace('_', ' ').charAt(0).toUpperCase() + solicitud.estado.slice(1)}
              </span>
            </div>
            <div className="solicitud-info">
              <h3>{solicitud.asunto}</h3>
              <p>Cliente: {solicitud.cliente}</p>
              <p>Fecha: {formatearFecha(solicitud.fecha)}</p>
              {solicitud.empleadoAsignado && (
                <p>Asignado a: {solicitud.empleadoAsignado}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Panel de detalles */}
      {solicitudSeleccionada && (
        <div className="detalles-panel">
          <div className="panel-header">
            <h2>Detalles de la Solicitud</h2>
            <button className="cerrar-btn" onClick={() => setSolicitudSeleccionada(null)}>×</button>
          </div>

          <div className="detalles-contenido">
            <div className="info-cliente">
              <h3>Información del Cliente</h3>
              <p>Nombre: {solicitudSeleccionada.cliente}</p>
              <p>Correo: {solicitudSeleccionada.correo}</p>
              {solicitudSeleccionada.pedido && (
                <p>Pedido: {solicitudSeleccionada.pedido}</p>
              )}
            </div>

            <div className="descripcion">
              <h3>Descripción</h3>
              <p>{solicitudSeleccionada.descripcion}</p>
            </div>

            <div className="acciones">
              <div className="accion-grupo">
                <label>Cambiar Estado</label>
                <select
                  value={solicitudSeleccionada.estado}
                  onChange={(e) => cambiarEstado(e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="resuelto">Resuelto</option>
                </select>
              </div>

              <div className="accion-grupo">
                <label>Asignar Empleado</label>
                <select
                  value={empleados.find(emp => emp.nombre === solicitudSeleccionada.empleadoAsignado)?.id || ''}
                  onChange={(e) => asignarEmpleado(e.target.value)}
                >
                  <option value="">Sin asignar</option>
                  {empleados.map(empleado => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {solicitudSeleccionada.respuesta ? (
              <div className="respuesta-previa">
                <h3>Respuesta Anterior</h3>
                <p>{solicitudSeleccionada.respuesta}</p>
              </div>
            ) : (
              <div className="respuesta-form">
                <h3>Responder</h3>
                <textarea
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  rows="4"
                />
                <button
                  className="enviar-btn"
                  onClick={enviarRespuesta}
                  disabled={!respuesta.trim()}
                >
                  Enviar Respuesta
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoporteAdmin; 