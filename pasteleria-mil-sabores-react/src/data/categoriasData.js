const STORAGE_KEY = 'ms_categorias_admin';

const categoriasIniciales = [
  'Tortas Cuadradas',
  'Tortas Circulares',
  'Postres Individuales',
  'Productos Sin Azúcar',
  'Pastelería Tradicional',
  'Productos Sin Gluten',
  'Productos Vegana',
  'Tortas Especiales'
];

function persistir(categorias) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categorias));
}

export function getCategorias() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      persistir(categoriasIniciales);
      return categoriasIniciales;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : categoriasIniciales;
  } catch {
    return categoriasIniciales;
  }
}

export function addCategoria(nombre) {
  const categorias = getCategorias();
  if (categorias.some((c) => c.toLowerCase() === nombre.toLowerCase())) {
    throw new Error('Ya existe una categoría con ese nombre.');
  }
  const actualizado = [...categorias, nombre];
  persistir(actualizado);
  return actualizado;
}

export function deleteCategoria(nombre) {
  const actualizado = getCategorias().filter((c) => c !== nombre);
  persistir(actualizado);
  return actualizado;
}

export default categoriasIniciales;
