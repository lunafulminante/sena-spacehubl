// =================================================================
// Archivo: src/pages/RegisterPage/RegisterPage.tsx
//RESPONSABILIDAD: Formulario de creación de cuenta (Aprendiz o Instructor) vía authService.register.
// =================================================================
import React, { useState } from 'react';
import AuthShell from '../../components/AuthShell';
import { Link, useNavigate } from 'react-router-dom';
import { authService, type RegisterData } from '../../services/authService';

const inputClass = 'w-full bg-ink-900 border border-ink-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30';

export default function RegisterPage() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ficha, setFicha] = useState('');
  const [role, setRole] = useState<RegisterData['role']>('Aprendiz');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.register({ nombreCompleto, email, password, role, ficha: role === 'Aprendiz' && ficha ? ficha : undefined });
      navigate('/login', { state: { registered: true } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Crear cuenta" subtitle="Regístrate como Aprendiz o Instructor">
      {error && <div className="p-3 mb-4 bg-rose-900/80 border border-rose-500 rounded-xl text-rose-200 text-xs font-mono">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="regRole" className="block text-xs font-bold text-ink-300 mb-1">Rol</label>
          <select id="regRole" value={role} onChange={(e) => setRole(e.target.value as RegisterData['role'])} className={inputClass}>
            <option value="Aprendiz">Aprendiz</option>
            <option value="Instructor">Instructor</option>
          </select>
        </div>
        {role === 'Aprendiz' && (
          <div>
            <label htmlFor="regFicha" className="block text-xs font-bold text-ink-300 mb-1">Ficha</label>
            <input id="regFicha" type="text" inputMode="numeric" value={ficha} onChange={(e) => setFicha(e.target.value)} className={inputClass} placeholder="2879451" />
          </div>
        )}
        <div>
          <label htmlFor="regNombre" className="block text-xs font-bold text-ink-300 mb-1">Nombre completo</label>
          <input id="regNombre" type="text" required autoComplete="name" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="regEmail" className="block text-xs font-bold text-ink-300 mb-1">Correo Institucional</label>
          <input id="regEmail" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="roberto.gomez@sena.edu.co" />
        </div>
        <div>
          <label htmlFor="regPassword" className="block text-xs font-bold text-ink-300 mb-1">Contraseña</label>
          <input id="regPassword" type="password" required minLength={6} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold rounded-xl transition shadow-lg shadow-violet-900/40 disabled:opacity-50 cursor-pointer">
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>
      <p className="text-xs text-ink-400 text-center mt-4">
        ¿Ya tienes cuenta? <Link to="/login" className="text-violet-300 font-bold hover:underline">Iniciar sesión</Link>
      </p>
    </AuthShell>
  );
}
