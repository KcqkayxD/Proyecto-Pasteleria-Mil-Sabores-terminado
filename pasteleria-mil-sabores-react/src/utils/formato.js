export function formatoCLP(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(valor || 0);
}

export function formatearFechaDDMMYYYY(fecha) {
  if (!fecha) return '';
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad -= 1;
  }
  return edad;
}

export function calcularDescuentos(subtotal, usuario) {
  let descuento = 0;
  const mensajes = [];

  const edad = calcularEdad(usuario?.fechaNacimiento);
  if (edad != null && edad >= 50) {
    descuento += subtotal * 0.5;
    mensajes.push('Descuento adulto mayor aplicado (50%).');
  }

  if (usuario?.codigoPromo === 'FELICES50') {
    descuento += subtotal * 0.1;
    mensajes.push('Descuento código FELICES50 aplicado (10%).');
  }

  if (usuario?.correo?.toLowerCase().endsWith('@inacap.cl')) {
    mensajes.push('Beneficio especial: torta gratis en tu cumpleaños.');
  }

  if (descuento > subtotal) descuento = subtotal;

  return { descuento, mensajes };
}
