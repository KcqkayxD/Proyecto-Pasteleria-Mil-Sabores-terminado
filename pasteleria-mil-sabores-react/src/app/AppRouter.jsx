import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/public/Home';
import Productos from '../pages/public/Productos';
import ProductoDetalle from '../pages/public/ProductoDetalle';
import Categorias from '../pages/public/Categorias';
import Ofertas from '../pages/public/Ofertas';
import Carrito from '../pages/public/Carrito';
import Checkout from '../pages/public/Checkout';
import PagoExitoso from '../pages/public/PagoExitoso';
import PagoError from '../pages/public/PagoError';
import Login from '../pages/public/Login';
import Registro from '../pages/public/Registro';
import Nosotros from '../pages/public/Nosotros';
import Contacto from '../pages/public/Contacto';
import Blogs from '../pages/public/Blogs';
import BlogDetalle from '../pages/public/BlogDetalle';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminOrdenes from '../pages/admin/AdminOrdenes';
import AdminDespacho from '../pages/admin/AdminDespacho';
import AdminProductos from '../pages/admin/AdminProductos';
import AdminCategorias from '../pages/admin/AdminCategorias';
import AdminUsuarios from '../pages/admin/AdminUsuarios';
import AdminReportes from '../pages/admin/AdminReportes';
import AdminPerfil from '../pages/admin/AdminPerfil';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago/exitoso" element={<PagoExitoso />} />
        <Route path="/pago/error" element={<PagoError />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetalle />} />
      </Route>

      <Route
        path="/admin"
        element={
          <PrivateRoute roles={['Administrador', 'Vendedor']}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="ordenes" element={<AdminOrdenes />} />
        <Route path="despacho" element={<AdminDespacho />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="categorias" element={<AdminCategorias />} />
        <Route
          path="usuarios"
          element={
            <PrivateRoute roles={['Administrador']}>
              <AdminUsuarios />
            </PrivateRoute>
          }
        />
        <Route path="reportes" element={<AdminReportes />} />
        <Route path="perfil" element={<AdminPerfil />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
