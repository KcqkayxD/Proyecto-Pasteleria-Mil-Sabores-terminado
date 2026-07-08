#https://github.com/KcqkayxD/Proyecto-Pasteleria-Mil-Sabores-terminado.git
# Proyecto E-commerce Pastelería Mil Sabores

## Estado actual

- ✅ Sitio público y panel admin implementados.
- ✅ Corrección aplicada al ingreso administrativo para evitar tiriteo/rebote de autenticación (`js/auth.js`).
- ✅ Corrección de rutas de favicon en panel admin usando `../src/iconourl.png`.
- ✅ Corrección de textos con codificación dañada (mojibake) en vistas admin.
- ✅ Botón flotante de WhatsApp agregado y unificado (`💬`, `https://wa.me/56912345678`) en páginas públicas y administrativas.
- ✅ Footer estandarizado según home en páginas del sitio.
- ✅ Base de estilos y scripts principales operativos:
  - `css/styles.css`
  - `js/regiones-comunas.js`
  - `js/productos.js`
  - `js/validaciones.js`
  - `js/auth.js`
  - `js/carrito.js`

## Cambios recientes aplicados

### 1) Login admin (estabilidad visual)
- Ajustes para evitar tiriteo/parpadeo durante validación y flujo de autenticación.
- Mantención del comportamiento esperado al iniciar/cerrar sesión.

### 2) Rutas de recursos (assets)
- Corrección de referencias de icono en páginas admin:
  - `admin/admin-login.html`
  - `admin/admin-home.html`
  - `admin/admin-productos.html`
  - `admin/admin-producto-nuevo.html`
  - `admin/admin-usuarios.html`
  - `admin/admin-usuario-nuevo.html`
- Ruta objetivo aplicada: `../src/iconourl.png`.

### 3) Corrección de codificación en admin
- Normalización de textos con acentos y emojis en:
  - `admin/admin-login.html`
  - `admin/admin-productos.html`
  - `admin/admin-producto-nuevo.html`
  - `admin/admin-usuarios.html`
  - `admin/admin-usuario-nuevo.html`
- Ejemplos corregidos: `Pastelería`, `Gestión`, `sesión`, `Código`, `Categoría`, `Región`, `💬`, `🏠`, `🍰`, `👥`.

### 4) UI global
- Footer homologado con el diseño/referencia de `index.html`.
- Botón flotante de WhatsApp visible y consistente en vistas públicas y admin.

## Estructura principal

### Páginas públicas
- `index.html`
- `registro.html`
- `login.html`
- `nosotros.html`
- `blogs.html`
- `blog-detalle.html`
- `contacto.html`
- `productos.html`
- `producto-detalle.html`
- `carrito.html`

### Páginas administración
- `admin/admin-login.html`
- `admin/admin-home.html`
- `admin/admin-productos.html`
- `admin/admin-producto-nuevo.html`
- `admin/admin-usuarios.html`
- `admin/admin-usuario-nuevo.html`
- `admin/admin-pedidos.html`
- `admin/admin-vendedor.html`
- `admin/admin-ventas-dia.html`

## Últimos cambios funcionales (pagos y pedidos)

- Se agregó `pago.html` con confirmación de compra y visualización de número de pedido.
- En `carrito.html`, el CTA principal cambió a **“Proceder al pago”** y redirige a `pago.html`.
- `js/carrito.js` ahora genera y guarda en `localStorage`:
  - `ultimoPedidoNumero`
  - `ultimoPedidoFecha`
- Se agregó en `admin/admin-home.html`:
  - acceso a `📦 Pedidos`
  - acceso a `👨‍💼 Vendedor`
  - tarjeta de **Último pedido**
- Se creó `admin/admin-pedidos.html` para listar pedidos y estado de pago (**Pagado**).
- Se creó `admin/admin-vendedor.html` con permisos acotados:
  - ver pedidos
  - efectuar pedido (simulado), guardando número/fecha y estado pagado.
- `admin/admin-pedidos.html` ahora incluye:
  - columna **Detalle del pedido** leyendo `localStorage.ultimoPedidoDetalle` (fallback a `carrito`) con nombre y cantidad por torta,
  - flujo de estados con botones (Preparar, Preparando, Listo para entregar, Entregado),
  - **Anular pedido** (rojo) y **Borrar pedido** cuando corresponde,
  - al marcar **Entregado** se bloquea anular/borrar, se registra en `localStorage.ventasDelDia` y redirige a **Ventas del día**.
- Al proceder al pago:
  - el carrito (`localStorage.carrito`) se vacía,
  - pero el detalle del pedido se conserva en `localStorage.ultimoPedidoDetalle` para administración.
- Se creó `admin/admin-ventas-dia.html` para visualizar pedidos entregados del día.
- Se agregó enlace **💰 Ventas del día** en menús de:
  - `admin/admin-home.html`
  - `admin/admin-vendedor.html`
  - `admin/admin-pedidos.html`

## Notas de mantenimiento

- Estado y checklist del proyecto centralizados en este `README.md`.
- No se agregaron nuevas dependencias.
- Si aparecen nuevamente caracteres dañados en Windows, verificar que los archivos se guarden en **UTF-8**.

## Validación / pruebas recomendadas

### Ruta crítica (rápida)
1. `admin/admin-login.html`: textos correctos + sin tiriteo + botón WhatsApp visible.
2. Login admin válido → `admin/admin-home.html`.
3. Navegación admin: Home ↔ Productos ↔ Usuarios ↔ formularios de nuevo.
4. Logout y retorno al flujo esperado.
5. Revisión visual rápida en `index.html`, `login.html`, `productos.html`, `blogs.html`, `contacto.html`.

### Prueba exhaustiva
- Recorrer todas las páginas, secciones, enlaces, botones y formularios (público + admin), validando comportamiento esperado, estilos y ausencia de texto corrupto.
