import { getPedidosDelDia, getPedidos } from '../../data/pedidosData';
import { formatoCLP } from '../../utils/formato';

export default function AdminReportes() {
  const ventasHoy = getPedidosDelDia();
  const totalHoy = ventasHoy.reduce((acc, p) => acc + p.total, 0);

  const todosEntregados = getPedidos().filter((p) => p.estado === 'Entregado');
  const totalHistorico = todosEntregados.reduce((acc, p) => acc + p.total, 0);

  return (
    <section>
      <h1 className="mb-4">Reportes / Ventas del día</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h3 className="h6 text-muted">Pedidos entregados hoy</h3>
            <p className="fs-3 fw-bold mb-0">{ventasHoy.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h3 className="h6 text-muted">Total vendido hoy</h3>
            <p className="fs-3 fw-bold mb-0">{formatoCLP(totalHoy)}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h3 className="h6 text-muted">Total histórico entregado</h3>
            <p className="fs-3 fw-bold mb-0">{formatoCLP(totalHistorico)}</p>
          </div>
        </div>
      </div>

      {ventasHoy.length === 0 ? (
        <p>Todavía no hay pedidos entregados hoy.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>N° Pedido</th>
                <th>Fecha</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventasHoy.map((p) => (
                <tr key={p.numero}>
                  <td>#{p.numero}</td>
                  <td>{new Date(p.fecha).toLocaleString('es-CL')}</td>
                  <td>{formatoCLP(p.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
