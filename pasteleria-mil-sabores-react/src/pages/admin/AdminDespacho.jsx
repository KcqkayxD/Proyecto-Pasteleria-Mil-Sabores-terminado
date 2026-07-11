import { useState } from 'react';
import { getPedidos, actualizarEstadoPedido } from '../../data/pedidosData';
import { formatoCLP } from '../../utils/formato';

export default function AdminDespacho() {
  const [, forceRender] = useState(0);

  const pedidos = getPedidos()
    .filter((p) => p.estado === 'Listo para entregar')
    .reverse();

  const marcarEntregado = (numero) => {
    if (!window.confirm('¿Confirmar que este pedido fue despachado y entregado?')) return;
    actualizarEstadoPedido(numero, 'Entregado');
    forceRender((n) => n + 1);
  };

  return (
    <section>
      <h1 className="mb-4">Despacho</h1>
      <p className="text-muted">Pedidos listos para entregar, a la espera de despacho.</p>

      {pedidos.length === 0 ? (
        <p>No hay pedidos pendientes de despacho por el momento.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>N° Pedido</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Fecha / hora de retiro</th>
                <th>Detalle</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.numero}>
                  <td>#{pedido.numero}</td>
                  <td>{pedido.cliente?.nombre}</td>
                  <td>
                    {pedido.cliente?.direccion}
                    {pedido.cliente?.comuna ? `, ${pedido.cliente.comuna}` : ''}
                  </td>
                  <td>
                    {pedido.cliente?.fechaEntrega} {pedido.cliente?.horaRetiro}
                  </td>
                  <td>
                    {pedido.items.map((i) => (
                      <div key={i.codigo} className="small">{i.nombre} × {i.cantidad}</div>
                    ))}
                  </td>
                  <td>{formatoCLP(pedido.total)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-success"
                      onClick={() => marcarEntregado(pedido.numero)}
                    >
                      Marcar como entregado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
