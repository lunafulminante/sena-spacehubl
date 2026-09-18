// =================================================================
// Archivo: src/context/AuthContext.tsx
//RESPONSABILIDAD: Contexto global de React que administra la sesión del usuario
//utilizando 'authService' para login y logout y 'sessionStorage'.
// =================================================================
import React, { createContext, useState } from 'react';
import { authService } from '../services/authService';

export type Role = 'Administrador' | 'Aprendiz' | 'Instructor';

export interface User {
  id: number;
  nombreCompleto: string;
  email: string;
  role: Role;
  ficha?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredUser(): User | null {
  try {
    const saved = sessionStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(readStoredUser);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    setToken(data.accessToken);
    setUser(data.user);
    sessionStorage.setItem('token', data.accessToken);
    sessionStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setToken(null);
      setUser(null);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, isAdmin: user?.role === 'Administrador' }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
