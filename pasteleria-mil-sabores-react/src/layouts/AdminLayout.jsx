import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function AdminSidebar() {
  const { usuario, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const esVendedor = hasRole(['Vendedor']) && !hasRole(['Administrador']);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action ${isActive ? 'active' : ''}`;

  return (
    <aside className="col-12 col-md-3 col-lg-2 mb-3 mb-md-0">
      <p className="fw-bold mb-2">{usuario?.nombre} · {usuario?.tipoUsuario}</p>
      <div className="list-group mb-3">
        <NavLink to="/admin" end className={linkClass}>🏠 Dashboard</NavLink>
        <NavLink to="/admin/ordenes" className={linkClass}>📦 Órdenes</NavLink>
        <NavLink to="/admin/despacho" className={linkClass}>🚚 Despacho</NavLink>
        <NavLink to="/admin/productos" className={linkClass}>🍰 Productos</NavLink>
        {!esVendedor && <NavLink to="/admin/categorias" className={linkClass}>🏷️ Categorías</NavLink>}
        {!esVendedor && <NavLink to="/admin/usuarios" className={linkClass}>👥 Usuarios</NavLink>}
        {!esVendedor && <NavLink to="/admin/reportes" className={linkClass}>💰 Reportes</NavLink>}
        <NavLink to="/admin/perfil" className={linkClass}>🙍 Perfil</NavLink>
      </div>
      <button type="button" className="btn btn-outline-secondary w-100" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}

export default function AdminLayout() {
  return (
    <div className="container-fluid py-3">
      <div className="row">
        <AdminSidebar />
        <section className="col-12 col-md-9 col-lg-10">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
