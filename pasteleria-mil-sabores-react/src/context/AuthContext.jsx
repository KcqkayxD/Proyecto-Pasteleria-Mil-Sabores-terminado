import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { loginUsuario } from '../data/usuariosData';

const AuthContext = createContext(null);

const STORAGE_SESSION_KEY = 'ms_sesion';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  }, [usuario]);

  const login = useCallback((correo, password) => {
    const user = loginUsuario(correo, password);
    if (!user) return null;
    setUsuario(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
  }, []);

  const isAuthenticated = useCallback(() => Boolean(usuario), [usuario]);

  const hasRole = useCallback(
    (roles = []) => {
      if (!usuario) return false;
      return roles.includes(usuario.tipoUsuario);
    },
    [usuario]
  );

  const actualizarUsuarioSesion = useCallback((datos) => {
    setUsuario((prev) => (prev ? { ...prev, ...datos } : prev));
  }, []);

  const value = useMemo(
    () => ({
      usuario,
      login,
      logout,
      isAuthenticated,
      hasRole,
      actualizarUsuarioSesion
    }),
    [usuario, login, logout, isAuthenticated, hasRole, actualizarUsuarioSesion]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
