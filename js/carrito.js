function getCart() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function saveCart(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((acc, item) => acc + item.cantidad, 0);
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
}

function addToCart(producto, cantidad = 1, mensaje = "") {
  const carrito = getCart();
  const idx = carrito.findIndex(i => i.codigo === producto.codigo && i.mensaje === mensaje);
  if (idx >= 0) carrito[idx].cantidad += cantidad;
  else carrito.push({
    codigo: producto.codigo,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    cantidad,
    mensaje
  });
  saveCart(carrito);
}

function cambiarCantidad(index, delta) {
  const carrito = getCart();
  if (!carrito[index]) return;
  carrito[index].cantidad += delta;
  if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
  saveCart(carrito);
  renderCarritoPagina();
}

function eliminarItem(index) {
  const carrito = getCart();
  carrito.splice(index, 1);
  saveCart(carrito);
  renderCarritoPagina();
}

function calcularDescuentos(subtotal) {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  let descuento = 0;
  let mensajes = [];

  if (user?.fechaNacimiento && window.calcularEdad) {
    const edad = calcularEdad(user.fechaNacimiento);
    if (edad >= 50) {
      descuento += subtotal * 0.5;
      mensajes.push("Descuento adulto mayor aplicado (50%).");
    }
  }

  if (user?.codigoPromo === "FELICES50") {
    descuento += subtotal * 0.10;
    mensajes.push("Descuento código FELICES50 aplicado (10%).");
  }

  if (user?.correo?.toLowerCase().endsWith("@duocuc.cl")) {
    mensajes.push("Beneficio especial: torta gratis en cumpleaños (flag activo).");
  }

  if (descuento > subtotal) descuento = subtotal;
  return { descuento, mensajes };
}

function renderCarritoPagina() {
  const cont = document.getElementById("carrito-items");
  if (!cont) return;

  const carrito = getCart();
  const vacio = document.getElementById("carrito-vacio");
  const subtotalEl = document.getElementById("resumen-subtotal");
  const descuentoEl = document.getElementById("resumen-descuento");
  const totalEl = document.getElementById("resumen-total");
  const beneficiosEl = document.getElementById("beneficios-usuario");

  if (carrito.length === 0) {
    cont.innerHTML = "";
    vacio.classList.remove("hidden");
    subtotalEl.textContent = "$0";
    descuentoEl.textContent = "$0";
    totalEl.textContent = "$0";
    beneficiosEl.textContent = "";
    return;
  }

  vacio.classList.add("hidden");
  cont.innerHTML = carrito.map((item, i) => `
    <div class="carrito-item">
      <img src="${item.imagen}" alt="${item.nombre}">
      <div>
        <h4>${item.nombre}</h4>
        <p>${window.formatoCLP ? formatoCLP(item.precio) : "$" + item.precio}</p>
        ${item.mensaje ? `<p><em>Mensaje: ${item.mensaje}</em></p>` : ""}
        <div class="qty-control">
          <button onclick="cambiarCantidad(${i}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad(${i}, 1)">+</button>
          <button class="btn btn-outline btn-delete-icon" onclick="eliminarItem(${i})" aria-label="Eliminar producto" title="Eliminar">🗑️</button>
        </div>
      </div>
    </div>
  `).join("");

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const { descuento, mensajes } = calcularDescuentos(subtotal);
  const total = subtotal - descuento;

  subtotalEl.textContent = window.formatoCLP ? formatoCLP(subtotal) : `$${subtotal}`;
  descuentoEl.textContent = window.formatoCLP ? formatoCLP(descuento) : `$${descuento}`;
  totalEl.textContent = window.formatoCLP ? formatoCLP(total) : `$${total}`;
  beneficiosEl.textContent = mensajes.join(" ");
}

function bindConfirmarPedido() {
  const btn = document.getElementById("btn-confirmar-pedido");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    const carrito = getCart();
    if (!carrito.length) {
      e.preventDefault();
      return alert("Tu carrito está vacío.");
    }

    const numeroPedido = String(Math.floor(1000 + Math.random() * 9000));
    localStorage.setItem("ultimoPedidoNumero", numeroPedido);
    localStorage.setItem("ultimoPedidoFecha", new Date().toISOString());
    localStorage.setItem("ultimoPedidoDetalle", JSON.stringify(carrito));

    saveCart([]);
    renderCarritoPagina();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCarritoPagina();
  bindConfirmarPedido();

  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!window.validarFormularioContacto?.()) return;
      alert("Mensaje enviado correctamente.");
      formContacto.reset();
      const contador = document.getElementById("comentario-contador");
      if (contador) contador.textContent = "0 / 500";
    });
  }
});

window.addToCart = addToCart;
window.cambiarCantidad = cambiarCantidad;
window.eliminarItem = eliminarItem;
window.updateCartCount = updateCartCount;
