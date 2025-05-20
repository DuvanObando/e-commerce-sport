import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ContactarSoporte.css';

const ContactarSoporte = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: 'consulta',
    asunto: '',
    descripcion: '',
    pedidoId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la solicitud al backend
    alert('Solicitud enviada con éxito. Nos pondremos en contacto contigo pronto.');
    navigate('/seguimiento');
  };

  return (
    <div className="contactar-soporte-container">
      <div className="soporte-header">
        <button className="back-button" onClick={() => navigate('/seguimiento')}>
          ← Volver al Seguimiento
        </button>
        <h1>Contactar Soporte</h1>
        <p className="subtitle">¿Necesitas ayuda? Estamos aquí para asistirte</p>
      </div>

      <div className="soporte-form-container">
        <form onSubmit={handleSubmit} className="soporte-form">
          <div className="form-group">
            <label htmlFor="tipo">Tipo de Solicitud</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="consulta">Consulta General</option>
              <option value="queja">Queja</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="garantia">Garantía</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              placeholder="Breve descripción del problema"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pedidoId">Número de Pedido (opcional)</label>
            <input
              type="text"
              id="pedidoId"
              name="pedidoId"
              value={formData.pedidoId}
              onChange={handleChange}
              placeholder="Ej: #12345"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción Detallada</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Por favor, describe tu problema o consulta en detalle"
              rows="5"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/seguimiento')}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Enviar Solicitud
            </button>
          </div>
        </form>

        <div className="soporte-info">
          <h3>Información de Contacto</h3>
          <div className="info-item">
            <span className="icon">📧</span>
            <p>soporte@ecommerce.com</p>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <p>+57 300 123 4567</p>
          </div>
          <div className="info-item">
            <span className="icon">⏰</span>
            <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactarSoporte; 