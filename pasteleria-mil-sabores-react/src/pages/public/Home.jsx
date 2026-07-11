import { Link } from 'react-router-dom';
import { getProductos } from '../../data/productosData';
import ProductCard from '../../components/ProductCard';
import useCart from '../../hooks/useCart';

export default function Home() {
  const { agregarProducto } = useCart();
  const destacados = getProductos().slice(0, 4);

  const handleAgregar = (producto) => {
    agregarProducto(producto, 1, '');
    alert('Producto agregado al carrito');
  };

  return (
    <>
      <section className="position-relative rounded-4 overflow-hidden mb-5">
        <img
          src="https://picsum.photos/1200/450?random=11"
          alt="Pasteles artesanales"
          className="w-100"
          style={{ objectFit: 'cover', maxHeight: '420px' }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center text-white p-4"
          style={{ background: 'rgba(93, 64, 55, 0.55)' }}
        >
          <h1 className="display-5">¡Celebra la dulzura de la vida!</h1>
          <p className="lead">
            50 años de tradición chilena, sabor artesanal y un récord Guinness que endulza generaciones.
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            Ver Catálogo
          </Link>
        </div>
      </section>

      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Productos destacados</h2>
          <Link to="/productos" className="link-primary">
            Ver todos
          </Link>
        </div>
        <div className="row">
          {destacados.map((producto) => (
            <ProductCard key={producto.codigo} producto={producto} onAgregar={handleAgregar} />
          ))}
        </div>
      </section>
    </>
  );
}
