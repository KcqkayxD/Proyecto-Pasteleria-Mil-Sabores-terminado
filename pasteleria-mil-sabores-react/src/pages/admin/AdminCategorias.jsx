import { useState } from 'react';
import { getCategorias, addCategoria, deleteCategoria } from '../../data/categoriasData';
import { getProductosByCategoria } from '../../data/productosData';

export default function AdminCategorias() {
  const [, forceRender] = useState(0);
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const categorias = getCategorias();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!nombre.trim()) {
      setError('El nombre de la categoría es requerido.');
      return;
    }
    try {
      addCategoria(nombre.trim());
      setNombre('');
      forceRender((n) => n + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminar = (cat) => {
    const enUso = getProductosByCategoria(cat).length > 0;
    if (enUso && !window.confirm(`Hay productos usando "${cat}". ¿Eliminar de todas formas?`)) {
      return;
    }
    deleteCategoria(cat);
    forceRender((n) => n + 1);
  };

  return (
    <section>
      <h1 className="mb-4">Categorías</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 d-flex flex-row gap-2 align-items-start">
        <div className="flex-grow-1">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Nombre de la nueva categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Añadir</button>
      </form>

      <ul className="list-group">
        {categorias.map((cat) => (
          <li key={cat} className="list-group-item d-flex justify-content-between align-items-center">
            {cat}
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleEliminar(cat)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
