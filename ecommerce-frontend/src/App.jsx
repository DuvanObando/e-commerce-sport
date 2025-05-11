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

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
      {/* Rutas públicas */} 
      <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
         {/* Dashboards protegidos por tipo de usuario */} git 
        <Route path="/cliente" element={<ClienteDashboard />} />
        <Route path="/empleado" element={<EmpleadoDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/catalogo/producto/:id" element={<DetalleCatalogo />} />
        <Route path="/responder-pqrs" element={<ResponderPQRs />} />
      </Routes>
    </Router>
  );
}

export default App;
