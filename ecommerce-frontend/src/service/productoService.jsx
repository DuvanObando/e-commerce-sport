import balon from "../assets/Balon.jpg";
import camisetaBaloncesto from "../assets/camisaeta_baloncesto.jpg";
import raqueta from "../assets/articulo2.jpg";
import natacionKit from "../assets/articulo3.jpg";
import mochila from "../assets/Mochila.jpg";
import lazo from "../assets/Lazo elastico.jpg";

const productosMock = [
  {
    id: 1,
    nombre: "Balón de Fútbol",
    imagen: balon,
    precio: 120000,
    deporte: "futbol",
    genero: "hombre",
    marca: "nike",
    descripcion: "Balón profesional de fútbol.",
    tallas: ["5", "4", "3"],
  },
  {
    id: 2,
    nombre: "Camiseta de Baloncesto",
    imagen: camisetaBaloncesto,
    precio: 85000,
    deporte: "baloncesto",
    genero: "hombre",
    marca: "adidas",
    descripcion: "Camiseta oficial de baloncesto.",
    tallas: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    nombre: "Raqueta de Tennis",
    imagen: raqueta,
    precio: 200000,
    deporte: "tennis",
    genero: "mujer",
    marca: "puma",
    descripcion: "Raqueta profesional de tennis.",
    tallas: ["L2", "L3", "L4"],
  },
  {
    id: 4,
    nombre: "Gorro + Gafas de Natación",
    imagen: natacionKit,
    precio: 95000,
    deporte: "natacion",
    genero: "mujer",
    marca: "nike",
    descripcion: "Kit completo de natación.",
    tallas: ["S", "M", "L"],
  },
  {
    id: 5,
    nombre: "Mochila Deportiva",
    imagen: mochila,
    precio: 110000,
    deporte: "futbol",
    genero: "unisex",
    marca: "nike",
    descripcion: "Mochila deportiva resistente.",
    tallas: ["Única"],
  },
  {
    id: 6,
    nombre: "Lazo Elástico de Resistencia",
    imagen: lazo,
    precio: 60000,
    deporte: "fitness",
    genero: "unisex",
    marca: "puma",
    descripcion: "Lazo elástico para ejercicios.",
    tallas: ["Ligera", "Media", "Fuerte"],
  }
];

export const obtenerProductos = async () => {
  // Simulamos un delay de red
  await new Promise(resolve => setTimeout(resolve, 100));
  return productosMock;
};