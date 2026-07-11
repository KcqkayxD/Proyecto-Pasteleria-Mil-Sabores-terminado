const STORAGE_KEY = 'ms_pedidos';

function persistir(pedidos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
}

export function getPedidos() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getPedidoById(numero) {
  return getPedidos().find((p) => p.numero === numero) || null;
}

export function getPedidosPorCorreo(correo) {
  if (!correo) return [];
  return getPedidos()
    .filter((p) => p.cliente?.correo?.toLowerCase() === correo.toLowerCase())
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

export function crearPedido({ items, total, cliente }) {
  const pedidos = getPedidos();
  const numero = String(Math.floor(1000 + Math.random() * 9000));

  const nuevo = {
    numero,
    fecha: new Date().toISOString(),
    items,
    total,
    cliente,
    estado: 'Preparando'
  };

  persistir([...pedidos, nuevo]);
  return nuevo;
}

export function actualizarEstadoPedido(numero, estado) {
  const pedidos = getPedidos();
  const actualizado = pedidos.map((p) => (p.numero === numero ? { ...p, estado } : p));
  persistir(actualizado);
  return actualizado.find((p) => p.numero === numero) || null;
}

export function eliminarPedido(numero) {
  persistir(getPedidos().filter((p) => p.numero !== numero));
}

export function getPedidosDelDia() {
  const hoy = new Date().toDateString();
  return getPedidos().filter(
    (p) => p.estado === 'Entregado' && new Date(p.fecha).toDateString() === hoy
  );
}
