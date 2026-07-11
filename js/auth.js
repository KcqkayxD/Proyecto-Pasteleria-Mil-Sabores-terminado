function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function saveUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function cerrarSesion() {
  localStorage.removeItem("currentUser");
  location.href = "../index.html".replace("../", location.pathname.includes("/admin/") ? "../" : "");
}

function initUsuariosSemilla() {
  const raw = localStorage.getItem("usuarios");
  if (raw) {
    try {
      const lista = JSON.parse(raw);
      if (Array.isArray(lista) && lista.length > 0) {
        const existeAdmin = lista.some(u => (u.correo || "").toLowerCase() === "admin@gmail.com");
        const existeVendedor = lista.some(u => (u.correo || "").toLowerCase() === "vendedor@gmail.com");
        const existeCliente = lista.some(u => (u.correo || "").toLowerCase() === "cliente@gmail.com");

        if (existeAdmin && existeVendedor && existeCliente) return;

        const completados = [...lista];
        if (!existeAdmin) {
          completados.push({
<<<<<<< HEAD
            run: "19011022K", nombre: "jose", apellidos: "Figueroa", correo: "admin@gmail.com",
=======
            run: "162781642", nombre: "Jose", apellidos: "Admin", correo: "admin@gmail.com",
>>>>>>> master
            fechaNacimiento: "1980-01-01", tipoUsuario: "Administrador", region: "Región Metropolitana",
            comuna: "Santiago", direccion: "Av. Central 123", password: "1234", codigoPromo: ""
          });
        }
        if (!existeVendedor) {
          completados.push({
            run: "17654321K", nombre: "Vero", apellidos: "Vendedor", correo: "vendedor@gmail.com",
            fechaNacimiento: "1990-03-15", tipoUsuario: "Vendedor", region: "Valparaíso",
            comuna: "Viña del Mar", direccion: "Calle Comercio 45", password: "1234", codigoPromo: ""
          });
        }
        if (!existeCliente) {
          completados.push({
            run: "16543210K", nombre: "Carlos", apellidos: "Cliente", correo: "cliente@gmail.com",
            fechaNacimiento: "1965-10-20", tipoUsuario: "Cliente", region: "Biobío",
            comuna: "Concepción", direccion: "Pasaje Dulce 77", password: "1234", codigoPromo: "FELICES50"
          });
        }
        saveUsuarios(completados);
        return;
      }
    } catch (_) {
      // Si el JSON está corrupto, se regenera abajo.
    }
  }

  const base = [
    {
      run: "162781642", nombre: "Jose", apellidos: "Admin", correo: "admin@gmail.com",
      fechaNacimiento: "1980-01-01", tipoUsuario: "Administrador", region: "Región Metropolitana",
      comuna: "Santiago", direccion: "Av. Central 123", password: "1234", codigoPromo: ""
    },
    {
      run: "17654321K", nombre: "Vero", apellidos: "Vendedor", correo: "vendedor@gmail.com",
      fechaNacimiento: "1990-03-15", tipoUsuario: "Vendedor", region: "Valparaíso",
      comuna: "Viña del Mar", direccion: "Calle Comercio 45", password: "1234", codigoPromo: ""
    },
    {
      run: "16543210K", nombre: "Carlos", apellidos: "Cliente", correo: "cliente@gmail.com",
      fechaNacimiento: "1965-10-20", tipoUsuario: "Cliente", region: "Biobío",
      comuna: "Concepción", direccion: "Pasaje Dulce 77", password: "1234", codigoPromo: "FELICES50"
    }
  ];
  saveUsuarios(base);
}

function redirigirPorRol(user) {
  if (!user) return;
  const enAdmin = location.pathname.includes("/admin/");
  if (user.tipoUsuario === "Administrador" || user.tipoUsuario === "Vendedor") {
    location.href = enAdmin ? "admin-home.html" : "admin/admin-home.html";
  } else {
    location.href = enAdmin ? "../index.html" : "index.html";
  }
}

function verificarAuth() {
  const user = getCurrentUser();
  const page = document.body?.dataset?.page || "";
  const enAdminPath = location.pathname.includes("/admin/");
  const esLoginAdmin = page === "admin-login" || /admin-login\.html$/i.test(location.pathname);
  const esPaginaAdminProtegida = (enAdminPath || page.startsWith("admin-")) && !esLoginAdmin;

  if (!esPaginaAdminProtegida) return true;

  if (!user) {
    location.href = "admin-login.html";
    return false;
  }

  if (!["Administrador", "Vendedor"].includes(user.tipoUsuario)) {
    location.href = "../index.html";
    return false;
  }

  return true;
}

function aplicarPermisosVendedor() {
  const user = getCurrentUser();
  if (!user || user.tipoUsuario !== "Vendedor") return;
  document.querySelectorAll("[data-admin-only]").forEach(el => el.classList.add("hidden"));
  const botonNuevoProd = document.getElementById("btn-nuevo-producto");
  const botonNuevoUser = document.getElementById("btn-nuevo-usuario");
  if (botonNuevoProd) botonNuevoProd.classList.add("hidden");
  if (botonNuevoUser) botonNuevoUser.classList.add("hidden");
}

function manejarRegistro() {
  const form = document.getElementById("form-registro");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!window.validarFormularioRegistro?.()) return;

    const usuarios = getUsuarios();
    const nuevo = {
      run: document.getElementById("run").value.trim().toUpperCase(),
      nombre: document.getElementById("nombre").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      correo: document.getElementById("correo").value.trim().toLowerCase(),
      fechaNacimiento: document.getElementById("fechaNacimiento").value || "",
      tipoUsuario: "Cliente",
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value,
      direccion: document.getElementById("direccion").value.trim(),
      password: document.getElementById("password").value,
      codigoPromo: document.getElementById("codigoPromo").value.trim().toUpperCase() === "FELICES50" ? "FELICES50" : ""
    };

    if (usuarios.some(u => u.correo === nuevo.correo || u.run === nuevo.run)) {
      alert("Ya existe un usuario con ese correo o RUN.");
      return;
    }

    usuarios.push(nuevo);
    saveUsuarios(usuarios);
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    location.href = "login.html";
  });
}

function manejarLoginPublico() {
  const form = document.getElementById("form-login");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!window.validarFormularioLogin?.(false)) return;

    const correo = document.getElementById("loginCorreo").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const user = getUsuarios().find(u => u.correo === correo && u.password === password);

    if (!user) return alert("Credenciales inválidas.");
    setCurrentUser(user);

    if (user.tipoUsuario === "Administrador" || user.tipoUsuario === "Vendedor") {
      location.href = "admin/admin-home.html";
    } else {
      location.href = "index.html";
    }
  });
}

function manejarLoginAdmin() {
  const form = document.getElementById("form-admin-login");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!window.validarFormularioLogin?.(true)) return;

    const correo = document.getElementById("adminCorreo").value.trim().toLowerCase();
    const password = document.getElementById("adminPassword").value;
    const user = getUsuarios().find(u => u.correo === correo && u.password === password);

    if (!user) return alert("Credenciales inválidas.");
    if (!["Administrador", "Vendedor"].includes(user.tipoUsuario)) {
      alert("No tienes permisos para acceder al panel administrativo.");
      return;
    }

    setCurrentUser(user);

    location.href = "admin-home.html";
  });
}

function renderAdminUsuarios() {
  const tbody = document.getElementById("admin-usuarios-body");
  if (!tbody) return;
  const user = getCurrentUser();
  const isVendedor = user && user.tipoUsuario === "Vendedor";

  tbody.innerHTML = getUsuarios().map(u => `
    <tr>
      <td>${u.run}</td>
      <td>${u.nombre} ${u.apellidos}</td>
      <td>${u.correo}</td>
      <td>${u.tipoUsuario}</td>
      <td>${u.region || "-"}</td>
      <td>${u.comuna || "-"}</td>
      <td>
        <a class="btn btn-outline" href="admin-usuario-nuevo.html?run=${u.run}">Ver</a>
        ${isVendedor ? "" : `<button class="btn btn-primary" onclick="eliminarUsuario('${u.run}')">Eliminar</button>`}
      </td>
    </tr>
  `).join("");

  const btnNuevo = document.getElementById("btn-nuevo-usuario");
  if (btnNuevo && isVendedor) btnNuevo.classList.add("hidden");
}

function cargarUsuarioFormAdmin() {
  const form = document.getElementById("form-admin-usuario");
  if (!form) return;

  const runParam = new URLSearchParams(location.search).get("run");
  const usuarios = getUsuarios();
  const userEdit = usuarios.find(u => u.run === runParam);

  if (window.poblarRegiones) {
    poblarRegiones("userRegion", "userComuna");
  }

  if (userEdit) {
    document.getElementById("titulo-usuario-form").textContent = "Editar Usuario";
    document.getElementById("userRun").value = userEdit.run;
    document.getElementById("userRun").readOnly = true;
    document.getElementById("userNombre").value = userEdit.nombre;
    document.getElementById("userApellidos").value = userEdit.apellidos;
    document.getElementById("userCorreo").value = userEdit.correo;
    document.getElementById("userFechaNacimiento").value = userEdit.fechaNacimiento || "";
    document.getElementById("userTipo").value = userEdit.tipoUsuario;
    document.getElementById("userRegion").value = userEdit.region || "";
    if (window.actualizarComunas) actualizarComunas("userRegion", "userComuna", userEdit.comuna || "");
    document.getElementById("userDireccion").value = userEdit.direccion || "";
    document.getElementById("userPassword").value = userEdit.password || "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!window.validarFormularioAdminUsuario?.()) return;

    const nuevo = {
      run: document.getElementById("userRun").value.trim().toUpperCase(),
      nombre: document.getElementById("userNombre").value.trim(),
      apellidos: document.getElementById("userApellidos").value.trim(),
      correo: document.getElementById("userCorreo").value.trim().toLowerCase(),
      fechaNacimiento: document.getElementById("userFechaNacimiento").value || "",
      tipoUsuario: document.getElementById("userTipo").value,
      region: document.getElementById("userRegion").value,
      comuna: document.getElementById("userComuna").value,
      direccion: document.getElementById("userDireccion").value.trim(),
      password: document.getElementById("userPassword").value
    };

    const idx = usuarios.findIndex(u => u.run === nuevo.run);
    if (idx >= 0) usuarios[idx] = { ...usuarios[idx], ...nuevo };
    else usuarios.push(nuevo);

    saveUsuarios(usuarios);
    alert("Usuario guardado correctamente");
    location.href = "admin-usuarios.html";
  });
}

function eliminarUsuario(run) {
  if (!confirm("¿Eliminar usuario?")) return;
  const current = getCurrentUser();
  if (current && current.run === run) {
    alert("No puedes eliminar tu propio usuario en sesión.");
    return;
  }
  saveUsuarios(getUsuarios().filter(u => u.run !== run));
  renderAdminUsuarios();
}

function renderAdminKpis() {
  const kpProd = document.getElementById("kpi-productos");
  const kpUsers = document.getElementById("kpi-usuarios");
  const kpCrit = document.getElementById("kpi-critico");
  if (!kpProd || !kpUsers || !kpCrit) return;

  const productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const usuarios = getUsuarios();
  const criticos = productos.filter(p => Number.isInteger(p.stockCritico) && p.stock <= p.stockCritico).length;

  kpProd.textContent = productos.length;
  kpUsers.textContent = usuarios.length;
  kpCrit.textContent = criticos;
}

function bindLogoutButtons() {
  document.querySelectorAll("#btn-logout").forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      location.href = location.pathname.includes("/admin/") ? "admin-login.html" : "index.html";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initUsuariosSemilla();
  verificarAuth();
  manejarRegistro();
  manejarLoginPublico();
  manejarLoginAdmin();
  renderAdminUsuarios();
  cargarUsuarioFormAdmin();
  renderAdminKpis();
  aplicarPermisosVendedor();
  bindLogoutButtons();
});

window.getCurrentUser = getCurrentUser;
window.verificarAuth = verificarAuth;
window.eliminarUsuario = eliminarUsuario;
