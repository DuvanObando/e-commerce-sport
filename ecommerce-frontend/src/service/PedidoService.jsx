const API_PEDIDOS = "http://localhost:8081/pedidos"; // URL del backend

// Envía un pedido al backend
export const crearPedido = async (clienteId, producto, direccion) => {
    try {
      const pedidoDTO = {
        pedido: {
          clienteId,
          estado: "PENDIENTE",
          total: producto.precio
        },
        detalles: [
          {
            producto: {
              productoId: producto.id
            },
            cantidad: 1,
            estado: "PENDIENTE",
            observaciones: `Entrega en: ${direccion}`
          }
        ]
      };
  
      const response = await fetch(API_PEDIDOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoDTO),
      });
  
      const data = await response.json();
      return response.ok
        ? { success: true, data }
        : { success: false, message: data.message || "Error al registrar el pedido" };
  
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
      return { success: false, message: "Error en la conexión con el servidor" };
    }
  };