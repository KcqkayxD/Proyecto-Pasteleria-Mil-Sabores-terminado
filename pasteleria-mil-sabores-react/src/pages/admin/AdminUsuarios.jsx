import { useState } from 'react';
import { getUsuarios, addUsuario, updateUsuario, deleteUsuario } from '../../data/usuariosData';
import regionesData from '../../data/regionesData';
import {
  validarRUN,
  validarEmail,
  validarPassword,
  validarNombre
} from '../../utils/validaciones';
import useAuth from '../../hooks/useAuth';

const formVacio = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  tipoUsuario: 'Cliente',
  region: '',
  comuna: '',
  direccion: '',
  password: ''
};

export default function AdminUsuarios() {
  const { usuario: usuarioActual } = useAuth();
  const [, forceRender] = useState(0);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(formVacio);
  const [errores, setErrores] = useState({});

  const usuarios = getUsuarios();
  const comunasDisponibles = regionesData.find((r) => r.region === form.region)?.comunas || [];

  const refrescar = () => forceRender((n) => n + 1);

  const abrirNuevo = () => {
    setEditando(null);
    setForm(formVacio);
    setErrores({});
    setMostrarForm(true);
  };

  const abrirEditar = (u) => {
    setEditando(u.run);
    setForm({
      run: u.run,
      nombre: u.nombre,
      apellidos: u.apellidos,
      correo: u.correo,
      tipoUsuario: u.tipoUsuario,
      region: u.region || '',
      comuna: u.comuna || '',
      direccion: u.direccion || '',
      password: u.password || ''
    });
    setErrores({});
    setMostrarForm(true);
  };

  const handleChange = (campo) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      [campo]: value,
      ...(campo === 'region' ? { comuna: '' } : {})
    }));
  };

  const validar = () => {
    const err = {};
    if (!validarRUN(form.run)) err.run = 'RUN inválido.';
    if (!validarNombre(form.nombre, 50)) err.nombre = 'Nombre requerido, máximo 50.';
    if (!validarNombre(form.apellidos, 100)) err.apellidos = 'Apellidos requeridos, máximo 100.';
    if (!validarEmail(form.correo)) err.correo = 'Correo inválido.';
    if (!form.tipoUsuario) err.tipoUsuario = 'Tipo de usuario requerido.';
    if (!form.region) err.region = 'Región requerida.';
    if (!form.comuna) err.comuna = 'Comuna requerida.';
    if (!validarNombre(form.direccion, 300)) err.direccion = 'Dirección requerida.';
    if (!validarPassword(form.password)) err.password = 'Contraseña entre 4 y 10 caracteres.';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar();
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    const runLimpio = form.run.replace(/\./g, '').replace(/-/g, '').toUpperCase().trim();
    const datos = {
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo: form.correo.trim().toLowerCase(),
      tipoUsuario: form.tipoUsuario,
      region: form.region,
      comuna: form.comuna,
      direccion: form.direccion.trim(),
      password: form.password
    };

    try {
      if (editando) {
        updateUsuario(editando, datos);
      } else {
        addUsuario({ run: runLimpio, ...datos, codigoPromo: '' });
      }
      setMostrarForm(false);
      refrescar();
    } catch (err) {
      setErrores({ run: err.message });
    }
  };

  const handleEliminar = (run) => {
    if (usuarioActual?.run === run) {
      alert('No puedes eliminar tu propio usuario en sesión.');
      return;
    }
    if (!window.confirm('¿Eliminar este usuario?')) return;
    deleteUsuario(run);
    refrescar();
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Usuarios</h1>
        <button type="button" className="btn btn-primary" onClick={abrirNuevo}>
          + Nuevo Usuario
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={handleSubmit} className="card p-3 mb-4" noValidate>
          <h2 className="h5">{editando ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">RUN</label>
              <input
                type="text"
                className={`form-control ${errores.run ? 'is-invalid' : ''}`}
                disabled={!!editando}
                value={form.run}
                onChange={handleChange('run')}
              />
              {errores.run && <div className="invalid-feedback d-block">{errores.run}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                value={form.nombre}
                onChange={handleChange('nombre')}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                className={`form-control ${errores.apellidos ? 'is-invalid' : ''}`}
                value={form.apellidos}
                onChange={handleChange('apellidos')}
              />
              {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                value={form.correo}
                onChange={handleChange('correo')}
              />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Tipo de usuario</label>
              <select
                className={`form-select ${errores.tipoUsuario ? 'is-invalid' : ''}`}
                value={form.tipoUsuario}
                onChange={handleChange('tipoUsuario')}
              >
                <option value="Administrador">Administrador</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Región</label>
              <select
                className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                value={form.region}
                onChange={handleChange('region')}
              >
                <option value="">Seleccione región</option>
                {regionesData.map((r) => (
                  <option key={r.region} value={r.region}>{r.region}</option>
                ))}
              </select>
              {errores.region && <div className="invalid-feedback">{errores.region}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Comuna</label>
              <select
                className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                value={form.comuna}
                onChange={handleChange('comuna')}
                disabled={!form.region}
              >
                <option value="">Seleccione comuna</option>
                {comunasDisponibles.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
            </div>

            <div className="col-md-8">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                value={form.direccion}
                onChange={handleChange('direccion')}
              />
              {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label">Contraseña</label>
              <input
                type="text"
                className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                value={form.password}
                onChange={handleChange('password')}
              />
              {errores.password && <div className="invalid-feedback">{errores.password}</div>}
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
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Región</th>
              <th>Comuna</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.run}>
                <td>{u.run}</td>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td>{u.tipoUsuario}</td>
                <td>{u.region || '-'}</td>
                <td>{u.comuna || '-'}</td>
                <td className="d-flex gap-1">
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => abrirEditar(u)}>
                    Editar
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(u.run)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
