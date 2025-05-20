import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro"
import ClienteDashboard from "./pages/ClienteDashboard";
import EmpleadoDashboard from "./pages/EmpleadoDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar"
import DetalleProducto from "./pages/DetalleProducto";
import Catalogo from "./pages/Catalogo"; // Importamos el componente
import DetalleCatalogo from "./pages/DetalleCatalogo";
import ResponderPQRs from "./pages/ResponderPQRs";
import Seguimiento from "./pages/Seguimiento";
import HistorialCompras from "./pages/HistorialCompras";
import HistorialVentas from "./pages/HistorialVentas";
import Carrito from "./pages/Carrito";
import Factura from "./pages/Factura";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          {/* Dashboards protegidos por tipo de usuario */}
          <Route path="/cliente" element={<ClienteDashboard />} />
          <Route path="/empleado" element={<EmpleadoDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/producto/:id" element={<DetalleCatalogo />} />
          <Route path="/responder-pqrs" element={<ResponderPQRs />} />
          <Route path="/seguimiento" element={<Seguimiento />} />
          <Route path="/historial" element={<HistorialCompras />} />
          <Route path="/empleado/ventas"  element={<HistorialVentas   />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/factura" element={<Factura />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
