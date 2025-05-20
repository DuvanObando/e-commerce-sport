import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Carrito.css";
import { PagoService } from "../service/PagoService";
import { ClienteService } from "../service/ClienteService";

const Carrito = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatosCliente = async () => {
      try {
        // Por ahora usamos el ID 1, pero esto debería venir del sistema de autenticación
        const datosCliente = await ClienteService.obtenerClientePorId(1);
        setCliente(datosCliente);
      } catch (error) {
        console.error("Error al obtener datos del cliente:", error);
        setError("No se pudieron cargar los datos del cliente");
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosCliente();
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.precio, 0);
  const total = subtotal;

  const handleConfirmarCompra = async () => {
    try {
      const datosCompra = {
        clienteId: cliente?.clienteId || 1,
        total: total,
        productos: cart,
        metodoPagoId: 1
      };

      const resultado = await PagoService.crearPedidoConPago(datosCompra);

      clearCart();
      // Mapea los productos del carrito a la estructura esperada por Factura
      const detalles = cart.map(item => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario || item.precio,
        precio: (item.precioUnitario || item.precio) * item.cantidad
      }));
      navigate("/factura", { 
        state: {
          pedido_id: resultado.pedido.pedidoId,
          fecha_pedido: resultado.pedido.fechaPedido,
          cliente: cliente,
          detalles, // <-- productos reales
          metodo_pago: "Pago contra entrega",
          estado: "PENDIENTE",
          subtotal,
          total
        }
      });
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      alert("❌ No se pudo procesar el pedido. Por favor, intente nuevamente.");
    }
  };

  if (loading) {
    return <div className="carrito-container">Cargando datos del cliente...</div>;
  }

  if (error) {
    return <div className="carrito-container">Error: {error}</div>;
  }

  return (
    <div className="carrito-container">
      <div className="carrito-orden">
        <h1>🛒 Resumen del Pedido</h1>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <table className="carrito-tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Talla</th>
                  <th>Color</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td>{item.talla}</td>
                    <td>
                      {item.color && (
                        <div
                          className="color-muestra"
                          style={{
                            backgroundColor: item.color,
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            margin: '0 auto',
                            border: '1px solid #ddd'
                          }}
                        />
                      )}
                    </td>
                    <td>{item.cantidad}</td>
                    <td>${item.precioUnitario?.toLocaleString()}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>
                      <button onClick={() => removeFromCart(index)} className="eliminar-btn">
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="carrito-total">
              <p><strong>SUBTOTAL:</strong> ${subtotal.toLocaleString()}</p>
              <p><strong>TOTAL:</strong> ${total.toLocaleString()}</p>
            </div>
          </>
        )}
      </div>

      <div className="carrito-pago">
        <h2>🚚 Datos de Envío</h2>
        {cliente ? (
          <>
            <p><strong>Nombre:</strong> {cliente.nombre}</p>
            <p><strong>Dirección:</strong> {cliente.direccion}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            <p><strong>Correo:</strong> {cliente.correo}</p>
          </>
        ) : (
          <p>No se encontraron datos del cliente</p>
        )}

        <hr style={{ margin: '1rem 0' }} />

        <h2>💰 Datos de Pago</h2>
        <p><strong>Subtotal:</strong> ${subtotal.toLocaleString()}</p>
        <p><strong>Total:</strong> ${total.toLocaleString()}</p>
        <p><strong>Método de Pago:</strong> Pago contra entrega</p>

        <button 
          onClick={handleConfirmarCompra} 
          className="confirmar-btn"
          disabled={cart.length === 0 || !cliente}
        >
          ✅ Realizar Pedido
        </button>
      </div>
    </div>
  );
};

export default Carrito;