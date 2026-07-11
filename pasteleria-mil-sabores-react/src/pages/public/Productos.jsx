import { useMemo, useState } from 'react';
import { getProductos } from '../../data/productosData';
import { getCategorias } from '../../data/categoriasData';
import ProductCard from '../../components/ProductCard';
import useCart from '../../hooks/useCart';

export default function Productos() {
  const { agregarProducto } = useCart();
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [forma, setForma] = useState('');

  const productos = getProductos();
  const categorias = getCategorias();

  const filtrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();
    return productos.filter((p) => {
      const okNombre = p.nombre.toLowerCase().includes(texto);
      const okCategoria = !categoria || p.categoria === categoria;
      const okForma = !forma || p.forma === forma;
      return okNombre && okCategoria && okForma;
    });
  }, [productos, busqueda, categoria, forma]);

  const handleAgregar = (producto) => {
    agregarProducto(producto, 1, '');
    alert('Producto agregado al carrito');
  };

  return (
    <section>
      <h1 className="mb-4">Catálogo de Productos</h1>

      <div className="row g-2 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={forma}
            onChange={(e) => setForma(e.target.value)}
          >
            <option value="">Todas las formas</option>
            <option value="cuadrada">Cuadrada</option>
            <option value="circular">Circular</option>
            <option value="N/A">N/A</option>
          </select>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p>No se encontraron productos con esos filtros.</p>
      ) : (
        <div className="row">
          {filtrados.map((producto) => (
            <ProductCard key={producto.codigo} producto={producto} onAgregar={handleAgregar} />
          ))}
        </div>
      )}
    </section>
  );
}
