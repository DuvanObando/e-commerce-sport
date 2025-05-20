import React, { useState } from "react";
import "../styles/AyudaInterna.css";

const CATEGORIAS = [
  {
    id: "pedidos",
    icon: "🛒",
    nombre: "Gestión de pedidos",
    preguntas: [
      {
        pregunta: "¿Cómo consulto el estado de un pedido?",
        respuesta: "Ve al módulo de pedidos, busca el pedido por su número y revisa la columna 'Estado'.",
      },
      {
        pregunta: "¿Cómo cancelo un pedido?",
        respuesta: "Selecciona el pedido, haz clic en 'Cancelar' y confirma la acción. Solo los pedidos pendientes pueden ser cancelados.",
      },
    ],
  },
  {
    id: "facturacion",
    icon: "🧾",
    nombre: "Facturación y pagos",
    preguntas: [
      {
        pregunta: "¿Cómo genero una factura?",
        respuesta: "Desde el detalle del pedido, haz clic en 'Generar factura'. Se descargará un PDF con los datos del cliente y productos.",
      },
      {
        pregunta: "¿Qué hago si un pago no se refleja?",
        respuesta: "Verifica con el área de tesorería y revisa el historial de pagos del cliente. Si el problema persiste, contacta soporte.",
      },
    ],
  },
  {
    id: "productos",
    icon: "🎯",
    nombre: "Manejo de productos",
    preguntas: [
      {
        pregunta: "¿Cómo agrego un nuevo producto?",
        respuesta: "En el panel de productos, haz clic en 'Agregar producto', completa los campos requeridos y guarda.",
      },
      {
        pregunta: "¿Cómo edito el stock de un producto?",
        respuesta: "Busca el producto, haz clic en 'Editar' y ajusta el campo 'Stock'. Guarda los cambios.",
      },
    ],
  },
  {
    id: "clientes",
    icon: "🤝",
    nombre: "Atención al cliente",
    preguntas: [
      {
        pregunta: "¿Cómo respondo una PQR?",
        respuesta: "En el módulo de PQRs, selecciona la consulta y responde desde el panel lateral derecho.",
      },
    ],
  },
  {
    id: "acceso",
    icon: "🔐",
    nombre: "Problemas de acceso",
    preguntas: [
      {
        pregunta: "¿Olvidé mi contraseña, qué hago?",
        respuesta: "Haz clic en '¿Olvidaste tu contraseña?' en la pantalla de inicio de sesión y sigue los pasos.",
      },
    ],
  },
  {
    id: "errores",
    icon: "⚙️",
    nombre: "Errores comunes en el sistema",
    preguntas: [
      {
        pregunta: "¿Qué hago si la página no carga?",
        respuesta: "Intenta recargar la página. Si el problema persiste, verifica tu conexión o contacta a soporte.",
      },
    ],
  },
];

export default function AyudaInterna() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  // Filtrar preguntas por búsqueda
  const categoriasFiltradas = CATEGORIAS.map(cat => ({
    ...cat,
    preguntas: cat.preguntas.filter(p =>
      p.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.respuesta.toLowerCase().includes(busqueda.toLowerCase())
    )
  })).filter(cat => cat.preguntas.length > 0);

  return (
    <div className="ayuda-interna-container">
      <h1>🆘 Ayuda Interna para Empleados</h1>
      <p className="ayuda-subtitle">
        Encuentra respuestas rápidas a tus dudas frecuentes. Usa la búsqueda o explora por categoría.
      </p>

      <input
        type="text"
        className="ayuda-busqueda"
        placeholder="🔍 Buscar pregunta o palabra clave..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <div className="ayuda-categorias">
        {CATEGORIAS.map(cat => (
          <button
            key={cat.id}
            className={`ayuda-categoria-btn${categoriaActiva === cat.id ? " activa" : ""}`}
            onClick={() => setCategoriaActiva(categoriaActiva === cat.id ? null : cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span> {cat.nombre}
          </button>
        ))}
      </div>

      <div className="ayuda-preguntas">
        {(busqueda ? categoriasFiltradas : CATEGORIAS.filter(cat => !categoriaActiva || cat.id === categoriaActiva)).map(cat => (
          <div key={cat.id} className="ayuda-categoria-bloque">
            <h2><span>{cat.icon}</span> {cat.nombre}</h2>
            <ul>
              {cat.preguntas.map((p, idx) => (
                <li key={idx} className="ayuda-pregunta-item">
                  <button
                    className="pregunta-btn"
                    onClick={() => setPreguntaAbierta(preguntaAbierta === cat.id + idx ? null : cat.id + idx)}
                  >
                    {p.pregunta}
                  </button>
                  {preguntaAbierta === cat.id + idx && (
                    <div className="ayuda-respuesta">
                      <p>{p.respuesta}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 