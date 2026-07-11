function renderMisCompras() {
  const cont = document.getElementById("mis-compras-lista");
  if (!cont) return;

  const user = getCurrentUser();
  if (!user) {
    location.href = "login.html";
    return;
  }

  const vacio = document.getElementById("mis-compras-vacio");
  const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]")
    .filter(p => p.correo === user.correo)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  if (!pedidos.length) {
    cont.innerHTML = "";
    vacio.classList.remove("hidden");
    return;
  }

  vacio.classList.add("hidden");
  cont.innerHTML = pedidos.map(p => `
    <article class="card pedido-card">
      <div class="pedido-header">
        <div>
          <h3>Pedido #${p.numero}</h3>
          <p class="hint">${new Date(p.fecha).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })} · ${p.estado}</p>
        </div>
        <strong>${window.formatoCLP ? formatoCLP(p.total) : "$" + p.total}</strong>
      </div>
      <ul class="pedido-items">
        ${p.items.map(i => `<li>${i.cantidad} × ${i.nombre}</li>`).join("")}
      </ul>
      <button class="btn btn-primary" onclick="volverAComprar('${p.numero}')">Volver a comprar</button>
    </article>
  `).join("");
}

function volverAComprar(numero) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  const pedido = pedidos.find(p => p.numero === numero);
  if (!pedido) return;

  pedido.items.forEach(item => {
    addToCart(
      { codigo: item.codigo, nombre: item.nombre, precio: item.precio, imagen: item.imagen },
      item.cantidad,
      item.mensaje || ""
    );
  });

  location.href = "carrito.html";
}

document.addEventListener("DOMContentLoaded", renderMisCompras);

window.volverAComprar = volverAComprar;
