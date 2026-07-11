function limpiarRUN(run = '') {
  return run.replace(/\./g, '').replace(/-/g, '').toUpperCase().trim();
}

export function validarRUN(run) {
  const limpio = limpiarRUN(run);

  if (limpio.length < 7 || limpio.length > 9) return false;
  if (!/^\d{6,8}[\dK]$/.test(limpio)) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);

  return dv === dvEsperado;
}

export function validarEmail(email = '') {
  const val = email.toLowerCase().trim();
  const dominiosPermitidos = [
    '@inacap.cl',
    '@profesor.inacap.cl',
    '@gmail.com',
  ];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return false;
  return dominiosPermitidos.some((dominio) => val.endsWith(dominio));
}

export function validarPassword(password = '') {
  return password.length >= 4 && password.length <= 10;
}

export function validarNombre(nombre = '', max = 50) {
  const limpio = nombre.trim();
  return limpio.length > 0 && limpio.length <= max;
}

export function validarEdad(fechaNacimiento) {
  if (!fechaNacimiento) return 0;

  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad -= 1;
  }

  return edad;
}

export function validarStock(stock) {
  const numero = Number(stock);
  return Number.isInteger(numero) && numero >= 0;
}

export function validarPrecio(precio) {
  const numero = Number(precio);
  return !Number.isNaN(numero) && numero >= 0;
}

export const HORA_APERTURA = '09:00';
export const HORA_CIERRE = '20:00';

export function esDomingo(fecha) {
  return fecha instanceof Date && !Number.isNaN(fecha.getTime()) && fecha.getDay() === 0;
}

export function validarHoraRetiro(hora) {
  return /^\d{2}:\d{2}$/.test(hora || '') && hora >= HORA_APERTURA && hora <= HORA_CIERRE;
}

export function validarFechaHoraRetiro(fecha, hora) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) return false;
  if (esDomingo(fecha)) return false;
  if (!validarHoraRetiro(hora)) return false;

  const [horas, minutos] = hora.split(':').map(Number);
  const fechaRetiro = new Date(fecha);
  fechaRetiro.setHours(horas, minutos, 0, 0);

  const minimo = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return fechaRetiro.getTime() >= minimo.getTime();
}
