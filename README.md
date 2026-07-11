#https://github.com/KcqkayxD/Proyecto-Pasteleria-Mil-Sabores-terminado.git
# Pastelería Mil Sabores 🎂

Proyecto de e-commerce para una pastelería ficticia, "Mil Sabores": catálogo de productos, carrito, descuentos, checkout, login de clientes y un panel de administración para gestionar productos, usuarios y pedidos.

Repo: https://github.com/KcqkayxD/Proyecto-Pasteleria-Mil-Sabores-terminado.git

## Dos versiones del proyecto

Fui iterando el proyecto en dos etapas y dejé ambas en el repo:

**1. Sitio estático (raíz del proyecto)**
HTML, CSS y JS puro, sin frameworks. Ideal para ver el flujo completo sin instalar nada.
Para probarlo, basta con abrir `index.html` en el navegador (o servirlo con `Live Server` / cualquier servidor estático).

**2. App en React (`pasteleria-mil-sabores-react/`)**
La misma idea, pero migrada a React + React Router + Bootstrap, con el estado manejado por contexto (carrito, sesión).

### Cómo abrirla sin instalar nada
Al descargar/descomprimir el repositorio, abre directamente con doble clic:
```
pasteleria-mil-sabores-react/dist/index.html
```
Es la build de producción ya compilada — funciona sola, sin `npm install` ni servidor, en cualquier navegador.

### Cómo ejecutarla en modo desarrollo dentro de la capeta de destino "abres el terminal"
```bash
cd pasteleria-mil-sabores-react
npm install
npm run dev
```

### Cómo actualizar la build (`dist/`) después de hacer cambios
Cada vez que se modifique el código, hay que regenerar `dist/` y volver a subirla a git, si no el profesor seguirá viendo la versión vieja al abrir el archivo directo:
```bash
cd pasteleria-mil-sabores-react
npm run build
cd ..
git add pasteleria-mil-sabores-react/dist
git commit -m "Actualiza build"
git push
```

## Qué incluye

- Catálogo de productos con filtros por categoría, búsqueda y ofertas.
- Carrito de compras con descuentos automáticos:
  - Adulto mayor (50 años o más): 50% de descuento.
  - Código promocional `FELICES50`: 10% de descuento de por vida.
  - Estudiantes de Inacap (correo institucional `@inacap.cl`): torta gratis en su cumpleaños al registrarse.
- Registro y login de clientes.
- Checkout con validación de datos de entrega y fecha/hora de retiro.
- Panel "Mis compras" para que el cliente vea sus pedidos anteriores y pueda volver a comprarlos con un clic.
- Panel de administración (Administrador / Vendedor) para gestionar productos, categorías, usuarios, pedidos y reportes de ventas.

## Usuarios de prueba

| Correo | Contraseña | Rol |
|---|---|---|
| admin@gmail.com | 1234 | Administrador |
| vendedor@gmail.com | 1234 | Vendedor |
| cliente@gmail.com | 1234 | Cliente (tiene código promo `FELICES50`) |

## Estructura

```
├── index.html, productos.html, carrito.html, login.html, ...   → sitio estático
├── mis-compras.html                                             → panel de compras del cliente
├── css/styles.css
├── js/                                                          → auth, carrito, pedidos, productos, validaciones
├── admin/                                                       → panel de administración (estático)
└── pasteleria-mil-sabores-react/
    └── src/
        ├── pages/public/                                        → páginas del sitio (Home, Productos, Carrito, MisCompras, Checkout...)
        ├── pages/admin/                                         → panel de administración
        ├── context/                                             → CartContext, AuthContext
        ├── components/                                          → Navbar, Footer, ProductCard...
        └── data/                                                → datos semilla (productos, usuarios, pedidos, categorías)
```

## Cambios aplicados (sitio estático e histórico del proyecto)

- Se agregaron el logo, el favicon y la imagen de "Nosotros" (antes faltaban o se usaban imágenes genéricas).
- Se reemplazaron las imágenes rotas de `via.placeholder.com` (servicio dado de baja en 2024) por `picsum.photos`.
- Se corrigieron el footer y el navbar para usar los mismos colores/estructura del sitio HTML original: navbar blanco con links en chocolate, footer crema con enlaces horizontales separados por "|", botón de carrito 🛒 e ícono flotante de WhatsApp.
- Se completó la lista oficial de comunas por región (Metropolitana, Valparaíso, Biobío, La Araucanía, Antofagasta) en `src/data/regionesData.js`.
- Se agregó el campo **Hora de retiro** en el checkout, junto a un selector de fecha (`react-datepicker`, formato `dd/mm/yyyy` fijo), validación del horario de atención (Lunes a Sábado, 09:00–20:00) y de un mínimo de **24 horas** de anticipación para el retiro.
- Se agregó la sección **Despacho** en el panel administrativo: lista automáticamente los pedidos en estado "Listo para entregar" para marcarlos como entregados.
- Se agregó una columna de miniatura de imagen en la tabla de administración de productos.
- Se corrigió un bug de caché: los datos de productos y usuarios en `localStorage` ahora se versionan (`STORAGE_VERSION`), así que las actualizaciones del catálogo/usuarios se aplican aunque el navegador tenga datos guardados de una versión anterior.
- Corrección al ingreso administrativo para evitar tiriteo/rebote de autenticación (`js/auth.js`).
- Corrección de rutas de favicon en panel admin usando `../src/iconourl.png`.
- Corrección de textos con codificación dañada (mojibake) en vistas admin (acentos y emojis: `Pastelería`, `Gestión`, `sesión`, `Código`, `Categoría`, `Región`, `💬`, `🏠`, `🍰`, `👥`).
- Botón flotante de WhatsApp agregado y unificado (`💬`, `https://wa.me/56955198638`) en páginas públicas y administrativas.
- `pago.html` con confirmación de compra y visualización de número de pedido; en `carrito.html` el CTA principal es **"Proceder al pago"**.
- Panel admin de pedidos (`admin/admin-pedidos.html`) con flujo de estados (Preparar, Preparando, Listo para entregar, Entregado), anular/borrar pedido, y registro de **Ventas del día** al marcar como entregado.
- `admin/admin-vendedor.html` con permisos acotados: ver pedidos y efectuar pedido (simulado).

## Persistencia

Todo el proyecto usa `localStorage` como "base de datos" (usuarios, productos, carrito y pedidos), así que no necesita backend para funcionar. Es una limitación conocida: los datos viven solo en el navegador de cada quien.

## Pendientes / ideas a futuro

- Backend real con base de datos, para no depender de `localStorage`.
- Pasarela de pago real (hoy el pago es simulado).
- Subida de imágenes de productos en vez de solo URLs.

## Notas de mantenimiento

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
