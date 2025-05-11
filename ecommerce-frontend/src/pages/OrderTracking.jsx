import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Seguimiento.css"; // Importamos tus estilos personalizados

export default function OrderTracking() {
  // Datos mock (simulados) para el diseño
  const [order, setOrder] = useState({
    id: "12345",
    status: "processing", // pending, processing, shipped, delivered
    trackingNumber: "TRK-789012",
    estimatedDelivery: "2023-12-15",
    products: [
      { id: 1, name: "Zapatos Running", quantity: 2, price: 50, image: "https://via.placeholder.com/80" },
      { id: 2, name: "Camiseta Deportiva", quantity: 1, price: 20, image: "https://via.placeholder.com/80" },
    ],
    total: 120,
    shippingAddress: "Calle Falsa 123, Ciudad, País",
    paymentMethod: "Tarjeta de Crédito",
  });

  // Simula carga de datos (tu compañero lo reemplazará con axios)
  useEffect(() => {
    console.log("Llamada al backend para obtener el pedido");
  }, []);

  return (
    <div className="order-tracking-container">
      {/* Título principal */}
      <h1 className="page-title">Seguimiento de tu Pedido <span className="order-id">#{order.id}</span></h1>

      {/* Sección de estado del pedido */}
      <div className="status-card">
        <h2 className="section-title">Estado del Envío</h2>
        
        {/* Barra de progreso mejorada */}
        <div className="progress-bar">
          {["pending", "processing", "shipped", "delivered"].map((step) => (
            <div
              key={step}
              className={`progress-step ${order.status === step ? "active" : ""} ${
                (step === "delivered" && order.status === "delivered") ? "completed" : ""
              }`}
            >
              <div className="step-icon">
                {order.status === step || (step === "delivered" && order.status === "delivered") ? (
                  <span className="active-icon">✓</span>
                ) : (
                  <span className="inactive-icon">{step === "pending" ? "1" : step === "processing" ? "2" : step === "shipped" ? "3" : "4"}</span>
                )}
              </div>
              <p className="step-label">
                {step === "pending" && "Pendiente"}
                {step === "processing" && "Procesando"}
                {step === "shipped" && "Enviado"}
                {step === "delivered" && "Entregado"}
              </p>
            </div>
          ))}
        </div>

        {/* Detalles de envío */}
        <div className="shipping-details">
          <div className="detail-item">
            <span className="detail-label">Número de Seguimiento:</span>
            <span className="detail-value">{order.trackingNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Fecha Estimada:</span>
            <span className="detail-value">{order.estimatedDelivery}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Dirección de Envío:</span>
            <span className="detail-value">{order.shippingAddress}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Método de Pago:</span>
            <span className="detail-value">{order.paymentMethod}</span>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="products-card">
        <h2 className="section-title">Tus Productos</h2>
        <div className="products-list">
          {order.products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-quantity">Cantidad: {product.quantity}</p>
                <p className="product-price">${product.price.toFixed(2)} c/u</p>
              </div>
              <div className="product-total">
                ${(product.price * product.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="order-total">
          <span className="total-label">Total del Pedido:</span>
          <span className="total-amount">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Botón de acción (opcional) */}
      <div className="action-buttons">
        <button className="btn-primary">Ver Factura</button>
        <button className="btn-secondary">Contactar Soporte</button>
      </div>
    </div>
  );
}