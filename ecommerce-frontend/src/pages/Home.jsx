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
            <p><span className="discounted">$250.000</span> $180.000</p>
            </Link>
          </div>

          <div className="product-card">
          <Link to="/producto/2">
          <img src={require("../assets/articulo2.jpg")} alt="Producto 2" className="product-image" />
            <h3>Raqueta de Tennis</h3>
            <p><span className="discounted"></span> $130.000</p>
            </Link>
          </div>

          <div className="product-card">
          <Link to="/producto/3">
          <img src={require("../assets/articulo3.jpg")} alt="Producto 3" className="product-image" />
            <h3>Gorro + Gafas de natación</h3>
            <p>$210.000</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;