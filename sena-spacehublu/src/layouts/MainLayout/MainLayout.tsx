// =================================================================
// Archivo: src/layouts/MainLayout/MainLayout.tsx
//RESPONSABILIDAD: Layout Shell que integra el componente <NavBar/> y la barra de sesión
//con el botón de cierre de sesión (<Outlet/> para rutas hijas).
// =================================================================
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/useAuth';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout-shell min-h-screen text-ink-100 flex flex-col">
      <NavBar />
      <div className="px-6 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
            {user?.nombreCompleto?.charAt(0) || 'U'}
          </span>
          <div className="leading-tight">
            <strong className="block text-white text-sm">{user?.nombreCompleto || 'Usuario Autenticado'}</strong>
            <span className="text-ink-400">Sesión activa</span>
          </div>
          <span className="bg-violet-500/20 text-violet-200 px-2.5 py-1 rounded-full text-[10px] font-bold border border-violet-400/30">
            {user?.role || 'Rol'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-3.5 py-1.5 bg-ink-800 hover:bg-rose-600/80 text-ink-200 hover:text-white border border-ink-700 hover:border-rose-500 rounded-lg text-xs font-semibold transition cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </div>
      <main className="content-viewport flex-1 px-6 pb-8 pt-2">
        <Outlet />
      </main>
    </div>
  );
}
