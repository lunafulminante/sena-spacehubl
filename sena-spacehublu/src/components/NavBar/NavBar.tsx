// =================================================================
// Archivo: src/components/NavBar/NavBar.tsx
//RESPONSABILIDAD: Barra de navegación superior con enlaces a los módulos principales.
// =================================================================
import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/inventario', label: 'Inventario' },
  { to: '/prestamos', label: 'Préstamos' },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-ink-900/70 backdrop-blur-md border-b border-violet-400/15 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-900/50 flex items-center justify-center text-white font-black text-sm">S</span>
          <span className="font-extrabold tracking-tight text-lg bg-linear-to-r from-violet-200 to-fuchsia-300 bg-clip-text text-transparent">SENA SpaceHub</span>
        </div>
        <nav className="flex gap-1 text-sm">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/30' : 'text-ink-300 hover:text-white hover:bg-ink-800'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
