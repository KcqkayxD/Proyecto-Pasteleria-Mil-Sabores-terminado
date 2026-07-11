import { useState } from 'react';
import { getPedidos, actualizarEstadoPedido, eliminarPedido } from '../../data/pedidosData';
import { formatoCLP } from '../../utils/formato';
import useAuth from '../../hooks/useAuth';

const FLUJO_ESTADOS = ['Preparando', 'Preparado', 'Listo para entregar', 'Entregado'];

export default function AdminOrdenes() {
  const { hasRole } = useAuth();
  const puedeAnular = hasRole(['Administrador']);
  const [, forceRender] = useState(0);

  const pedidos = [...getPedidos()].reverse();

  const avanzarEstado = (numero, estadoActual) => {
    const idx = FLUJO_ESTADOS.indexOf(estadoActual);
    const siguiente = FLUJO_ESTADOS[Math.min(idx + 1, FLUJO_ESTADOS.length - 1)];
    actualizarEstadoPedido(numero, siguiente);
    forceRender((n) => n + 1);
  };

  const anular = (numero) => {
    if (!window.confirm('¿Anular este pedido?')) return;
    actualizarEstadoPedido(numero, 'Anulado');
    forceRender((n) => n + 1);
  };

  const borrar = (numero) => {
    if (!window.confirm('¿Eliminar este pedido definitivamente?')) return;
    eliminarPedido(numero);
    forceRender((n) => n + 1);
  };

  return (
    <section>
      <h1 className="mb-4">Órdenes / Pedidos</h1>

      {pedidos.length === 0 ? (
        <p>Aún no hay pedidos registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>N° Pedido</th>
                <th>Fecha</th>
                <th>Detalle</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => {
                const bloqueado = ['Entregado', 'Anulado'].includes(pedido.estado);
                return (
                  <tr key={pedido.numero}>
                    <td>#{pedido.numero}</td>
                    <td>{new Date(pedido.fecha).toLocaleString('es-CL')}</td>
                    <td>
                      {pedido.items.map((i) => (
                        <div key={i.codigo} className="small">{i.nombre} × {i.cantidad}</div>
                      ))}
                    </td>
                    <td>{formatoCLP(pedido.total)}</td>
                    <td>
                      <span className={`badge ${pedido.estado === 'Anulado' ? 'bg-danger' : pedido.estado === 'Entregado' ? 'bg-success' : 'bg-secondary'}`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="d-flex flex-wrap gap-1">
                      {!bloqueado && (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => avanzarEstado(pedido.numero, pedido.estado)}
                        >
                          Avanzar estado
                        </button>
                      )}
                      {!bloqueado && (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => anular(pedido.numero)}
                        >
                          Anular
                        </button>
                      )}
                      {puedeAnular && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => borrar(pedido.numero)}
                        >
                          Borrar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
