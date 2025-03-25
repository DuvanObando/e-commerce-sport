import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Importamos los estilos

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Sports Store</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/genero">Género</Link></li>
            <li><Link to="/deportes">Deportes</Link></li>
            <li><Link to="/accesorios">Accesorios</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
          </ul>
        </nav>
        <div className="icons">
          <span>🔍</span> {/* Ícono de búsqueda */}
          <span>🛒</span> {/* Ícono de carrito */}
          <Link to="/inicio">👤</Link> {/* Ícono de cuenta de usuario */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
      <img src={require("../assets/home.jpg")} alt="Banner de deportes" className="hero-image" />
        <div className="hero-text">
          <h1>Sports Store</h1>
          <p className="home-text">Encuentra los mejores productos deportivos al mejor precio.</p>
        </div>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="trending-items">
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          {/* Espacios reservados para imágenes */}
          <div className="product-card">
            <div className="image-placeholder"></div>
            <h3>Air Jordan 5 Retro</h3>
            <p><span className="discounted">$200.00</span> $180.00</p>
            <p className="descripcion-text">Tallas: 38, 40, 42</p>
          </div>
          <div className="product-card">
            <div className="image-placeholder"></div>
            <h3>Nike Air Max 97</h3>
            <p><span className="discounted">$150.00</span> $130.00</p>
            <p>Tallas: 36, 39, 41</p>
          </div>
          <div className="product-card">
            <div className="image-placeholder"></div>
            <h3>Nike Tanjun</h3>
            <p>$210.00</p>
            <p>Tallas: 37, 40, 42</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;