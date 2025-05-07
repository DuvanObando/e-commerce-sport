// src/service/productoService.js

// Función que simula obtener productos con filtros
export const obtenerProductos = async (filtros) => {
    // Datos de ejemplo (mock) que luego se reemplazarán por fetch() real
    const mock = [
    {
        id: 1,
        nombre: "Balón de Fútbol",
        imagen: "https://via.placeholder.com/200",
        precio: 120000,
        descuento: 90000,
        deporte: "futbol",
        marca: "Nike"
    },
    {
        id: 2,
        nombre: "Camiseta de Baloncesto",
        imagen: "https://via.placeholder.com/200",
        precio: 85000,
        deporte: "baloncesto",
        marca: "Adidas"
    }
    ];

    // Convertimos los precios a enteros, o los dejamos con valores por defecto
    const min = parseInt(filtros.precioMin) || 0;
    const max = parseInt(filtros.precioMax) || Infinity;

    // Filtramos los productos según los criterios
    return mock.filter((p) => {
    return (
        (!filtros.deporte || p.deporte === filtros.deporte) &&
        (!filtros.marca || p.marca === filtros.marca) &&
        (!filtros.genero || p.genero === filtros.genero) && // (si en el futuro hay género)
        p.precio >= min &&
        p.precio <= max
    );
    });
};
