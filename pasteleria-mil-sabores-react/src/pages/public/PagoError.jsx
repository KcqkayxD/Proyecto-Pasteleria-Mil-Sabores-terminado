import { Link } from 'react-router-dom';

export default function PagoError() {
  return (
    <section className="d-flex justify-content-center">
      <article className="card p-4 text-center" style={{ maxWidth: '600px' }}>
        <h1>No se pudo procesar el pago 😕</h1>
        <p>Ocurrió un problema al validar tu método de pago. Tu carrito sigue disponible, inténtalo nuevamente.</p>
        <div className="d-flex gap-2 justify-content-center mt-3">
          <Link to="/checkout" className="btn btn-primary">Reintentar pago</Link>
          <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
        </div>
      </article>
    </section>
  );
}
