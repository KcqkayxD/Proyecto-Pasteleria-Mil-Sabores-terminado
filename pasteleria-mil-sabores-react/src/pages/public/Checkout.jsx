import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { formatoCLP, calcularDescuentos, formatearFechaDDMMYYYY } from '../../utils/formato';
import { crearPedido } from '../../data/pedidosData';
import regionesData from '../../data/regionesData';
import { HORA_APERTURA, HORA_CIERRE, esDomingo, validarHoraRetiro, validarFechaHoraRetiro } from '../../utils/validaciones';

export default function Checkout() {
  const { cart, total, vaciarCarrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: usuario ? `${usuario.nombre} ${usuario.apellidos}` : '',
    correo: usuario?.correo || '',
    region: usuario?.region || '',
    comuna: usuario?.comuna || '',
    direccion: usuario?.direccion || '',
    fechaEntrega: null,
    horaRetiro: ''
  });
  const [errores, setErrores] = useState({});

  const { descuento, mensajes } = calcularDescuentos(total, usuario);
  const totalFinal = total - descuento;
  const comunasDisponibles = regionesData.find((r) => r.region === form.region)?.comunas || [];

  const handleChange = (campo) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      [campo]: value,
      ...(campo === 'region' ? { comuna: '' } : {})
    }));
  };

  const handleFechaChange = (fecha) => {
    setForm((prev) => ({ ...prev, fechaEntrega: fecha }));
  };

  const validar = () => {
    const err = {};
    if (!form.nombre.trim()) err.nombre = 'El nombre es requerido.';
    if (!form.correo.trim()) err.correo = 'El correo es requerido.';
    if (!form.region) err.region = 'Selecciona una región.';
    if (!form.comuna) err.comuna = 'Selecciona una comuna.';
    if (!form.direccion.trim()) err.direccion = 'La dirección es requerida.';

    if (!form.fechaEntrega) {
      err.fechaEntrega = 'Selecciona una fecha de retiro.';
    } else if (esDomingo(form.fechaEntrega)) {
      err.fechaEntrega = 'La tienda no atiende los domingos.';
    }

    if (!form.horaRetiro) {
      err.horaRetiro = 'Selecciona una hora de retiro.';
    } else if (!validarHoraRetiro(form.horaRetiro)) {
      err.horaRetiro = `El horario de retiro es de ${HORA_APERTURA} a ${HORA_CIERRE}.`;
    }

    if (!err.fechaEntrega && !err.horaRetiro && !validarFechaHoraRetiro(form.fechaEntrega, form.horaRetiro)) {
      err.fechaEntrega = 'La fecha y hora de retiro deben ser al menos 24 horas después de ahora.';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      navigate('/carrito');
      return;
    }

    const erroresValidacion = validar();
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    // Simulación de pasarela de pago: ~90% de éxito.
    const pagoExitoso = Math.random() > 0.1;

    if (!pagoExitoso) {
      navigate('/pago/error');
      return;
    }

    const pedido = crearPedido({
      items: cart,
      total: totalFinal,
      cliente: { ...form, fechaEntrega: formatearFechaDDMMYYYY(form.fechaEntrega) }
    });

    vaciarCarrito();
    navigate('/pago/exitoso', { state: { numero: pedido.numero } });
  };

  if (cart.length === 0) {
    return (
      <div className="card p-4">
        <h1>No hay productos para pagar</h1>
        <p>
          Tu carrito está vacío. <Link to="/productos">Ir a comprar</Link>
        </p>
      </div>
    );
  }

  return (
    <section className="row g-4">
      <article className="col-lg-7">
        <div className="card p-4">
          <h1 className="mb-4">Datos de entrega</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                value={form.nombre}
                onChange={handleChange('nombre')}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input
                type="email"
                id="correo"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                value={form.correo}
                onChange={handleChange('correo')}
              />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>

            <div className="row g-3 mb-3">
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
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección de envío</label>
              <input
                type="text"
                id="direccion"
                className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                value={form.direccion}
                onChange={handleChange('direccion')}
              />
              {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label htmlFor="fechaEntrega" className="form-label">Fecha de retiro</label>
                <DatePicker
                  id="fechaEntrega"
                  selected={form.fechaEntrega}
                  onChange={handleFechaChange}
                  filterDate={(fecha) => !esDomingo(fecha)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/aaaa"
                  className={`form-control ${errores.fechaEntrega ? 'is-invalid' : ''}`}
                  wrapperClassName="d-block"
                  autoComplete="off"
                />
                {errores.fechaEntrega && <div className="invalid-feedback d-block">{errores.fechaEntrega}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="horaRetiro" className="form-label">Hora de retiro</label>
                <input
                  type="time"
                  id="horaRetiro"
                  min={HORA_APERTURA}
                  max={HORA_CIERRE}
                  className={`form-control ${errores.horaRetiro ? 'is-invalid' : ''}`}
                  value={form.horaRetiro}
                  onChange={handleChange('horaRetiro')}
                />
                {errores.horaRetiro && <div className="invalid-feedback d-block">{errores.horaRetiro}</div>}
              </div>

              <div className="col-12">
                <p className="text-muted small mb-0">
                  Retiro solo en horario de atención: Lunes a Sábado, {HORA_APERTURA} a {HORA_CIERRE}, y con al menos 24 horas de anticipación.
                </p>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Confirmar y pagar</button>
          </form>
        </div>
      </article>

      <aside className="col-lg-5">
        <div className="card p-4">
          <h2 className="h5 mb-3">Resumen del pedido</h2>
          {cart.map((item) => (
            <div key={`${item.codigo}-${item.mensaje}`} className="d-flex justify-content-between mb-2 small">
              <span>{item.nombre} × {item.cantidad}</span>
              <span>{formatoCLP(item.precio * item.cantidad)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <strong>{formatoCLP(total)}</strong>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Descuento:</span>
            <strong>{formatoCLP(descuento)}</strong>
          </div>
          <div className="d-flex justify-content-between fs-5">
            <span>Total:</span>
            <strong>{formatoCLP(totalFinal)}</strong>
          </div>
          {mensajes.length > 0 && <p className="text-muted small mt-2">{mensajes.join(' ')}</p>}
        </div>
      </aside>
    </section>
  );
}
