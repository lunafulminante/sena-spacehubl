import { useCallback, useEffect, useState } from 'react';
import { prestamosService, type Prestamo } from '../../services/prestamosService';
import { equiposService, type Equipo } from '../../services/equiposService';
import { useAuth } from '../../context/useAuth';
import { usuariosService, type Aprendiz } from '../../services/usuariosService';
import PrestamoModal from '../../components/PrestamoModal';
import Swal from 'sweetalert2';

export default function PrestamosPage() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [aprendices, setAprendices] = useState<Aprendiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAdmin, user } = useAuth();
  const puedeElegirAprendiz = user?.role !== 'Aprendiz';

  // --- FASE 1: Carga de datos desde el servidor ---
  const loadPrestamos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [prestamosData, equiposData, aprendicesData] = await Promise.all([
        prestamosService.getAll(),
        equiposService.getAll(),
        puedeElegirAprendiz ? usuariosService.getAprendices().catch((): Aprendiz[] => []) : Promise.resolve([] as Aprendiz[])
      ]);
      setPrestamos(prestamosData);
      setEquipos(equiposData);
      setAprendices(aprendicesData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }, [puedeElegirAprendiz]);

  useEffect(() => { loadPrestamos(); }, [loadPrestamos]);

  // --- FASE 2: Crear préstamo y mostrar alertas ---
  const handleCrearPrestamo = async (data: { aprendizId?: number; equipoPlaca: string }) => {
    try {
      await prestamosService.create(data);
      loadPrestamos();
      Swal.fire({
        title: '¡Registrado!',
        text: 'El préstamo se ha creado exitosamente.',
        icon: 'success',
        background: '#261e4a',
        color: '#fff',
        confirmButtonColor: '#8b5cf6'
      });
    } catch (err: unknown) {
      Swal.fire({ title: 'Error', text: err instanceof Error ? err.message : 'No se pudo registrar el préstamo', icon: 'error', background: '#261e4a', color: '#fff' });
      throw err;
    }
  };

  // --- FASE 2: Devolver equipo ---
  const handleDevolver = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Confirmar Devolución?',
      text: "El equipo quedará nuevamente disponible en el inventario.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, registrar devolución',
      cancelButtonText: 'Cancelar',
      background: '#261e4a',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await prestamosService.devolver(id);
        loadPrestamos();
        Swal.fire({
          title: '¡Devuelto!',
          text: 'El equipo ha sido devuelto exitosamente.',
          icon: 'success',
          background: '#261e4a',
          color: '#fff',
          confirmButtonColor: '#8b5cf6'
        });
      } catch {
        Swal.fire({ title: 'Error', text: 'No se pudo procesar la devolución', icon: 'error', background: '#261e4a', color: '#fff' });
      }
    }
  };

  // --- INTERFAZ: Listado de préstamos ---
  return (
    <div className="space-y-6">
      {/* Encabezado con botón para nuevo préstamo */}
      <div className="p-6 bg-ink-800/70 border border-violet-400/15 rounded-2xl backdrop-blur-sm text-white shadow-xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-violet-300">Gestión de Préstamos</h2>
          <p className="text-xs text-ink-400">Control de asignación y devoluciones de equipos de cómputo.</p>
          {!isAdmin && (
            <p className="text-[11px] text-amber-400 mt-1">Sesión como {user?.role}: solo el Administrador puede registrar devoluciones.</p>
          )}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2.5 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-900/40 font-extrabold rounded-xl text-xs transition shadow-lg">
          + Nuevo Préstamo
        </button>
      </div>

      {/* Tabla de préstamos (FASE 1) */}
      <div className="p-6 bg-ink-800/70 border border-violet-400/15 rounded-2xl backdrop-blur-sm text-white shadow-xl">
        <h2 className="text-xl font-bold text-violet-300 mb-4">Historial de Préstamos Activos</h2>
        
        {error && <div className="p-3 mb-4 bg-rose-900/80 border border-rose-500 rounded-xl text-rose-200 text-xs font-mono">{error}</div>}

        {loading ? (
          <div className="text-center py-8 text-ink-400 font-mono text-xs animate-pulse">Conectando con el servidor...</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-700">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-ink-900 text-ink-400 uppercase">
                <tr>
                  <th className="p-3">Aprendiz / Ficha</th>
                  <th className="p-3">Equipo (Placa)</th>
                  <th className="p-3">Hora Salida</th>
                  <th className="p-3">Estado</th>
                  {isAdmin && <th className="p-3 text-right">Acciones</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-700/60">
                {prestamos.map((p) => (
                  <tr key={p.id} className="hover:bg-ink-700/40 transition-colors">
                    <td className="p-3 text-white font-sans">
                      {p.aprendiz} <span className="text-ink-500 block text-[10px]">Ficha: {p.ficha}</span>
                    </td>
                    <td className="p-3 text-violet-300 font-bold">{p.equipoPlaca}</td>
                    <td className="p-3 text-ink-400">{p.horaInicio}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.estado === 'Activo' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-ink-500/20 text-ink-400'}`}>
                        {p.estado}
                      </span>
                    </td>
                    {/* Botón de devolución (FASE 2) */}
                    {isAdmin && (
                      <td className="p-3 text-right font-sans">
                        {p.estado === 'Activo' && (
                          <button onClick={() => handleDevolver(p.id)} className="px-3 py-1.5 bg-ink-700 hover:bg-fuchsia-600 rounded-lg text-xs font-bold transition shadow">
                            Devolver
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {prestamos.length === 0 && (
                  <tr>
                    <td colSpan={isAdmin ? 5 : 4} className="p-6 text-center text-ink-500 font-sans">No hay préstamos registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal (FASE 3) */}
      <PrestamoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCrearPrestamo}
        puedeElegirAprendiz={puedeElegirAprendiz}
        aprendices={aprendices}
        defaultNombre={user?.nombreCompleto || ''}
        defaultFicha={user?.ficha || ''}
        equipos={equipos.filter((eq) => eq.estado === 'Operativo' && !prestamos.some((p) => p.estado === 'Activo' && p.equipoPlaca === eq.placaSena))}
      />
    </div>
  );
}