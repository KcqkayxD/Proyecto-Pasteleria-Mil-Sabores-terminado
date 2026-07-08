const STORAGE_KEY = 'ms_productos';
const VERSION_KEY = 'ms_productos_version';
const STORAGE_VERSION = '2'; // subir este valor invalida datos guardados de versiones anteriores (ej: URLs de imagen viejas)

const productosIniciales = [
  { codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, stock: 15, stockCritico: 5, forma: 'cuadrada', descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.', imagen: 'https://picsum.photos/seed/TC001/400/300', activo: true },
  { codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, stock: 10, stockCritico: 3, forma: 'cuadrada', descripcion: 'Mezcla de frutas frescas y crema chantilly sobre bizcocho de vainilla.', imagen: 'https://picsum.photos/seed/TC002/400/300', activo: true },
  { codigo: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000, stock: 20, stockCritico: 5, forma: 'circular', descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera.', imagen: 'https://picsum.photos/seed/TT001/400/300', activo: true },
  { codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, stock: 8, stockCritico: 4, forma: 'circular', descripcion: 'Torta tradicional chilena con manjar y nueces.', imagen: 'https://picsum.photos/seed/TT002/400/300', activo: true },
  { codigo: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000, stock: 50, stockCritico: 10, forma: 'N/A', descripcion: 'Postre individual cremoso con chocolate de alta calidad.', imagen: 'https://picsum.photos/seed/PI001/400/300', activo: true },
  { codigo: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500, stock: 40, stockCritico: 8, forma: 'N/A', descripcion: 'Postre italiano con capas de café, mascarpone y cacao.', imagen: 'https://picsum.photos/seed/PI002/400/300', activo: true },
  { codigo: 'PSA001', categoria: 'Productos Sin Azúcar', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000, stock: 5, stockCritico: 2, forma: 'circular', descripcion: 'Torta ligera endulzada naturalmente.', imagen: 'https://picsum.photos/seed/PSA001/400/300', activo: true },
  { codigo: 'PSA002', categoria: 'Productos Sin Azúcar', nombre: 'Cheesecake Sin Azúcar', precio: 47000, stock: 6, stockCritico: 2, forma: 'circular', descripcion: 'Suave y cremoso, opción perfecta sin culpa.', imagen: 'https://picsum.photos/seed/PSA002/400/300', activo: true },
  { codigo: 'PT001', categoria: 'Pastelería Tradicional', nombre: 'Empanada de Manzana', precio: 3000, stock: 100, stockCritico: 20, forma: 'N/A', descripcion: 'Pastelería tradicional rellena de manzanas especiadas.', imagen: 'https://picsum.photos/seed/PT001/400/300', activo: true },
  { codigo: 'PT002', categoria: 'Pastelería Tradicional', nombre: 'Tarta de Santiago', precio: 6000, stock: 30, stockCritico: 5, forma: 'N/A', descripcion: 'Tarta española con almendras, azúcar y huevos.', imagen: 'https://picsum.photos/seed/PT002/400/300', activo: true },
  { codigo: 'PG001', categoria: 'Productos Sin Gluten', nombre: 'Brownie Sin Gluten', precio: 4000, stock: 25, stockCritico: 5, forma: 'N/A', descripcion: 'Rico y denso, sin sacrificar el sabor.', imagen: 'https://picsum.photos/seed/PG001/400/300', activo: true },
  { codigo: 'PG002', categoria: 'Productos Sin Gluten', nombre: 'Pan Sin Gluten', precio: 3500, stock: 20, stockCritico: 5, forma: 'N/A', descripcion: 'Suave y esponjoso para sándwiches.', imagen: 'https://picsum.photos/seed/PG002/400/300', activo: true },
  { codigo: 'PV001', categoria: 'Productos Vegana', nombre: 'Torta Vegana de Chocolate', precio: 50000, stock: 7, stockCritico: 3, forma: 'circular', descripcion: 'Húmeda y deliciosa, sin productos de origen animal.', imagen: 'https://picsum.photos/seed/PV001/400/300', activo: true },
  { codigo: 'PV002', categoria: 'Productos Vegana', nombre: 'Galletas Veganas de Avena', precio: 4500, stock: 60, stockCritico: 15, forma: 'N/A', descripcion: 'Crujientes y saludables.', imagen: 'https://picsum.photos/seed/PV002/400/300', activo: true },
  { codigo: 'TE001', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Cumpleaños', precio: 55000, stock: 4, stockCritico: 2, forma: 'circular', descripcion: 'Personalizable con decoraciones y mensajes únicos.', imagen: 'https://picsum.photos/seed/TE001/400/300', activo: true },
  { codigo: 'TE002', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Boda', precio: 60000, stock: 2, stockCritico: 1, forma: 'circular', descripcion: 'Elegante y deliciosa, centro de atención en bodas.', imagen: 'https://picsum.photos/seed/TE002/400/300', activo: true }
];

function persistir(productos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
}

export function getProductos() {
  const data = localStorage.getItem(STORAGE_KEY);
  const version = localStorage.getItem(VERSION_KEY);
  if (!data || version !== STORAGE_VERSION) {
    persistir(productosIniciales);
    return productosIniciales;
  }
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) throw new Error('Formato inválido');
    return parsed;
  } catch {
    persistir(productosIniciales);
    return productosIniciales;
  }
}

export function getProductoById(codigo) {
  return getProductos().find((p) => p.codigo === codigo) || null;
}

export function addProducto(producto) {
  const productos = getProductos();
  if (productos.some((p) => p.codigo === producto.codigo)) {
    throw new Error('Ya existe un producto con ese código.');
  }
  const nuevo = { ...producto, activo: producto.activo ?? true };
  const actualizado = [...productos, nuevo];
  persistir(actualizado);
  return nuevo;
}

export function updateProducto(codigo, datos) {
  const productos = getProductos();
  const index = productos.findIndex((p) => p.codigo === codigo);
  if (index === -1) throw new Error('Producto no encontrado.');
  const actualizado = [...productos];
  actualizado[index] = { ...actualizado[index], ...datos };
  persistir(actualizado);
  return actualizado[index];
}

export function deleteProducto(codigo) {
  const productos = getProductos();
  const filtrados = productos.filter((p) => p.codigo !== codigo);
  if (filtrados.length === productos.length) throw new Error('Producto no encontrado.');
  persistir(filtrados);
  return true;
}

export function getProductosByCategoria(categoria) {
  return getProductos().filter((p) => p.categoria === categoria);
}

export function getProductosEnOferta() {
  return getProductos().filter((p) => p.stock > 0 && p.precio < 50000);
}

export { productosIniciales };
