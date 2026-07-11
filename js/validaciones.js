function setFieldState(input, valido, mensaje = "") {
  const field = input.closest(".field");
  if (!field) return valido;
  const error = field.querySelector(".error-message");
  input.classList.remove("is-valid", "is-invalid");
  input.classList.add(valido ? "is-valid" : "is-invalid");
  if (error) error.textContent = valido ? "" : mensaje;
  return valido;
}

function correoValido(correo, dominiosPermitidos) {
  const val = (correo || "").toLowerCase().trim();
  if (!val || val.length > 100) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return false;
  return dominiosPermitidos.some(dom => val.endsWith(dom.toLowerCase()));
}

function limpiarRun(run) {
  return (run || "").replace(/\./g, "").replace(/-/g, "").toUpperCase().trim();
}

function validarRunModulo11(run) {
  const limpio = limpiarRun(run);
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === esperado;
}

function calcularEdad(fecha) {
  if (!fecha) return null;
  const nacimiento = new Date(fecha);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
}

function validarFormularioRegistro() {
  const run = document.getElementById("run");
  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const correo = document.getElementById("correo");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
<<<<<<< HEAD
  const region = document.getElementById("región");
=======
  const region = document.getElementById("region");
>>>>>>> master
  const comuna = document.getElementById("comuna");
  const direccion = document.getElementById("direccion");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const codigoPromo = document.getElementById("codigoPromo");

  let ok = true;
  const runLimpio = limpiarRun(run.value);
  ok &= setFieldState(run, runLimpio.length >= 7 && runLimpio.length <= 9 && validarRunModulo11(runLimpio), "RUN inválido (módulo 11, sin puntos ni guion).");
  ok &= setFieldState(nombre, nombre.value.trim().length > 0 && nombre.value.trim().length <= 50, "Nombre requerido, máximo 50 caracteres.");
  ok &= setFieldState(apellidos, apellidos.value.trim().length > 0 && apellidos.value.trim().length <= 100, "Apellidos requeridos, máximo 100 caracteres.");
  ok &= setFieldState(correo, correoValido(correo.value, ["@inacap.cl", "@profesor.inacap.cl", "@gmail.com"]), "Correo inválido o dominio no permitido.");
  ok &= setFieldState(region, !!region.value, "Región requerida.");
  ok &= setFieldState(comuna, !!comuna.value, "Comuna requerida.");
  ok &= setFieldState(direccion, direccion.value.trim().length > 0 && direccion.value.trim().length <= 300, "Dirección requerida, máximo 300 caracteres.");
  ok &= setFieldState(password, password.value.length >= 4 && password.value.length <= 10, "Contraseña entre 4 y 10 caracteres.");
  ok &= setFieldState(confirmPassword, confirmPassword.value === password.value && confirmPassword.value.length >= 4, "Las contraseñas no coinciden.");

  if (codigoPromo) {
    const promoInfo = document.getElementById("promo-info");
    if (codigoPromo.value.trim().toUpperCase() === "FELICES50") {
      promoInfo.textContent = "Código válido: obtendrás 10% de descuento permanente.";
    } else if (codigoPromo.value.trim()) {
      promoInfo.textContent = "Código no reconocido.";
    } else {
      promoInfo.textContent = "";
    }
  }

  if (fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento.value);
    const edadInfo = document.getElementById("edad-info");
    if (edad !== null && edadInfo) edadInfo.textContent = `Edad calculada: ${edad} años`;
  }

  return !!ok;
}

function validarFormularioLogin(formAdmin = false) {
  const correo = document.getElementById(formAdmin ? "adminCorreo" : "loginCorreo");
  const pass = document.getElementById(formAdmin ? "adminPassword" : "loginPassword");
  const dominios = formAdmin ? ["@inacap.cl", "@profesor.inacap.cl", "@gmail.com", "@inacapmail.cl"] : ["@inacap.cl", "@inacapmail.cl", "@gmail.com"];
  let ok = true;
  ok &= setFieldState(correo, correoValido(correo.value, dominios), "Correo inválido o dominio no permitido.");
  ok &= setFieldState(pass, pass.value.length >= 4 && pass.value.length <= 10, "Contraseña entre 4 y 10 caracteres.");
  return !!ok;
}

function validarFormularioContacto() {
  const nombre = document.getElementById("contactoNombre");
  const correo = document.getElementById("contactoCorreo");
  const comentario = document.getElementById("contactoComentario");
  const contador = document.getElementById("comentario-contador");

  if (contador && comentario) contador.textContent = `${comentario.value.length} / 500`;

  let ok = true;
  ok &= setFieldState(nombre, nombre.value.trim().length > 0 && nombre.value.trim().length <= 100, "Nombre requerido, máximo 100.");
  ok &= setFieldState(correo, correoValido(correo.value, ["@inacap.cl", "@profesor.inacap.cl", "@gmail.com"]), "Correo inválido.");
  ok &= setFieldState(comentario, comentario.value.trim().length > 0 && comentario.value.trim().length <= 500, "Comentario requerido, máximo 500.");
  return !!ok;
}

function validarFormularioAdminProducto() {
  const codigo = document.getElementById("prodCodigo");
  const nombre = document.getElementById("prodNombre");
  const descripcion = document.getElementById("prodDescripcion");
  const precio = document.getElementById("prodPrecio");
  const stock = document.getElementById("prodStock");
  const stockCritico = document.getElementById("prodStockCritico");
  const categoria = document.getElementById("prodCategoria");
  const imagen = document.getElementById("prodImagen");

  let ok = true;
  ok &= setFieldState(codigo, codigo.value.trim().length >= 3, "Código requerido, mínimo 3 caracteres.");
  ok &= setFieldState(nombre, nombre.value.trim().length > 0 && nombre.value.trim().length <= 100, "Nombre requerido, máximo 100.");
  ok &= setFieldState(descripcion, descripcion.value.length <= 500, "Descripción máximo 500.");
  ok &= setFieldState(precio, precio.value !== "" && Number(precio.value) >= 0, "Precio requerido y mayor o igual a 0.");
  ok &= setFieldState(stock, stock.value !== "" && Number.isInteger(Number(stock.value)) && Number(stock.value) >= 0, "Stock entero y mayor o igual a 0.");
  ok &= setFieldState(stockCritico, stockCritico.value === "" || (Number.isInteger(Number(stockCritico.value)) && Number(stockCritico.value) >= 0), "Stock crítico entero mayor o igual a 0.");
  ok &= setFieldState(categoria, !!categoria.value, "Categoría requerida.");
  ok &= setFieldState(imagen, !imagen.value || /^https?:\/\//i.test(imagen.value.trim()), "La imagen debe ser URL válida.");
  return !!ok;
}

function validarFormularioAdminUsuario() {
  const run = document.getElementById("userRun");
  const nombre = document.getElementById("userNombre");
  const apellidos = document.getElementById("userApellidos");
  const correo = document.getElementById("userCorreo");
  const tipo = document.getElementById("userTipo");
  const region = document.getElementById("userRegion");
  const comuna = document.getElementById("userComuna");
  const direccion = document.getElementById("userDireccion");
  const pass = document.getElementById("userPassword");

  let ok = true;
  const runLimpio = limpiarRun(run.value);
  ok &= setFieldState(run, runLimpio.length >= 7 && runLimpio.length <= 9 && validarRunModulo11(runLimpio), "RUN inválido.");
  ok &= setFieldState(nombre, nombre.value.trim().length > 0 && nombre.value.trim().length <= 50, "Nombre requerido.");
  ok &= setFieldState(apellidos, apellidos.value.trim().length > 0 && apellidos.value.trim().length <= 100, "Apellidos requeridos.");
  ok &= setFieldState(correo, correoValido(correo.value, ["@inacap.cl", "@profesor.inacap.cl", "@gmail.com"]), "Correo inválido.");
  ok &= setFieldState(tipo, !!tipo.value, "Tipo usuario requerido.");
  ok &= setFieldState(region, !!region.value, "Región requerida.");
  ok &= setFieldState(comuna, !!comuna.value, "Comuna requerida.");
  ok &= setFieldState(direccion, direccion.value.trim().length > 0 && direccion.value.trim().length <= 300, "Dirección requerida.");
  if (pass) ok &= setFieldState(pass, pass.value.length >= 4 && pass.value.length <= 10, "Contraseña 4-10.");
  return !!ok;
}

function setupRealtimeValidation(formId, validatorFn, fieldsSelectors = [], options = {}) {
  const form = document.getElementById(formId);
  if (!form) return;

  const { validarEnInput = true } = options;

  fieldsSelectors.forEach(sel => {
    const field = document.querySelector(sel);
    if (!field) return;
    if (validarEnInput) field.addEventListener("input", validatorFn);
    field.addEventListener("change", validatorFn);
    if (!validarEnInput) field.addEventListener("blur", validatorFn);
  });

  form.addEventListener("submit", e => {
    if (!validatorFn()) e.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    if (window.poblarRegiones) {
      poblarRegiones("region", "comuna");
      region.addEventListener("change", () => actualizarComunas("region", "comuna"));
    }

    setupRealtimeValidation("form-registro", validarFormularioRegistro, [
      "#run", "#nombre", "#apellidos", "#correo", "#fechaNacimiento", "#region", "#comuna", "#direccion", "#password", "#confirmPassword", "#codigoPromo"
    ]);
  }

  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    setupRealtimeValidation("form-login", () => validarFormularioLogin(false), ["#loginCorreo", "#loginPassword"]);
  }

  const formAdminLogin = document.getElementById("form-admin-login");
  if (formAdminLogin) {
    setupRealtimeValidation(
      "form-admin-login",
      () => validarFormularioLogin(true),
      ["#adminCorreo", "#adminPassword"],
      { validarEnInput: false }
    );
  }

  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    setupRealtimeValidation("form-contacto", validarFormularioContacto, ["#contactoNombre", "#contactoCorreo", "#contactoComentario"]);
  }

  const formProd = document.getElementById("form-admin-producto");
  if (formProd) {
    setupRealtimeValidation("form-admin-producto", validarFormularioAdminProducto, [
      "#prodCodigo", "#prodNombre", "#prodDescripcion", "#prodPrecio", "#prodStock", "#prodStockCritico", "#prodCategoria", "#prodImagen"
    ]);
  }

  const formUser = document.getElementById("form-admin-usuario");
  if (formUser) {
    if (window.poblarRegiones) {
      poblarRegiones("userRegion", "userComuna");
      document.getElementById("userRegion").addEventListener("change", () => actualizarComunas("userRegion", "userComuna"));
    }
    setupRealtimeValidation("form-admin-usuario", validarFormularioAdminUsuario, [
      "#userRun", "#userNombre", "#userApellidos", "#userCorreo", "#userTipo", "#userRegion", "#userComuna", "#userDireccion", "#userPassword"
    ]);
  }
});

window.validarFormularioRegistro = validarFormularioRegistro;
window.validarFormularioLogin = validarFormularioLogin;
window.validarFormularioContacto = validarFormularioContacto;
window.validarFormularioAdminProducto = validarFormularioAdminProducto;
window.validarFormularioAdminUsuario = validarFormularioAdminUsuario;
window.validarRunModulo11 = validarRunModulo11;
window.calcularEdad = calcularEdad;
