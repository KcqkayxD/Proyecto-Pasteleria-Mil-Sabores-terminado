const CATEGORIAS = [
  "Tortas Cuadradas",
  "Tortas Circulares",
  "Postres Individuales",
  "Productos Sin Azúcar",
  "Pastelería Tradicional",
  "Productos Sin Gluten",
  "Productos Vegana",
  "Tortas Especiales"
];

const PRODUCTOS_INICIALES = [
  { codigo: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000, forma: "cuadrada", descripcion: "Deliciosa torta de chocolate con capas de ganache y avellanas. Personalizable.", imagen: "https://picsum.photos/seed/TC001/400/300", stock: 20, stockCritico: 5 },
  { codigo: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000, forma: "cuadrada", descripcion: "Mezcla de frutas frescas y crema chantilly sobre bizcocho de vainilla.", imagen: "https://picsum.photos/seed/TC002/400/300", stock: 12, stockCritico: 5 },
  { codigo: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000, forma: "circular", descripcion: "Bizcocho de vainilla clásico con crema pastelera y glaseado dulce.", imagen: "https://picsum.photos/seed/TT001/400/300", stock: 22, stockCritico: 6 },
  { codigo: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", precio: 42000, forma: "circular", descripcion: "Torta tradicional chilena con manjar y nueces.", imagen: "https://picsum.photos/seed/TT002/400/300", stock: 18, stockCritico: 5 },
  { codigo: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", precio: 5000, forma: "N/A", descripcion: "Postre cremoso con chocolate de alta calidad.", imagen: "https://picsum.photos/seed/PI001/400/300", stock: 40, stockCritico: 10 },
  { codigo: "PI002", categoria: "Postres Individuales", nombre: "Tiramisú Clásico", precio: 5500, forma: "N/A", descripcion: "Postre italiano con capas de café, mascarpone y cacao.", imagen: "https://picsum.photos/seed/PI002/400/300", stock: 38, stockCritico: 10 },
  { codigo: "PSA001", categoria: "Productos Sin Azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, forma: "circular", descripcion: "Torta ligera endulzada naturalmente.", imagen: "https://picsum.photos/seed/PSA001/400/300", stock: 14, stockCritico: 4 },
  { codigo: "PSA002", categoria: "Productos Sin Azúcar", nombre: "Cheesecake Sin Azúcar", precio: 47000, forma: "circular", descripcion: "Suave y cremoso, opción sin culpa.", imagen: "https://picsum.photos/seed/PSA002/400/300", stock: 13, stockCritico: 4 },
  { codigo: "PT001", categoria: "Pastelería Tradicional", nombre: "Empanada de Manzana", precio: 3000, forma: "N/A", descripcion: "Pastelería tradicional rellena de manzanas especiadas.", imagen: "https://picsum.photos/seed/PT001/400/300", stock: 55, stockCritico: 15 },
  { codigo: "PT002", categoria: "Pastelería Tradicional", nombre: "Tarta de Santiago", precio: 6000, forma: "N/A", descripcion: "Tarta española con almendras, azúcar y huevos.", imagen: "https://picsum.photos/seed/PT002/400/300", stock: 36, stockCritico: 8 },
  { codigo: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000, forma: "N/A", descripcion: "Rico y denso, sin sacrificar el sabor.", imagen: "https://picsum.photos/seed/PG001/400/300", stock: 44, stockCritico: 10 },
  { codigo: "PG002", categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", precio: 3500, forma: "N/A", descripcion: "Suave y esponjoso para sándwiches.", imagen: "https://picsum.photos/seed/PG002/400/300", stock: 41, stockCritico: 10 },
  { codigo: "PV001", categoria: "Productos Vegana", nombre: "Torta Vegana de Chocolate", precio: 50000, forma: "circular", descripcion: "Húmeda y deliciosa, sin productos de origen animal.", imagen: "https://picsum.photos/seed/PV001/400/300", stock: 10, stockCritico: 3 },
  { codigo: "PV002", categoria: "Productos Vegana", nombre: "Galletas Veganas de Avena", precio: 4500, forma: "N/A", descripcion: "Crujientes y saludables.", imagen: "https://picsum.photos/seed/PV002/400/300", stock: 60, stockCritico: 20 },
  { codigo: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000, forma: "circular", descripcion: "Personalizable con decoraciones y mensajes únicos.", imagen: "https://picsum.photos/seed/TE001/400/300", stock: 9, stockCritico: 3 },
  { codigo: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", precio: 60000, forma: "circular", descripcion: "Elegante y deliciosa, centro de atención en bodas.", imagen: "https://picsum.photos/seed/TE002/400/300", stock: 7, stockCritico: 2 }
];

const BLOGS = [
  {
    id: "1",
    titulo: "5 Tips para elegir la torta perfecta",
    descripcion: "Guía práctica para escoger la torta ideal según la ocasión.",
    imagen: "https://picsum.photos/seed/blog1/700/380",
    contenido: "Elegir la torta ideal depende del número de invitados, tipo de celebración y preferencias de sabor. Considera sabores clásicos, opciones sin azúcar y personalización de mensajes."
  },
  {
    id: "2",
    titulo: "Historia de la pastelería chilena tradicional",
    descripcion: "Un recorrido por sabores icónicos y recetas con tradición.",
    imagen: "https://picsum.photos/seed/blog2/700/380",
    contenido: "La pastelería chilena mezcla herencia europea con ingredientes locales. Desde tartas y empanadas dulces hasta tortas de cumpleaños, la tradición sigue viva en cada receta."
  }
];

function getProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function saveProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function initProductos() {
  if (!localStorage.getItem("productos")) {
    saveProductos(PRODUCTOS_INICIALES);
  }
}

function formatoCLP(num) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(num);
}

function renderCardsProductos(contenedor, productos) {
  if (!contenedor) return;
  contenedor.innerHTML = productos.map(prod => `
    <article class="card product-card">
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>${prod.categoria}</p>
      <p><strong>${formatoCLP(prod.precio)}</strong></p>
      <a class="btn btn-outline" href="producto-detalle.html?id=${prod.codigo}">Ver detalle</a>
      <button class="btn btn-primary" onclick="agregarProductoDesdeListado('${prod.codigo}')">Añadir</button>
    </article>
  `).join("");
}

function agregarProductoDesdeListado(codigo) {
  const productos = getProductos();
  const producto = productos.find(p => p.codigo === codigo);
  if (!producto) return alert("Producto no encontrado");
  if (window.addToCart) {
    window.addToCart(producto, 1, "");
    alert("Producto agregado al carrito");
  }
}

function renderHomeDestacados() {
  const grid = document.getElementById("destacados-grid");
  if (!grid) return;
  renderCardsProductos(grid, getProductos().slice(0, 4));
}

function renderProductosPagina() {
  const grid = document.getElementById("productos-grid");
  if (!grid) return;

  const inputBuscar = document.getElementById("busqueda-producto");
  const selectCategoria = document.getElementById("filtro-categoria");
  const selectForma = document.getElementById("filtro-forma");
  const sinResultados = document.getElementById("sin-resultados");

  selectCategoria.innerHTML = '<option value="">Todas las categorías</option>' +
    CATEGORIAS.map(c => `<option value="${c}">${c}</option>`).join("");

  const aplicarFiltros = () => {
    const txt = (inputBuscar.value || "").toLowerCase().trim();
    const cat = selectCategoria.value;
    const forma = selectForma.value;

    let filtrados = getProductos().filter(p => {
      const okNombre = p.nombre.toLowerCase().includes(txt);
      const okCat = !cat || p.categoria === cat;
      const okForma = !forma || p.forma === forma;
      return okNombre && okCat && okForma;
    });

    renderCardsProductos(grid, filtrados);
    sinResultados.classList.toggle("hidden", filtrados.length > 0);
  };

  inputBuscar.addEventListener("input", aplicarFiltros);
  selectCategoria.addEventListener("change", aplicarFiltros);
  selectForma.addEventListener("change", aplicarFiltros);
  aplicarFiltros();
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderDetalleProducto() {
  const contenedor = document.getElementById("producto-detalle-container");
  if (!contenedor) return;

  const id = getQueryParam("id");
  const producto = getProductos().find(p => p.codigo === id);
  if (!producto) {
    contenedor.innerHTML = '<div class="card"><h2>Producto no encontrado</h2><a href="productos.html">Volver al catálogo</a></div>';
    return;
  }

  contenedor.innerHTML = `
    <div class="product-detail-wrap">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="card">
        <h1>${producto.nombre}</h1>
        <p>${producto.descripcion}</p>
        <p><strong>${formatoCLP(producto.precio)}</strong></p>

        <div class="qty-control">
          <button id="btn-restar">-</button>
          <span id="cantidad-detalle">1</span>
          <button id="btn-sumar">+</button>
        </div>

        <div class="field">
          <label for="mensajePersonalizado">Mensaje personalizado</label>
          <input type="text" id="mensajePersonalizado" maxlength="120" placeholder="Ej: Feliz cumpleaños José" />
        </div>

        <button id="btn-add-detalle" class="btn btn-primary btn-lg">Añadir al carrito</button>
        <p>Compartir:
          <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}">Facebook</a> |
          <a target="_blank" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}">Twitter</a> |
          <a target="_blank" href="https://wa.me/?text=${encodeURIComponent(location.href)}">WhatsApp</a>
        </p>
      </div>
    </div>
  `;

  let cantidad = 1;
  const elCantidad = document.getElementById("cantidad-detalle");
  document.getElementById("btn-restar").addEventListener("click", () => {
    cantidad = Math.max(1, cantidad - 1);
    elCantidad.textContent = cantidad;
  });
  document.getElementById("btn-sumar").addEventListener("click", () => {
    cantidad += 1;
    elCantidad.textContent = cantidad;
  });

  document.getElementById("btn-add-detalle").addEventListener("click", () => {
    const mensaje = document.getElementById("mensajePersonalizado").value.trim();
    if (window.addToCart) {
      window.addToCart(producto, cantidad, mensaje);
      alert("Producto agregado al carrito");
    }
  });
}

function renderBlogs() {
  const cont = document.getElementById("blog-grid");
  if (!cont) return;
  cont.innerHTML = BLOGS.map(b => `
    <article class="card blog-card">
      <img src="${b.imagen}" alt="${b.titulo}">
      <h3>${b.titulo}</h3>
      <p>${b.descripcion}</p>
      <a class="btn btn-primary" href="blog-detalle.html?id=${b.id}">Leer más</a>
    </article>
  `).join("");
}

function renderBlogDetalle() {
  const cont = document.getElementById("blog-detalle-container");
  if (!cont) return;
  const id = getQueryParam("id");
  const blog = BLOGS.find(b => b.id === id);
  if (!blog) {
    cont.innerHTML = '<div class="card"><h2>Blog no encontrado</h2><a href="blogs.html">Volver</a></div>';
    return;
  }
  cont.innerHTML = `
    <article class="card">
      <img src="${blog.imagen}" alt="${blog.titulo}" style="width:100%;border-radius:10px;">
      <h1>${blog.titulo}</h1>
      <p>${blog.contenido}</p>
      <a class="btn btn-outline" href="blogs.html">Volver a blogs</a>
    </article>
  `;
}

function renderAdminProductos() {
  const tbody = document.getElementById("admin-productos-body");
  if (!tbody) return;
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isVendedor = user && user.tipoUsuario === "Vendedor";
  const productos = getProductos();

  tbody.innerHTML = productos.map(p => {
    const critico = Number.isInteger(p.stockCritico) ? p.stock <= p.stockCritico : false;
    return `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>${formatoCLP(p.precio)}</td>
        <td>${p.stock}</td>
        <td><span class="badge ${critico ? "badge-danger" : "badge-ok"}">${critico ? "Crítico" : "Normal"}</span></td>
        <td>
          <a class="btn btn-outline" href="admin-producto-nuevo.html?codigo=${p.codigo}">Ver</a>
          ${isVendedor ? "" : `<button class="btn btn-primary" onclick="eliminarProducto('${p.codigo}')">Eliminar</button>`}
        </td>
      </tr>
    `;
  }).join("");

  const btnNuevo = document.getElementById("btn-nuevo-producto");
  if (btnNuevo && isVendedor) btnNuevo.classList.add("hidden");
}

function cargarProductoFormAdmin() {
  const form = document.getElementById("form-admin-producto");
  if (!form) return;

  const selectCat = document.getElementById("prodCategoria");
  selectCat.innerHTML = '<option value="">Seleccione categoría</option>' + CATEGORIAS.map(c => `<option value="${c}">${c}</option>`).join("");

  const codigo = getQueryParam("codigo");
  const productos = getProductos();
  const prod = productos.find(p => p.codigo === codigo);

  if (prod) {
    document.getElementById("titulo-producto-form").textContent = "Editar Producto";
    document.getElementById("prodCodigo").value = prod.codigo;
    document.getElementById("prodCodigo").readOnly = true;
    document.getElementById("prodNombre").value = prod.nombre;
    document.getElementById("prodDescripcion").value = prod.descripcion || "";
    document.getElementById("prodPrecio").value = prod.precio;
    document.getElementById("prodStock").value = prod.stock;
    document.getElementById("prodStockCritico").value = prod.stockCritico ?? "";
    document.getElementById("prodCategoria").value = prod.categoria;
    document.getElementById("prodForma").value = prod.forma;
    document.getElementById("prodImagen").value = prod.imagen || "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!window.validarFormularioAdminProducto?.()) return;

    const nuevo = {
      codigo: document.getElementById("prodCodigo").value.trim(),
      nombre: document.getElementById("prodNombre").value.trim(),
      descripcion: document.getElementById("prodDescripcion").value.trim(),
      precio: parseFloat(document.getElementById("prodPrecio").value),
      stock: parseInt(document.getElementById("prodStock").value, 10),
      stockCritico: document.getElementById("prodStockCritico").value === "" ? null : parseInt(document.getElementById("prodStockCritico").value, 10),
      categoria: document.getElementById("prodCategoria").value,
      forma: document.getElementById("prodForma").value,
      imagen: document.getElementById("prodImagen").value.trim() || `https://picsum.photos/seed/${Date.now()}/400/300`
    };

    const idx = productos.findIndex(p => p.codigo === nuevo.codigo);
    if (idx >= 0) productos[idx] = nuevo;
    else productos.push(nuevo);

    saveProductos(productos);
    alert("Producto guardado correctamente");
    location.href = "admin-productos.html";
  });
}

function eliminarProducto(codigo) {
  if (!confirm("¿Eliminar producto?")) return;
  const productos = getProductos().filter(p => p.codigo !== codigo);
  saveProductos(productos);
  renderAdminProductos();
}

function initPageProductos() {
  initProductos();
  renderHomeDestacados();
  renderProductosPagina();
  renderDetalleProducto();
  renderBlogs();
  renderBlogDetalle();
  renderAdminProductos();
  cargarProductoFormAdmin();
}

document.addEventListener("DOMContentLoaded", initPageProductos);

window.getProductos = getProductos;
window.saveProductos = saveProductos;
window.initProductos = initProductos;
window.CATEGORIAS = CATEGORIAS;
window.formatoCLP = formatoCLP;
window.eliminarProducto = eliminarProducto;
