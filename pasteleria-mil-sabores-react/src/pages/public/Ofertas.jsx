import { getProductosEnOferta } from '../../data/productosData';
import ProductCard from '../../components/ProductCard';
import useCart from '../../hooks/useCart';

export default function Ofertas() {
  const { agregarProducto } = useCart();
  const productos = getProductosEnOferta();

  const handleAgregar = (producto) => {
    agregarProducto(producto, 1, '');
    alert('Producto agregado al carrito');
  };

  return (
    <section>
      <h1 className="mb-4">Ofertas</h1>
      <p className="text-muted">Productos con precios especiales, ¡aprovecha antes de que se acaben!</p>

      {productos.length === 0 ? (
        <p>No hay ofertas disponibles por el momento.</p>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <ProductCard key={producto.codigo} producto={producto} onAgregar={handleAgregar} />
          ))}
        </div>
      )}
    </section>
  );
}
