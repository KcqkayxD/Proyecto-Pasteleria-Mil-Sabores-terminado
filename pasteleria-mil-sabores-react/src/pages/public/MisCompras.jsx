import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { getPedidosPorCorreo } from '../../data/pedidosData';
import { formatoCLP } from '../../utils/formato';

export default function MisCompras() {
  const { usuario } = useAuth();
  const { agregarProducto } = useCart();
  const navigate = useNavigate();

  const pedidos = useMemo(() => getPedidosPorCorreo(usuario?.correo), [usuario]);

  const handleVolverAComprar = (pedido) => {
    pedido.items.forEach((item) => {
      agregarProducto(
        { codigo: item.codigo, nombre: item.nombre, precio: item.precio, imagen: item.imagen },
        item.cantidad,
        item.mensaje || ''
      );
    });
    navigate('/carrito');
  };

  return (
    <div className="card p-4">
      <h1 className="mb-1">Mis Compras</h1>
      <p className="text-muted mb-4">Revisa tus pedidos anteriores y vuelve a comprar con un clic.</p>

      {pedidos.length === 0 ? (
        <p>
          Todavía no tienes pedidos. <Link to="/productos">Ir a comprar</Link>
        </p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.numero} className="border-bottom py-3">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
              <div>
                <h2 className="h6 mb-1">Pedido #{pedido.numero}</h2>
                <p className="text-muted small mb-0">
                  {new Date(pedido.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })} · {pedido.estado}
                </p>
              </div>
              <strong>{formatoCLP(pedido.total)}</strong>
            </div>
            <ul className="small mb-3">
              {pedido.items.map((item) => (
                <li key={`${pedido.numero}-${item.codigo}`}>{item.cantidad} × {item.nombre}</li>
              ))}
            </ul>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => handleVolverAComprar(pedido)}>
              Volver a comprar
            </button>
          </div>
        ))
      )}
    </div>
  );
}
