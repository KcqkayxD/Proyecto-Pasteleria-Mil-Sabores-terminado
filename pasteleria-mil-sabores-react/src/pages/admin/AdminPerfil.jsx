import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { updateUsuario } from '../../data/usuariosData';
import { validarNombre } from '../../utils/validaciones';

export default function AdminPerfil() {
  const { usuario, actualizarUsuarioSesion } = useAuth();
  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellidos || '',
    direccion: usuario?.direccion || '',
    password: usuario?.password || ''
  });
  const [errores, setErrores] = useState({});
  const [guardado, setGuardado] = useState(false);

  const handleChange = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
    setGuardado(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!validarNombre(form.nombre, 50)) err.nombre = 'Nombre requerido, máximo 50.';
    if (!validarNombre(form.apellidos, 100)) err.apellidos = 'Apellidos requeridos, máximo 100.';
    if (!validarNombre(form.direccion, 300)) err.direccion = 'Dirección requerida.';
    if (form.password.length < 4 || form.password.length > 10) err.password = 'Contraseña entre 4 y 10 caracteres.';

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    updateUsuario(usuario.run, form);
    actualizarUsuarioSesion(form);
    setGuardado(true);
  };

  if (!usuario) return null;

  return (
    <section className="d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 className="mb-3">Mi Perfil</h1>
        <p className="text-muted mb-1">RUN: {usuario.run}</p>
        <p className="text-muted mb-3">Correo: {usuario.correo} · {usuario.tipoUsuario}</p>

        {guardado && <div className="alert alert-success">Datos actualizados correctamente.</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={form.nombre}
              onChange={handleChange('nombre')}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              className={`form-control ${errores.apellidos ? 'is-invalid' : ''}`}
              value={form.apellidos}
              onChange={handleChange('apellidos')}
            />
            {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
              value={form.direccion}
              onChange={handleChange('direccion')}
            />
            {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="text"
              className={`form-control ${errores.password ? 'is-invalid' : ''}`}
              value={form.password}
              onChange={handleChange('password')}
            />
            {errores.password && <div className="invalid-feedback">{errores.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
        </form>
      </div>
    </section>
  );
}
