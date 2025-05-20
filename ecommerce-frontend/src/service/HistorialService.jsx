// src/service/HistorialService.js

/**
 * Servicio que devuelve el historial de compras.
 * Por ahora usamos datos simulados con imágenes.
 * Las rutas apuntan a archivos dentro de la carpeta public/img.
 */

import camiseta from "../assets/camiseta.jpg";
import rodilleras  from "../assets/rodilleras.webp";
import guantes  from "../assets/guantes.jpg";
import pantaloneta  from "../assets/pantaloneta.webp";
import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const obtenerHistorialCompras = async () => {
  const comprasSimuladas = [
    {
      id: 1,
      numeroPedido: "ORD-202501",
      fecha: "2025-04-29",
      total: 159.99,
      estado: "Entregado",
      productos: [
        {
          nombre: "Camiseta deportiva",
          cantidad: 2,
          imagen: camiseta, // Asegúrate de que este archivo exista
        },
        {
          nombre: "Guantes de gimnasio",
          cantidad: 1,
          imagen: guantes,
        },
      ],
    },
    {
      id: 2,
      numeroPedido: "ORD-202502",
      fecha: "2025-05-01",
      total: 89.5,
      estado: "Enviado",
      productos: [
        {
          nombre: "Pantaloneta",
          cantidad: 1,
          imagen: pantaloneta,
        },
        {
          nombre: "Rodilleras",
          cantidad: 1,
          imagen: rodilleras,
        },
      ],
    },
  ];

  // Simula retardo de red y ordena por fecha descendente
  return new Promise((resolve) => {
    setTimeout(() => {
      const ordenado = comprasSimuladas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      resolve(ordenado);
    }, 800);
  });
};

export const HistorialService = {
    obtenerHistorialCompras: async (clienteId) => {
        try {
            const response = await axios.get(`${API_URL}/pedidos/cliente/${clienteId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el historial de compras:', error);
            throw error;
        }
    }
};
