# Pastelería Mil Sabores 🎂

Este es mi proyecto de e-commerce para una pastelería ficticia, "Mil Sabores". Lo hice para practicar el desarrollo de un flujo de tienda online completo: catálogo de productos, carrito, descuentos, checkout, login de clientes y un panel de administración para gestionar productos, usuarios y pedidos.

Repo: https://github.com/KcqkayxD/Proyecto-Pasteleria-Mil-Sabores-terminado.git

## Qué incluye

- Catálogo de productos con filtros por categoría, búsqueda y ofertas.
- Carrito de compras con descuentos automáticos (adulto mayor 50%, código promocional `FELICES50`, beneficio para correos `@inacap.cl`).
- Registro y login de clientes.
- Checkout con validación de datos de entrega y fecha/hora de retiro.
- Panel "Mis compras" para que el cliente vea sus pedidos anteriores y pueda volver a comprarlos con un clic.
- Panel de administración (Administrador / Vendedor) para gestionar productos, categorías, usuarios, pedidos y reportes de ventas.

## Dos versiones del proyecto

Fui iterando el proyecto en dos etapas y dejé ambas en el repo:

**1. Sitio estático (raíz del proyecto)**
HTML, CSS y JS puro, sin frameworks. Ideal para ver el flujo completo sin instalar nada.
Para probarlo, basta con abrir `index.html` en el navegador (o servirlo con `Live Server` / cualquier servidor estático).

**2. App en React (`pasteleria-mil-sabores-react/`)**
La misma idea, pero migrada a React + React Router + Bootstrap, con el estado manejado por contexto (carrito, sesión).

```bash
cd pasteleria-mil-sabores-react
npm install
npm run dev
```

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

## Usuarios de prueba

| Correo | Contraseña | Rol |
|---|---|---|
| admin@gmail.com | 1234 | Administrador |
| vendedor@gmail.com | 1234 | Vendedor |
| cliente@gmail.com | 1234 | Cliente (tiene código promo `FELICES50`) |

## Persistencia

Todo el proyecto usa `localStorage` como "base de datos" (usuarios, productos, carrito y pedidos), así que no necesita backend para funcionar. Es una limitación conocida: los datos viven solo en el navegador de cada quien.

## Pendientes / ideas a futuro

- Backend real con base de datos, para no depender de `localStorage`.
- Pasarela de pago real (hoy el pago es simulado).
- Subida de imágenes de productos en vez de solo URLs.
