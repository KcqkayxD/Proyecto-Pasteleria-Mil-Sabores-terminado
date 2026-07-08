import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductoById } from '../../data/productosData';
import { formatoCLP } from '../../utils/formato';
import useCart from '../../hooks/useCart';

export default function ProductoDetalle() {
  const { id } = useParams();
  const { agregarProducto } = useCart();
  const producto = getProductoById(id);

  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  if (!producto) {
    return (
      <div className="card p-4">
        <h2>Producto no encontrado</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  const urlActual = typeof window !== 'undefined' ? window.location.href : '';

  const handleAgregar = () => {
    agregarProducto(producto, cantidad, mensaje.trim());
    alert('Producto agregado al carrito');
  };

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded-4" />
      </div>
      <div className="col-md-6">
        <div className="card p-4 h-100">
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p className="fs-4 fw-bold">{formatoCLP(producto.precio)}</p>

          <div className="d-flex align-items-center gap-3 mb-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            >
              -
            </button>
            <span>{cantidad}</span>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setCantidad((c) => c + 1)}
            >
              +
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="mensajePersonalizado" className="form-label">Mensaje personalizado</label>
            <input
              type="text"
              id="mensajePersonalizado"
              className="form-control"
              maxLength={120}
              placeholder="Ej: Feliz cumpleaños Ana"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>

          <button type="button" className="btn btn-primary btn-lg mb-3" onClick={handleAgregar}>
            Añadir al carrito
          </button>

          <p className="mb-0">
            Compartir:{' '}
            <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlActual)}`}>
              Facebook
            </a>{' '}
            |{' '}
            <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlActual)}`}>
              Twitter
            </a>{' '}
            |{' '}
            <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(urlActual)}`}>
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
