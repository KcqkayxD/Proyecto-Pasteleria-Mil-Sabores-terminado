import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

export default function Navbar() {
  const { usuario, logout, isAuthenticated, hasRole } = useAuth();
  const { cantidadTotal } = useCart();
  const [abierto, setAbierto] = useState(false);
  const location = useLocation();

  const esAdminOVendedor = hasRole(['Administrador', 'Vendedor']);

  // Cierra el menú colapsado cada vez que cambia de ruta (útil en mobile).
  useEffect(() => {
    setAbierto(false);
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light ms-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand ms-logo d-flex align-items-center gap-2" to="/">
<<<<<<< HEAD
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo Pastelería Mil Sabores" height="36" />
=======
          <img src="/logo.png" alt="Logo Pastelería Mil Sabores" height="36" />
>>>>>>> master
          Pastelería Mil Sabores
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={abierto}
          aria-label="Toggle navigation"
          onClick={() => setAbierto((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`navbar-collapse ${abierto ? 'd-flex' : 'd-none'} d-lg-flex flex-column flex-lg-row w-100`}
          id="mainNavbar"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link to="/carrito" className="cart-link position-relative">
              🛒 Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cantidadTotal}
              </span>
            </Link>

            {!isAuthenticated() ? (
              <>
                <Link to="/login" className="btn btn-outline-secondary">Login</Link>
                <Link to="/registro" className="btn btn-primary">Registro</Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {usuario?.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
<<<<<<< HEAD
=======
                  <li>
                    <Link className="dropdown-item" to="/mis-compras">Mis compras</Link>
                  </li>
>>>>>>> master
                  {esAdminOVendedor && (
                    <li>
                      <Link className="dropdown-item" to="/admin">Panel admin</Link>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
