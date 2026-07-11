import { createContext, useCallback, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_CART_KEY = 'ms_carrito';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem(STORAGE_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  const persistCart = useCallback((nextCart) => {
    setCart(nextCart);
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(nextCart));
  }, []);

  const agregarProducto = useCallback(
    (producto, cantidad = 1, mensaje = '') => {
      const idx = cart.findIndex((item) => item.codigo === producto.codigo && item.mensaje === mensaje);
      if (idx >= 0) {
        const actualizado = [...cart];
        actualizado[idx] = {
          ...actualizado[idx],
          cantidad: actualizado[idx].cantidad + cantidad
        };
        persistCart(actualizado);
        return;
      }

      const nuevo = [
        ...cart,
        {
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad,
          mensaje,
          imagen: producto.imagen
        }
      ];
      persistCart(nuevo);
    },
    [cart, persistCart]
  );

  const eliminarProducto = useCallback(
    (codigo) => {
      const actualizado = cart.filter((item) => item.codigo !== codigo);
      persistCart(actualizado);
    },
    [cart, persistCart]
  );

  const actualizarCantidad = useCallback(
    (codigo, delta) => {
      const actualizado = cart
        .map((item) => {
          if (item.codigo !== codigo) return item;
          return { ...item, cantidad: item.cantidad + delta };
        })
        .filter((item) => item.cantidad > 0);

      persistCart(actualizado);
    },
    [cart, persistCart]
  );

  const vaciarCarrito = useCallback(() => {
    persistCart([]);
  }, [persistCart]);

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [cart]
  );

  const cantidadTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.cantidad, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      agregarProducto,
      eliminarProducto,
      actualizarCantidad,
      vaciarCarrito,
      total,
      cantidadTotal
    }),
    [cart, agregarProducto, eliminarProducto, actualizarCantidad, vaciarCarrito, total, cantidadTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
