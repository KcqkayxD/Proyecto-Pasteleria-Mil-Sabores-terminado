import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { formatoCLP, calcularDescuentos } from '../../utils/formato';

export default function Carrito() {
  const { cart, actualizarCantidad, eliminarProducto, total } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const { descuento, mensajes } = useMemo(
    () => calcularDescuentos(total, usuario),
    [total, usuario]
  );
  const totalConDescuento = total - descuento;

  const handleProcederPago = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <section className="row g-4">
      <article className="col-lg-8">
        <div className="card p-4">
          <h1 className="mb-4">Tu Carrito</h1>

          {cart.length === 0 ? (
            <p>
              Tu carrito está vacío. <Link to="/productos">Ir a comprar</Link>
            </p>
          ) : (
            cart.map((item) => (
              <div key={`${item.codigo}-${item.mensaje}`} className="d-flex gap-3 border-bottom py-3">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: '100px', height: '80px', objectFit: 'cover' }}
                  className="rounded"
                />
                <div className="flex-grow-1">
                  <h4 className="h6 mb-1">{item.nombre}</h4>
                  <p className="mb-1">{formatoCLP(item.precio)}</p>
                  {item.mensaje && <p className="mb-1 fst-italic small">Mensaje: {item.mensaje}</p>}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => actualizarCantidad(item.codigo, -1)}
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => actualizarCantidad(item.codigo, 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => eliminarProducto(item.codigo)}
                      aria-label="Eliminar producto"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </article>

      <aside className="col-lg-4">
        <div className="card p-4">
          <h2 className="h5">Resumen</h2>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <strong>{formatoCLP(total)}</strong>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Descuento:</span>
            <strong>{formatoCLP(descuento)}</strong>
          </div>
          <div className="d-flex justify-content-between mb-3 fs-5">
            <span>Total:</span>
            <strong>{formatoCLP(totalConDescuento)}</strong>
          </div>

          {mensajes.length > 0 && (
            <p className="text-muted small">{mensajes.join(' ')}</p>
          )}

          <button type="button" className="btn btn-primary w-100 mb-2" onClick={handleProcederPago}>
            Proceder al pago
          </button>
          <Link to="/productos" className="btn btn-outline-secondary w-100">
            Seguir comprando
          </Link>
        </div>
      </aside>
    </section>
  );
}
