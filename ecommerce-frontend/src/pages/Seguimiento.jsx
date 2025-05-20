import { useEffect, useState } from "react";
import { HistorialService } from "../service/HistorialService";
import "../styles/Seguimiento.css";
import { useNavigate } from "react-router-dom";

export default function Seguimiento() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const historial = await HistorialService.obtenerHistorialCompras(1);
        const pedidosData = historial.data || [];
        setPedidos(pedidosData);
        if (pedidosData.length > 0) {
          setPedidoSeleccionado(pedidosData[0]); // Selecciona el más reciente por defecto
        }
      } catch (err) {
        setError("No se pudo cargar el seguimiento de los pedidos");
      } finally {
        setLoading(false);
      }
    };
    cargarPedidos();
  }, []);

  const obtenerEstadoEspanol = (estado) => {
    const estados = {
      'pendiente': 'Pendiente',
      'procesando': 'Procesando',
      'enviado': 'Enviado',
      'entregado': 'Entregado'
    };
    return estados[estado?.toLowerCase()] || estado;
  };

  if (loading) {
    return (
      <div className="order-tracking-container">
        <p>Cargando información de los pedidos...</p>
      </div>
    );
  }

  if (error || pedidos.length === 0) {
    return (
      <div className="order-tracking-container">
        <h1 className="page-title">No hay pedidos recientes</h1>
        <p>{error || "Realiza una compra para ver el seguimiento de tu pedido."}</p>
      </div>
    );
  }

  return (
    <div className="order-tracking-container">
      <h1 className="page-title">Seguimiento de tu Pedido {pedidoSeleccionado && <span className="order-id">#{pedidoSeleccionado.pedido_id}</span>}</h1>

      {/* Lista de pedidos recientes */}
      <div className="pedidos-lista-seguimiento">
        <h2 className="section-title">Pedidos recientes</h2>
        <ul>
          {pedidos.map((p) => (
            <li
              key={p.pedido_id}
              className={pedidoSeleccionado?.pedido_id === p.pedido_id ? "pedido-seleccionado" : ""}
              onClick={() => setPedidoSeleccionado(p)}
              style={{ cursor: "pointer", fontWeight: pedidoSeleccionado?.pedido_id === p.pedido_id ? "bold" : "normal" }}
            >
              Pedido #{p.pedido_id} - {new Date(p.fecha_pedido).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
            </li>
          ))}
        </ul>
      </div>

      {/* Detalle del pedido seleccionado */}
      {pedidoSeleccionado && (
        <>
          <div className="status-card">
            <h2 className="section-title">Estado del Envío</h2>
            <div className="progress-bar">
              {["pendiente", "procesando", "enviado", "entregado"].map((step, idx) => (
                <div
                  key={step}
                  className={`progress-step ${pedidoSeleccionado.estado?.toLowerCase() === step ? "active" : ""} ${step === "entregado" && pedidoSeleccionado.estado?.toLowerCase() === "entregado" ? "completed" : ""}`}
                >
                  <div className="step-icon">
                    {pedidoSeleccionado.estado?.toLowerCase() === step || (step === "entregado" && pedidoSeleccionado.estado?.toLowerCase() === "entregado") ? (
                      <span className="active-icon">✓</span>
                    ) : (
                      <span className="inactive-icon">{idx + 1}</span>
                    )}
                  </div>
                  <p className="step-label">
                    {obtenerEstadoEspanol(step)}
                  </p>
                </div>
              ))}
            </div>
            <div className="shipping-details">
              <div className="detail-item">
                <span className="detail-label">Número de Pedido:</span>
                <span className="detail-value">{pedidoSeleccionado.pedido_id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Fecha del Pedido:</span>
                <span className="detail-value">
                  {pedidoSeleccionado.fecha_pedido && new Date(pedidoSeleccionado.fecha_pedido).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Método de Pago:</span>
                <span className="detail-value">Pago contra entrega</span>
              </div>
            </div>
          </div>

          <div className="products-card">
            <h2 className="section-title">Tus Productos</h2>
            <div className="products-list">
              {pedidoSeleccionado.detalles.map((producto, idx) => (
                <div key={idx} className="product-item">
                  <div className="product-info">
                    <h3 className="product-name">{producto.nombre}</h3>
                    <p className="product-quantity">Cantidad: {producto.cantidad}</p>
                    <p className="product-price">${producto.precio?.toLocaleString()} c/u</p>
                  </div>
                  <div className="product-total">
                    ${(producto.precio * producto.cantidad)?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <div className="total">
                <span className="total-label">Total del Pedido:</span>
                <span className="total-amount">${pedidoSeleccionado.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Botón de acción (opcional) */}
          <div className="action-buttons">
            <button
              className="btn-primary"
              onClick={() => pedidoSeleccionado && navigate('/factura', { state: pedidoSeleccionado })}
            >
              Ver Factura
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/soporte')}
            >
              Contactar Soporte
            </button>
          </div>
        </>
      )}
    </div>
  );
}