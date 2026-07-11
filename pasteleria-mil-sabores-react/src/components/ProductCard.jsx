import { Link } from 'react-router-dom';
import { formatoCLP } from '../utils/formato';

export default function ProductCard({ producto, onAgregar }) {
  const sinStock = producto.stock <= 0;

  return (
    <div className="col-sm-6 col-lg-3 mb-4">
      <div className="card h-100">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="card-img-top"
          style={{ objectFit: 'cover', height: '180px' }}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="h6">{producto.nombre}</h3>
          <p className="text-muted small mb-2">{producto.categoria}</p>
          <p className="fw-bold mb-3">{formatoCLP(producto.precio)}</p>

          {producto.stockCritico != null && producto.stock <= producto.stockCritico && !sinStock && (
            <p className="text-danger small mb-2">¡Quedan pocas unidades!</p>
          )}

          <div className="mt-auto d-flex gap-2">
            <Link to={`/producto/${producto.codigo}`} className="btn btn-outline-secondary btn-sm flex-fill">
              Ver detalle
            </Link>
            <button
              type="button"
              className="btn btn-primary btn-sm flex-fill"
              disabled={sinStock}
              onClick={() => onAgregar?.(producto)}
            >
              {sinStock ? 'Sin stock' : 'Añadir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
