import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="ms-footer py-4 mt-5">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-3 mb-md-0">
              <h3 className="h5">Pastelería Mil Sabores</h3>
              <p className="mb-0">Tradición chilena por más de 50 años.</p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <h3 className="h5">Enlaces</h3>
              <ul className="footer-links justify-content-center justify-content-md-start mb-0">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registro">Registro</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3 className="h5">Redes</h3>
              <p className="mb-0">
                <a href="https://www.facebook.com/1000sabores" target="_blank" rel="noopener noreferrer">Facebook</a>
                {' | '}
                <a href="https://www.instagram.com/1000sabores/" target="_blank" rel="noopener noreferrer">Instagram</a>
                {' | '}
                <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </p>
            </div>
          </div>
          <p className="text-center mb-0 mt-4">
            © {new Date().getFullYear()} Pastelería Mil Sabores — Creado por{' '}
            <a href="https://www.youtube.com/@kaykillers" target="_blank" rel="noopener noreferrer">
              KcQDesing
            </a>
          </p>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/56912345678"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </>
  );
}
