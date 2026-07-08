import { getProductos } from '../../data/productosData';
import { getUsuarios } from '../../data/usuariosData';
import { getPedidos } from '../../data/pedidosData';

export default function AdminDashboard() {
  const productos = getProductos();
  const usuarios = getUsuarios();
  const pedidos = getPedidos();

  const criticos = productos.filter(
    (p) => Number.isInteger(p.stockCritico) && p.stock <= p.stockCritico
  ).length;

  const ultimoPedido = pedidos[pedidos.length - 1];

  const kpis = [
    { titulo: 'Total Productos', valor: productos.length },
    { titulo: 'Total Usuarios', valor: usuarios.length },
    { titulo: 'Stock Crítico', valor: criticos },
    { titulo: 'Último pedido', valor: ultimoPedido ? `#${ultimoPedido.numero}` : 'Sin pedidos' }
  ];

  return (
    <section>
      <h1 className="mb-4">Dashboard</h1>
      <div className="row g-3">
        {kpis.map((kpi) => (
          <div key={kpi.titulo} className="col-6 col-lg-3">
            <div className="card p-3 text-center h-100">
              <h3 className="h6 text-muted">{kpi.titulo}</h3>
              <p className="fs-3 fw-bold mb-0">{kpi.valor}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
