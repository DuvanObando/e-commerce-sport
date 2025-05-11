import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResponderPQRs.css";

const ResponderPQRs = () => {
const navigate = useNavigate();
const [pqrsList, setPqrsList] = useState([]);
const [selectedPqrs, setSelectedPqrs] = useState(null);
const [responseText, setResponseText] = useState("");
const [filterType, setFilterType] = useState("all");
const [filterStatus, setFilterStatus] = useState("all");
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

  // Tipos y estados predefinidos
const pqrsTypes = [
    { id: "peticion", name: "Petición", icon: "📋" },
    { id: "queja", name: "Queja", icon: "⚠️" },
    { id: "reclamo", name: "Reclamo", icon: "❗" },
    { id: "sugerencia", name: "Sugerencia", icon: "💡" },
];

const pqrsStatuses = [
    { id: "pendiente", name: "Pendiente", color: "#f39c12" },
    { id: "en-proceso", name: "En proceso", color: "#3498db" },
    { id: "resuelto", name: "Resuelto", color: "#2ecc71" },
];

  // Carga de datos simulada
useEffect(() => {
    const fetchPqrsData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
        // Simulando retraso de API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const exampleData = [
        {
            id: 1,
            type: "peticion",
            status: "pendiente",
            customer: "María González",
            email: "maria@example.com",
            product: "Zapatillas Runner Pro 2000",
            orderId: "ORD-12345",
            date: "2023-05-15",
            message: "Quisiera saber cuándo tendrán disponible mi talla (42) en color azul.",
        },
        {
            id: 2,
            type: "reclamo",
            status: "en-proceso",
            customer: "Carlos Mendoza",
            email: "carlos@example.com",
            product: "Raqueta de tenis profesional",
            orderId: "ORD-12346",
            date: "2023-05-10",
            message: "La raqueta llegó con el marco roto y las cuerdas flojas.",
        },
        {
            id: 3,
            type: "sugerencia",
            status: "pendiente",
            customer: "Ana López",
            email: "ana@example.com",
            product: null,
            orderId: null,
            date: "2023-05-18",
            message: "Sería bueno tener más tallas intermedias en pantalonetas de natación.",
        },
        ];
        
        setPqrsList(exampleData);
    } catch (err) {
        setError("Error al cargar los PQRs. Por favor intenta nuevamente.");
        console.error("Error fetching PQRs:", err);
    } finally {
        setIsLoading(false);
    }
    };

    fetchPqrsData();
}, []);

  // Filtrar PQRs
const filteredPqrs = pqrsList.filter((pqrs) => {
    const typeMatch = filterType === "all" || pqrs.type === filterType;
    const statusMatch = filterStatus === "all" || pqrs.status === filterStatus;
    return typeMatch && statusMatch;
});

  // Manejar envío de respuesta
const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!selectedPqrs || !responseText.trim()) return;

    try {
    setIsLoading(true);
      // Simulando envío a API
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const updatedPqrs = pqrsList.map(pqrs => 
        pqrs.id === selectedPqrs.id ? { 
        ...pqrs, 
        status: "resuelto",
        respuesta: responseText,
        fechaRespuesta: new Date().toLocaleDateString('es-ES'),
          respondidoPor: "Empleado Actual" // Esto debería venir del sistema de autenticación
        } : pqrs
    );
    
    setPqrsList(updatedPqrs);
    setSelectedPqrs(null);
    setResponseText("");
    } catch (err) {
    setError("Error al enviar la respuesta");
    console.error("Error submitting response:", err);
    } finally {
    setIsLoading(false);
    }
};

  // Actualizar estado de PQR
const updatePqrsStatus = (pqrsId, newStatus) => {
    const updatedPqrs = pqrsList.map(pqrs => 
    pqrs.id === pqrsId ? { ...pqrs, status: newStatus } : pqrs
    );
    setPqrsList(updatedPqrs);
};

return (
    <div className="responder-pqrs-container">
    <header className="pqrs-header">
        <button className="back-button" onClick={() => navigate(-1)}>
        <span className="arrow">←</span> Volver al Panel
        </button>
        <h1>Responder PQRs</h1>
        <p className="subtitle">Gestión de Peticiones, Quejas, Reclamos y Sugerencias</p>
    </header>

      {/* Filtros */}
    <section className="filters-section">
        <div className="filter-group">
        <label htmlFor="pqrs-type-filter">Filtrar por tipo:</label>
        <select
            id="pqrs-type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            disabled={isLoading}
        >
            <option value="all">Todos los tipos</option>
            {pqrsTypes.map((type) => (
            <option key={type.id} value={type.id}>
                {type.icon} {type.name}
            </option>
            ))}
        </select>
        </div>

        <div className="filter-group">
        <label htmlFor="pqrs-status-filter">Filtrar por estado:</label>
        <select
            id="pqrs-status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            disabled={isLoading}
        >
            <option value="all">Todos los estados</option>
            {pqrsStatuses.map((status) => (
            <option key={status.id} value={status.id}>
                {status.name}
            </option>
            ))}
        </select>
        </div>
    </section>

      {/* Mensaje de error */}
    {error && (
        <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
    )}

      {/* Contenido principal */}
    <main className="pqrs-main-content">
        {isLoading && pqrsList.length === 0 ? (
        <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando PQRs...</p>
        </div>
        ) : (
        <>
            {/* Listado de PQRs */}
            <div className="pqrs-list">
            {filteredPqrs.length === 0 ? (
                <div className="empty-state">
                <p>No se encontraron PQRs con los filtros seleccionados</p>
                </div>
            ) : (
                filteredPqrs.map((pqrs) => {
                const typeInfo = pqrsTypes.find(t => t.id === pqrs.type);
                const statusInfo = pqrsStatuses.find(s => s.id === pqrs.status);

                return (
                    <article
                    key={pqrs.id}
                    className={`pqrs-card ${selectedPqrs?.id === pqrs.id ? "selected" : ""}`}
                    onClick={() => setSelectedPqrs(pqrs)}
                    >
                    <div className="card-header">
                        <div className="pqrs-meta">
                        <span className="pqrs-type" style={{ color: statusInfo.color }}>
                            {typeInfo.icon} {typeInfo.name}
                        </span>
                        <span className="pqrs-date">{pqrs.date}</span>
                        </div>
                        <span 
                        className="status-badge" 
                        style={{ backgroundColor: statusInfo.color }}
                        >
                        {statusInfo.name}
                        </span>
                    </div>

                    <div className="card-body">
                        <h3>{pqrs.customer}</h3>
                        <p className="customer-email">{pqrs.email}</p>
                        
                        {pqrs.orderId && (
                        <div className="order-info">
                            <p><strong>Pedido:</strong> {pqrs.orderId}</p>
                            {pqrs.product && <p><strong>Producto:</strong> {pqrs.product}</p>}
                        </div>
                        )}

                        <div className="message-container">
                        <p className="pqrs-message">{pqrs.message}</p>
                        </div>
                    </div>
                    </article>
                );
                })
            )}
            </div>

            {/* Panel de respuesta */}
            {selectedPqrs && (
            <aside className="response-panel">
                <div className="panel-header">
                <h2>
                    Responder a PQR #{selectedPqrs.id}
                    {selectedPqrs.respuesta && (
                    <span className="resolved-tag">Resuelto</span>
                    )}
                </h2>
                <button 
                    className="close-panel"
                    onClick={() => setSelectedPqrs(null)}
                    disabled={isLoading}
                >
                    ×
                </button>
                </div>

                <form onSubmit={handleSubmitResponse} className="response-form">
                <div className="form-group">
                    <label htmlFor="response-textarea">Respuesta:</label>
                    <textarea
                    id="response-textarea"
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Escribe aquí tu respuesta detallada al cliente..."
                    required
                    disabled={isLoading}
                    />
                </div>

                <div className="form-footer">
                    <div className="status-control">
                    <label htmlFor="status-selector">Estado:</label>
                    <select
                        id="status-selector"
                        value={selectedPqrs.status}
                        onChange={(e) => updatePqrsStatus(selectedPqrs.id, e.target.value)}
                        disabled={isLoading}
                    >
                        {pqrsStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                        ))}
                    </select>
                    </div>

                    <div className="action-buttons">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                        <span className="btn-loader"></span>
                        ) : (
                        "Enviar Respuesta"
                        )}
                    </button>
                    </div>
                </div>
                </form>

                {selectedPqrs.respuesta && (
                <div className="previous-response">
                    <h4>Respuesta anterior:</h4>
                    <div className="response-content">
                    <p>{selectedPqrs.respuesta}</p>
                    <div className="response-meta">
                        <span>Respondido por: {selectedPqrs.respondidoPor}</span>
                        <span>Fecha: {selectedPqrs.fechaRespuesta}</span>
                    </div>
                    </div>
                </div>
                )}
            </aside>
            )}
        </>
        )}
    </main>
    </div>
);
};

export default ResponderPQRs;