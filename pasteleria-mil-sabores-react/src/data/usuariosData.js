const STORAGE_KEY = 'ms_usuarios';
const VERSION_KEY = 'ms_usuarios_version';
const STORAGE_VERSION = '2'; // subir este valor invalida datos guardados de versiones anteriores

const usuariosIniciales = [
  {
    run: '19011022K',
    nombre: 'Ana',
    apellidos: 'Admin',
    correo: 'admin@gmail.com',
    fechaNacimiento: '1980-01-01',
    tipoUsuario: 'Administrador',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    direccion: 'Av. Central 123',
    telefono: '+56911111111',
    password: '1234',
    codigoPromo: ''
  },
  {
    run: '17654321K',
    nombre: 'Vero',
    apellidos: 'Vendedor',
    correo: 'vendedor@gmail.com',
    fechaNacimiento: '1990-03-15',
    tipoUsuario: 'Vendedor',
    region: 'Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Calle Comercio 45',
    telefono: '+56922222222',
    password: '1234',
    codigoPromo: ''
  },
  {
    run: '16543210K',
    nombre: 'Carlos',
    apellidos: 'Cliente',
    correo: 'cliente@gmail.com',
    fechaNacimiento: '1965-10-20',
    tipoUsuario: 'Cliente',
    region: 'Biobío',
    comuna: 'Concepción',
    direccion: 'Pasaje Dulce 77',
    telefono: '+56933333333',
    password: '1234',
    codigoPromo: 'FELICES50'
  }
];

function persistir(usuarios) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
  localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
}

export function getUsuarios() {
  const data = localStorage.getItem(STORAGE_KEY);
  const version = localStorage.getItem(VERSION_KEY);
  if (!data || version !== STORAGE_VERSION) {
    persistir(usuariosIniciales);
    return usuariosIniciales;
  }

  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) throw new Error('Formato inválido');
    return parsed;
  } catch {
    persistir(usuariosIniciales);
    return usuariosIniciales;
  }
}

export function getUsuarioById(run) {
  return getUsuarios().find((u) => u.run === run) || null;
}

export function addUsuario(usuario) {
  const usuarios = getUsuarios();
  const existe = usuarios.some(
    (u) => u.run === usuario.run || u.correo.toLowerCase() === usuario.correo.toLowerCase()
  );

  if (existe) {
    throw new Error('Ya existe un usuario con ese RUN o correo.');
  }

  const nuevo = { ...usuario };
  const actualizados = [...usuarios, nuevo];
  persistir(actualizados);
  return nuevo;
}

export function updateUsuario(run, datos) {
  const usuarios = getUsuarios();
  const index = usuarios.findIndex((u) => u.run === run);
  if (index === -1) throw new Error('Usuario no encontrado.');

  const correoDuplicado = usuarios.some(
    (u, i) =>
      i !== index &&
      datos.correo &&
      u.correo.toLowerCase() === String(datos.correo).toLowerCase()
  );

  if (correoDuplicado) {
    throw new Error('El correo ya está en uso por otro usuario.');
  }

  const actualizados = [...usuarios];
  actualizados[index] = { ...actualizados[index], ...datos };
  persistir(actualizados);
  return actualizados[index];
}

export function deleteUsuario(run) {
  const usuarios = getUsuarios();
  const filtrados = usuarios.filter((u) => u.run !== run);
  if (filtrados.length === usuarios.length) throw new Error('Usuario no encontrado.');
  persistir(filtrados);
  return true;
}

export function loginUsuario(correo, password) {
  const usuario = getUsuarios().find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
  );
  return usuario || null;
}

export { usuariosIniciales };
