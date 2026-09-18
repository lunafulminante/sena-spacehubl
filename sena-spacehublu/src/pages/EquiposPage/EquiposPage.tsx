// =================================================================
// Archivo: src/pages/EquiposPage/EquiposPage.tsx
//RESPONSABILIDAD: Muestra la tabla con el listado de equipos y permite eliminar recursos.
// =================================================================
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { equiposService } from '../../services/equiposService';
import type { Equipo } from '../../services/equiposService';
import { useAuth } from '../../context/useAuth';

export default function EquiposPage() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, user } = useAuth();

  const loadEquipos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEquipos(); }, []);

  const handleDelete = async (placaSena: string) => {
    if (!window.confirm(`¿Eliminar el equipo ${placaSena}?`)) return;
    try {
      await equiposService.remove(placaSena);
      loadEquipos();
    } catch (err: unknown) {
      alert(`Error API: ${err instanceof Error ? err.message : 'Error al eliminar'}`);
    }
  };

  return (
    <div className="p-6 bg-ink-800/70 border border-violet-400/15 rounded-2xl backdrop-blur-sm text-white space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-violet-300">Inventario de Equipos SENA</h2>
          <p className="text-xs text-ink-400">Listado de equipos de cómputo disponibles en los ambientes.</p>
          {!isAdmin && (
            <p className="text-[11px] text-amber-400 mt-1">Sesión como {user?.role}: solo el Administrador puede registrar, editar o eliminar equipos.</p>
          )}
        </div>
        {isAdmin && (
          <Link to="/inventario/nuevo" className="px-4 py-2.5 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-900/40 font-extrabold rounded-xl text-xs transition shadow-lg">
            + Registrar Equipo
          </Link>
        )}
      </div>

      {error && <div className="p-3 bg-rose-900/80 border border-rose-500 rounded-xl text-rose-200 text-xs font-mono">{error}</div>}

      {loading ? (
        <div className="text-center py-8 text-ink-400 font-mono text-xs">Cargando inventario...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-ink-700">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-ink-900 text-ink-400 uppercase">
              <tr>
                <th className="p-3">Placa SENA</th>
                <th className="p-3">Marca/Modelo</th>
                <th className="p-3">RAM</th>
                <th className="p-3">Ambiente</th>
                <th className="p-3">Estado</th>
                {isAdmin && <th className="p-3 text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700/60">
              {equipos.map((eq) => (
                <tr key={eq.placaSena} className="hover:bg-ink-700/40">
                  <td className="p-3 text-violet-300 font-bold">{eq.placaSena}</td>
                  <td className="p-3 text-white font-sans">{eq.marcaModelo}</td>
                  <td className="p-3">{eq.ram}</td>
                  <td className="p-3 font-sans">{eq.ambiente}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${eq.estado === 'Operativo' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {eq.estado}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="p-3 text-right space-x-2 font-sans">
                      <Link to={`/inventario/${eq.placaSena}`} className="px-2.5 py-1 bg-ink-700 hover:bg-fuchsia-600 rounded-lg text-xs transition inline-block">Editar</Link>
                      <button onClick={() => handleDelete(eq.placaSena)} className="px-2.5 py-1 bg-rose-800 hover:bg-rose-600 rounded-lg text-xs transition">Eliminar</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}