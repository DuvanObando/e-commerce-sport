import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const PagoService = {
    async crearPedidoConPago(datosCompra) {
        try {
            // 1. Crear el pedido
            const pedidoData = {
                clienteId: datosCompra.clienteId,
                fechaPedido: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
                estado: "PENDIENTE",
                total: datosCompra.total
            };

            const responsePedido = await axios.post(`${API_URL}/pedidos`, pedidoData);
            const pedidoCreado = responsePedido.data.data; // Acceder al campo data del ApiResponse

            if (!pedidoCreado || !pedidoCreado.pedidoId) {
                throw new Error("No se pudo crear el pedido");
            }

            // 2. Crear el pago
            const pagoData = {
                pedidoId: pedidoCreado.pedidoId,
                fechaPago: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
                monto: datosCompra.total,
                metodoPagoId: 1, // Siempre método 1 (Pago contra entrega)
                estado: "PENDIENTE"
            };

            const responsePago = await axios.post(`${API_URL}/pagos`, pagoData);
            const pagoCreado = responsePago.data.data; // Acceder al campo data del ApiResponse

            // 3. Crear los detalles del pedido
            const detallesPromises = datosCompra.productos.map(item => {
                const detalleData = {
                    pedidoId: pedidoCreado.pedidoId,
                    productoId: item.id,
                    cantidad: item.cantidad,
                    estado: "PENDIENTE",
                    observaciones: `Talla: ${item.talla}, Color: ${item.color}`
                };
                return axios.post(`${API_URL}/detalles-pedido`, detalleData);
            });

            await Promise.all(detallesPromises);

            return {
                success: true,
                pedido: pedidoCreado,
                pago: pagoCreado
            };
        } catch (error) {
            console.error("Error en el servicio de pago:", error);
            throw new Error(error.response?.data?.message || "No se pudo procesar el pedido y pago");
        }
    },

    async obtenerPago(pagoId) {
        try {
            const response = await axios.get(`${API_URL}/pagos/${pagoId}`);
            return response.data.data; // Acceder al campo data del ApiResponse
        } catch (error) {
            console.error("Error al obtener el pago:", error);
            throw new Error(error.response?.data?.message || "No se pudo obtener la información del pago");
        }
    }
}; 