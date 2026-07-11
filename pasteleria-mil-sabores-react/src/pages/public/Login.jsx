import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { validarEmail, validarPassword } from '../../utils/validaciones';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorLogin, setErrorLogin] = useState('');

  const handleChange = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorLogin('');

    const nuevosErrores = {};
    if (!validarEmail(form.correo)) nuevosErrores.correo = 'Correo inválido o dominio no permitido.';
    if (!validarPassword(form.password)) nuevosErrores.password = 'Contraseña entre 4 y 10 caracteres.';
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    const user = login(form.correo, form.password);
    if (!user) {
      setErrorLogin('Credenciales inválidas.');
      return;
    }

    if (['Administrador', 'Vendedor'].includes(user.tipoUsuario)) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <section className="d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <h1 className="mb-3 text-center">Iniciar sesión</h1>

        {errorLogin && <div className="alert alert-danger">{errorLogin}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="loginCorreo" className="form-label">Correo</label>
            <input
              type="email"
              id="loginCorreo"
              className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
              maxLength={100}
              value={form.correo}
              onChange={handleChange('correo')}
            />
            {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Contraseña</label>
            <input
              type="password"
              id="loginPassword"
              className={`form-control ${errores.password ? 'is-invalid' : ''}`}
              minLength={4}
              maxLength={10}
              value={form.password}
              onChange={handleChange('password')}
            />
            {errores.password && <div className="invalid-feedback">{errores.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Ingresar</button>

          <p className="text-center mb-1">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
          <p className="text-center mb-0">
            <Link to="/">Volver al home</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
