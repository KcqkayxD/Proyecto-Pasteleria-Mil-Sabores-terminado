import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import regionesData from '../../data/regionesData';
import { addUsuario, getUsuarios } from '../../data/usuariosData';
import {
  validarRUN,
  validarEmail,
  validarPassword,
  validarNombre,
  validarEdad
} from '../../utils/validaciones';

const initialForm = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
  password: '',
  confirmPassword: '',
  codigoPromo: ''
};

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const comunasDisponibles = regionesData.find((r) => r.region === form.region)?.comunas || [];

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
    if (!validarRUN(form.run)) err.run = 'RUN inválido (módulo 11, sin puntos ni guion).';
    if (!validarNombre(form.nombre, 50)) err.nombre = 'Nombre requerido, máximo 50 caracteres.';
    if (!validarNombre(form.apellidos, 100)) err.apellidos = 'Apellidos requeridos, máximo 100 caracteres.';
    if (!validarEmail(form.correo)) err.correo = 'Correo inválido o dominio no permitido.';
    if (!form.region) err.region = 'Región requerida.';
    if (!form.comuna) err.comuna = 'Comuna requerida.';
    if (!validarNombre(form.direccion, 300)) err.direccion = 'Dirección requerida, máximo 300 caracteres.';
    if (!validarPassword(form.password)) err.password = 'Contraseña entre 4 y 10 caracteres.';
    if (form.confirmPassword !== form.password) err.confirmPassword = 'Las contraseñas no coinciden.';
    return err;
  };

  const edad = validarEdad(form.fechaNacimiento);
  const promoValido = form.codigoPromo.trim().toUpperCase() === 'FELICES50';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorGeneral('');
    const erroresValidacion = validar();
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    const runLimpio = form.run.replace(/\./g, '').replace(/-/g, '').toUpperCase().trim();
    const correoLimpio = form.correo.trim().toLowerCase();

    const yaExiste = getUsuarios().some(
      (u) => u.run === runLimpio || u.correo.toLowerCase() === correoLimpio
    );
    if (yaExiste) {
      setErrorGeneral('Ya existe un usuario con ese correo o RUN.');
      return;
    }

    addUsuario({
      run: runLimpio,
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo: correoLimpio,
      fechaNacimiento: form.fechaNacimiento,
      tipoUsuario: 'Cliente',
      region: form.region,
      comuna: form.comuna,
      direccion: form.direccion.trim(),
      password: form.password,
      codigoPromo: promoValido ? 'FELICES50' : ''
    });

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <section className="d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: '640px', width: '100%' }}>
        <h1 className="mb-1">Crear cuenta</h1>
        <p className="text-muted">Completa tus datos para disfrutar beneficios exclusivos.</p>

        {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="run" className="form-label">RUN</label>
              <input
                type="text"
                id="run"
                className={`form-control ${errores.run ? 'is-invalid' : ''}`}
                placeholder="19011022K"
                value={form.run}
                onChange={handleChange('run')}
              />
              <div className="form-text">Sin puntos ni guion, 7 a 9 caracteres.</div>
              {errores.run && <div className="invalid-feedback d-block">{errores.run}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                maxLength={50}
                value={form.nombre}
                onChange={handleChange('nombre')}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                className={`form-control ${errores.apellidos ? 'is-invalid' : ''}`}
                maxLength={100}
                value={form.apellidos}
                onChange={handleChange('apellidos')}
              />
              {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input
                type="email"
                id="correo"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                maxLength={100}
                value={form.correo}
                onChange={handleChange('correo')}
              />
              <div className="form-text">Dominios permitidos: @inacap.cl, @profesor.inacap.cl, @gmail.com</div>
              {errores.correo && <div className="invalid-feedback d-block">{errores.correo}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="fechaNacimiento" className="form-label">Fecha Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                className="form-control"
                value={form.fechaNacimiento}
                onChange={handleChange('fechaNacimiento')}
              />
              {form.fechaNacimiento && <div className="form-text">Edad calculada: {edad} años</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="region" className="form-label">Región</label>
              <select
                id="region"
                className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                value={form.region}
                onChange={handleChange('region')}
              >
                <option value="">Seleccione una región</option>
                {regionesData.map((r) => (
                  <option key={r.region} value={r.region}>{r.region}</option>
                ))}
              </select>
              {errores.region && <div className="invalid-feedback">{errores.region}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="comuna" className="form-label">Comuna</label>
              <select
                id="comuna"
                className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                value={form.comuna}
                onChange={handleChange('comuna')}
                disabled={!form.region}
              >
                <option value="">Seleccione una comuna</option>
                {comunasDisponibles.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
            </div>

            <div className="col-12">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input
                type="text"
                id="direccion"
                className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                maxLength={300}
                value={form.direccion}
                onChange={handleChange('direccion')}
              />
              {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                minLength={4}
                maxLength={10}
                value={form.password}
                onChange={handleChange('password')}
              />
              {errores.password && <div className="invalid-feedback">{errores.password}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-control ${errores.confirmPassword ? 'is-invalid' : ''}`}
                minLength={4}
                maxLength={10}
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
              {errores.confirmPassword && <div className="invalid-feedback">{errores.confirmPassword}</div>}
            </div>

            <div className="col-12">
              <label htmlFor="codigoPromo" className="form-label">Código Promocional</label>
              <input
                type="text"
                id="codigoPromo"
                className="form-control"
                placeholder="FELICES50"
                value={form.codigoPromo}
                onChange={handleChange('codigoPromo')}
              />
              {form.codigoPromo.trim() && (
                <div className="form-text">
                  {promoValido ? 'Código válido: obtendrás 10% de descuento permanente.' : 'Código no reconocido.'}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">Registrarme</button>
          <p className="text-center mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
