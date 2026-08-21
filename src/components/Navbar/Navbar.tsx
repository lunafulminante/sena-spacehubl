import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="header-sena">
      <h1>SENA SpaceHub</h1>
      <nav>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? 'nav-active' : 'nav-item'}>
          📊 Dashboard
        </NavLink>
        <NavLink 
          to="/inventario" 
          className={({ isActive }) => isActive ? 'nav-active' : 'nav-item'}>
          💻 Inventario
        </NavLink>
      </nav>
    </header>
  );
}



