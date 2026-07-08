import { Link, useLocation } from 'react-router-dom';

export default function PagoExitoso() {
  const location = useLocation();
  const numero = location.state?.numero;

  return (
    <section className="d-flex justify-content-center">
      <article className="card p-4 text-center" style={{ maxWidth: '600px' }}>
        <h1>¡Pago confirmado! 🎉</h1>
        {numero && <p>Tu pedido es el #{numero}</p>}
        <p>Tu pedido fue procesado correctamente.</p>
        <p>Gracias por comprar en Pastelería Mil Sabores 💖</p>
        <div className="d-flex gap-2 justify-content-center mt-3">
          <Link to="/" className="btn btn-primary">Volver al inicio</Link>
          <Link to="/productos" className="btn btn-outline-secondary">Seguir comprando</Link>
        </div>
      </article>
    </section>
  );
}
