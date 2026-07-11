import { useState } from 'react';
import { getCategorias } from '../../data/categoriasData';
<<<<<<< HEAD
import { getProductosByCategoria } from '../../data/productosData';
import ProductCard from '../../components/ProductCard';
import useCart from '../../hooks/useCart';

export default function Categorias() {
  const { agregarProducto } = useCart();
  const categorias = getCategorias();
  const [seleccionada, setSeleccionada] = useState(categorias[0] || '');

  const productos = seleccionada ? getProductosByCategoria(seleccionada) : [];
=======
import { getProductos, getProductosByCategoria } from '../../data/productosData';
import ProductCard from '../../components/ProductCard';
import useCart from '../../hooks/useCart';

const TODAS = 'Todas las categorías';

export default function Categorias() {
  const { agregarProducto } = useCart();
  const categorias = getCategorias();
  const [seleccionada, setSeleccionada] = useState(TODAS);

  const productos = seleccionada === TODAS ? getProductos() : getProductosByCategoria(seleccionada);
>>>>>>> master

  const handleAgregar = (producto) => {
    agregarProducto(producto, 1, '');
    alert('Producto agregado al carrito');
  };

  return (
    <section>
      <h1 className="mb-4">Categorías</h1>

      <div className="d-flex flex-wrap gap-2 mb-4">
<<<<<<< HEAD
=======
        <button
          type="button"
          className={`btn btn-sm ${seleccionada === TODAS ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setSeleccionada(TODAS)}
        >
          {TODAS}
        </button>
>>>>>>> master
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`btn btn-sm ${seleccionada === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {productos.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
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
