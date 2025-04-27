import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Importamos los estilos

const Home = () => {
  return (
    <div className="home-container">
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
          <Link to="/producto/1">
          <img src={require("../assets/articulo1.jpg")} alt="Producto 1" className="product-image" />
            <h3>Air Jordan 5 Retro</h3>
            <p><span className="discounted">$200.00</span> $180.00</p>
            <p className="descripcion-text">Tallas: 38, 40, 42</p>
            </Link>
          </div>

          <div className="product-card">
          <Link to="/producto/2">
          <img src={require("../assets/articulo2.jpg")} alt="Producto 2" className="product-image" />
            <h3>Raqueta de Tennis</h3>
            <p><span className="discounted">$150.00</span> $130.00</p>
            <p>Tamaños: L2, L3, L4</p>
            </Link>
          </div>

          <div className="product-card">
          <Link to="/producto/3">
          <img src={require("../assets/articulo3.jpg")} alt="Producto 3" className="product-image" />
            <h3>Gorro + Gafas de natación</h3>
            <p>$210.00</p>
            <p>Tallas: S, M, L</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;