// src/service/ventaService.js

// Importa aquí las imágenes que tengas en tu carpeta src/assets
import camisetaImg   from "../assets/camiseta.jpg";
import guantesImg    from "../assets/guantes.jpg";

// Servicio que simula la llamada al backend y devuelve el historial de ventas
export function obtenerVentas() {
  const datosMock = [
    {
      id: "V-20230501",
      fecha: "2025-05-01",
      cliente: "Carlos Pérez",
      total: 159.99,
      estado: "Completada",
      productos: [
        {
          id: "p1",
          nombre: "Camiseta Deportiva",
          cantidad: 2,
          precio: 29.99,
          imagen: camisetaImg   // ruta de la importación
        },
        {
          id: "p2",
          nombre: "Guantes de Gimnasio",
          cantidad: 1,
          precio: 99.99,
          imagen: guantesImg    // ruta de la importación
        }
      ]
    }
    // <-- añade más objetos si quieres más ejemplos -->
  ];

  // Retornamos una promesa para simular retraso de red
  return new Promise(resolve => {
    setTimeout(() => resolve(datosMock), 400);
  });
}
