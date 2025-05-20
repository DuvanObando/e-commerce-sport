import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const ClienteService = {
    async obtenerClientePorId(clienteId) {
        try {
            const response = await axios.get(`${API_URL}/clientes/${clienteId}`);
            return response.data.data;
        } catch (error) {
            console.error("Error al obtener datos del cliente:", error);
            throw new Error(error.response?.data?.message || "No se pudieron obtener los datos del cliente");
        }
    }
}; 