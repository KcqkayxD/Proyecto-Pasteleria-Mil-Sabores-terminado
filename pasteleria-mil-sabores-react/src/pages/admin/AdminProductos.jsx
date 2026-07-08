import { useState } from 'react';
import {
  getProductos,
  addProducto,
  updateProducto,
  deleteProducto
} from '../../data/productosData';
import { getCategorias } from '../../data/categoriasData';
import { formatoCLP } from '../../utils/formato';
import { validarNombre, validarPrecio, validarStock } from '../../utils/validaciones';
import useAuth from '../../hooks/useAuth';

const formVacio = {
  codigo: '',
  nombre: '',
  categoria: '',
  descripcion: '',
  precio: '',
  stock: '',
  stockCritico: '',
  forma: 'N/A',
  imagen: ''
};

export default function AdminProductos() {
  const { hasRole } = useAuth();
  const soloLectura = hasRole(['Vendedor']) && !hasRole(['Administrador']);

  const [, forceRender] = useState(0);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(formVacio);
  const [errores, setErrores] = useState({});

  const productos = getProductos();
  const categorias = getCategorias();

  const refrescar = () => forceRender((n) => n + 1);

  const abrirNuevo = () => {
    setEditando(null);
    setForm(formVacio);
    setErrores({});
    setMostrarForm(true);
  };

  const abrirEditar = (producto) => {
    setEditando(producto.codigo);
    setForm({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock: producto.stock,
      stockCritico: producto.stockCritico ?? '',
      forma: producto.forma || 'N/A',
      imagen: producto.imagen || ''
    });
    setErrores({});
    setMostrarForm(true);
  };

  const handleChange = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const validar = () => {
    const err = {};
    if (!form.codigo.trim() || form.codigo.trim().length < 3) err.codigo = 'Código requerido, mínimo 3 caracteres.';
    if (!validarNombre(form.nombre, 100)) err.nombre = 'Nombre requerido, máximo 100 caracteres.';
    if (form.descripcion.length > 500) err.descripcion = 'Descripción máximo 500 caracteres.';
    if (!validarPrecio(form.precio)) err.precio = 'Precio requerido y mayor o igual a 0.';
    if (!validarStock(form.stock)) err.stock = 'Stock entero y mayor o igual a 0.';
    if (form.stockCritico !== '' && !validarStock(form.stockCritico)) err.stockCritico = 'Stock crítico entero mayor o igual a 0.';
    if (!form.categoria) err.categoria = 'Categoría requerida.';
    if (form.imagen && !/^https?:\/\//i.test(form.imagen.trim())) err.imagen = 'La imagen debe ser una URL válida.';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar();
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    const datos = {
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: form.stockCritico === '' ? null : Number(form.stockCritico),
      forma: form.forma,
      imagen: form.imagen.trim() || `https://picsum.photos/seed/${Date.now()}/400/300`
    };

    try {
      if (editando) {
        updateProducto(editando, datos);
      } else {
        addProducto({ codigo: form.codigo.trim().toUpperCase(), ...datos, activo: true });
      }
      setMostrarForm(false);
      refrescar();
    } catch (err) {
      setErrores({ codigo: err.message });
    }
  };

  const handleEliminar = (codigo) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    deleteProducto(codigo);
    refrescar();
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        {!soloLectura && (
          <button type="button" className="btn btn-primary" onClick={abrirNuevo}>
            + Nuevo Producto
          </button>
        )}
      </div>

      {mostrarForm && !soloLectura && (
        <form onSubmit={handleSubmit} className="card p-3 mb-4" noValidate>
          <h2 className="h5">{editando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Código</label>
              <input
                type="text"
                className={`form-control ${errores.codigo ? 'is-invalid' : ''}`}
                value={form.codigo}
                disabled={!!editando}
                onChange={handleChange('codigo')}
              />
              {errores.codigo && <div className="invalid-feedback d-block">{errores.codigo}</div>}
            </div>
            <div className="col-md-8">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                maxLength={100}
                value={form.nombre}
                onChange={handleChange('nombre')}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Categoría</label>
              <select
                className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                value={form.categoria}
                onChange={handleChange('categoria')}
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Forma</label>
              <select className="form-select" value={form.forma} onChange={handleChange('forma')}>
                <option value="cuadrada">Cuadrada</option>
                <option value="circular">Circular</option>
                <option value="N/A">N/A</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                maxLength={500}
                rows={2}
                value={form.descripcion}
                onChange={handleChange('descripcion')}
              />
              {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label">Precio</label>
              <input
                type="number"
                min="0"
                className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                value={form.precio}
                onChange={handleChange('precio')}
              />
              {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label">Stock</label>
              <input
                type="number"
                min="0"
                className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                value={form.stock}
                onChange={handleChange('stock')}
              />
              {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label">Stock Crítico</label>
              <input
                type="number"
                min="0"
                className={`form-control ${errores.stockCritico ? 'is-invalid' : ''}`}
                value={form.stockCritico}
                onChange={handleChange('stockCritico')}
              />
              {errores.stockCritico && <div className="invalid-feedback">{errores.stockCritico}</div>}
            </div>

            <div className="col-12">
              <label className="form-label">Imagen (URL)</label>
              <input
                type="text"
                className={`form-control ${errores.imagen ? 'is-invalid' : ''}`}
                value={form.imagen}
                onChange={handleChange('imagen')}
              />
              {errores.imagen && <div className="invalid-feedback">{errores.imagen}</div>}
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setMostrarForm(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              {!soloLectura && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.codigo}>
                <td>
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                </td>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatoCLP(p.precio)}</td>
                <td>
                  {p.stock}
                  {Number.isInteger(p.stockCritico) && p.stock <= p.stockCritico && (
                    <span className="badge bg-danger ms-2">Crítico</span>
                  )}
                </td>
                <td>{p.activo === false ? 'Inactivo' : 'Activo'}</td>
                {!soloLectura && (
                  <td className="d-flex gap-1">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => abrirEditar(p)}>
                      Editar
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(p.codigo)}>
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
