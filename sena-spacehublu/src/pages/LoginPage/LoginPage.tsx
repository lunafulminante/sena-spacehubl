// =================================================================
// Archivo: src/pages/LoginPage/LoginPage.tsx
//RESPONSABILIDAD: Renderiza el formulario de inicio de sesión y consume el authService.login.
// =================================================================
import React, { useState } from 'react';
import AuthShell from '../../components/AuthShell';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const registered = (useLocation().state as { registered?: boolean } | null)?.registered;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Bienvenido" subtitle="Inicia sesión con tu correo institucional">
      {registered && <div className="p-3 mb-4 bg-emerald-900/60 border border-emerald-500 rounded-xl text-emerald-200 text-xs font-mono">Cuenta creada. Ya puedes iniciar sesión.</div>}
      {error && <div className="p-3 mb-4 bg-rose-900/80 border border-rose-500 rounded-xl text-rose-200 text-xs font-mono">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="loginEmail" className="block text-xs font-bold text-ink-300 mb-1">Correo Institucional</label>
          <input id="loginEmail" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-ink-900 border border-ink-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30" placeholder="roberto.gomez@sena.edu.co" />
        </div>
        <div>
          <label htmlFor="loginPassword" className="block text-xs font-bold text-ink-300 mb-1">Contraseña</label>
          <input id="loginPassword" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-ink-900 border border-ink-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30" placeholder="••••••••" />
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold rounded-xl transition shadow-lg shadow-violet-900/40 disabled:opacity-50 cursor-pointer">
          {loading ? 'Autenticando...' : 'Ingresar'}
        </button>
      </form>
      <p className="text-xs text-ink-400 text-center mt-4">
        ¿No tienes cuenta? <Link to="/registro" className="text-violet-300 font-bold hover:underline">Crear cuenta</Link>
      </p>
    </AuthShell>
  );
}
