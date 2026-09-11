// =================================================================
// Archivo: src/App.tsx
//RESPONSABILIDAD: Configura el sistema de rutas con <ProtectedRoute> y RBAC
//para restringir vistas según el rol del usuario autenticado.
// =================================================================
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EquiposPage from './pages/EquiposPage/EquiposPage';
import NuevoEquipoPage from './pages/NuevoEquipoPage/NuevoEquipoPage';
import DetalleEquipoPage from './pages/DetalleEquipoPage/DetalleEquipoPage';
import LoginPage from './pages/LoginPage/LoginPage';
// 🛡️ Importamos la guardia de seguridad
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* 1. Ruta Pública (Accesible para cualquiera) */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. Nivel 1 de Protección: Requiere cualquier usuario autenticado (Aprendiz, Instructor, Admin) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventario" element={<EquiposPage />} />

          {/* 3. Nivel 2 de Protección (RBAC): Exclusivo para el rol 'Administrador' */}
          <Route element={<ProtectedRoute requiredRole="Administrador" />}>
            <Route path="inventario/nuevo" element={<NuevoEquipoPage />} />
            <Route path="inventario/:placaSena" element={<DetalleEquipoPage />} />
          </Route>
        </Route>
      </Route>

      {/* Ruta Comodín: Redirige cualquier ruta desconocida al login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}