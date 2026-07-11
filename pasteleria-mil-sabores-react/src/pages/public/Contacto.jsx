import { useState } from 'react';

const DOMINIOS_PERMITIDOS = ['@inacap.cl', '@profesor.inacap.cl', '@gmail.com'];

function validar({ nombre, correo, comentario }) {
  const errores = {};

  if (!nombre.trim()) errores.nombre = 'El nombre es requerido.';
  else if (nombre.length > 100) errores.nombre = 'Máximo 100 caracteres.';

  if (!correo.trim()) {
    errores.correo = 'El correo es requerido.';
  } else if (correo.length > 100) {
    errores.correo = 'Máximo 100 caracteres.';
  } else if (!DOMINIOS_PERMITIDOS.some((d) => correo.toLowerCase().endsWith(d))) {
    errores.correo = `Solo se aceptan correos ${DOMINIOS_PERMITIDOS.join(', ')}`;
  }

  if (!comentario.trim()) errores.comentario = 'El comentario es requerido.';
  else if (comentario.length > 500) errores.comentario = 'Máximo 500 caracteres.';

  return errores;
}

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', comentario: '' });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(form);
    setErrores(erroresValidacion);
    setEnviado(false);

    if (Object.keys(erroresValidacion).length === 0) {
      setEnviado(true);
      setForm({ nombre: '', correo: '', comentario: '' });
    }
  };

  return (
    <section className="row g-4">
      <article className="col-lg-5">
        <div className="card p-4 h-100">
          <h1>Contáctanos</h1>
          <p>Estamos para ayudarte con tus celebraciones.</p>
          <ul className="list-unstyled">
            <li>📍 Av. Dulzura 1234, Santiago</li>
            <li>📞 +56 2 2345 6789</li>
            <li>✉️ contacto@milsabores.cl</li>
            <li>🕒 Lun a Sáb 09:00 - 20:00</li>
          </ul>
        </div>
      </article>

      <article className="col-lg-7">
        <div className="card p-4">
          <h2>Envíanos un mensaje</h2>

          {enviado && (
            <div className="alert alert-success" role="alert">
              ¡Mensaje enviado! Te responderemos a la brevedad.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="contactoNombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="contactoNombre"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                maxLength={100}
                value={form.nombre}
                onChange={handleChange('nombre')}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactoCorreo" className="form-label">Correo</label>
              <input
                type="email"
                id="contactoCorreo"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                maxLength={100}
                value={form.correo}
                onChange={handleChange('correo')}
              />
              <div className="form-text">Dominios: @inacap.cl, @profesor.inacap.cl, @gmail.com</div>
              {errores.correo && <div className="invalid-feedback d-block">{errores.correo}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactoComentario" className="form-label">Comentario</label>
              <textarea
                id="contactoComentario"
                className={`form-control ${errores.comentario ? 'is-invalid' : ''}`}
                maxLength={500}
                rows={6}
                value={form.comentario}
                onChange={handleChange('comentario')}
              />
              <div className="form-text">{form.comentario.length} / 500</div>
              {errores.comentario && <div className="invalid-feedback d-block">{errores.comentario}</div>}
            </div>

            <button className="btn btn-primary" type="submit">Enviar mensaje</button>
          </form>
        </div>
      </article>
    </section>
  );
}
