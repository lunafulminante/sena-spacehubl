// =================================================================
// Archivo: src/pages/DashboardPage/DashboardPage.tsx
//RESPONSABILIDAD: Panel analítico con indicadores de equipos, préstamos, incidencias
//y ocupación por ambiente (datos de GET /dashboard/stats).
// =================================================================
import { useEffect, useState } from 'react';
import TarjetaFicha from '../../components/TarjetaFicha/TarjetaFicha';
import ModalNovedad from '../../components/ModalNovedad/ModalNovedad';
import { dashboardService, type DashboardStats } from '../../services/dashboardService';

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  valueClass?: string;
}

function StatCard({ label, value, hint, valueClass = 'text-white' }: StatCardProps) {
  return (
    <div className="relative overflow-hidden p-5 bg-linear-to-br from-ink-800 to-ink-900 border border-violet-400/15 rounded-2xl shadow-xl shadow-violet-950/40">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-violet-500 to-fuchsia-500" />
      <p className="text-[11px] font-semibold tracking-wider uppercase text-ink-400">{label}</p>
      <p className={`text-3xl font-extrabold mt-1 ${valueClass}`}>{value}</p>
      {hint && <p className="text-[11px] text-ink-500 mt-1">{hint}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  useEffect(() => {
    dashboardService.getStats()
      .then(setStats)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error al cargar el dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const enMantenimiento = stats?.equiposMantenimiento ?? 0;
  const prestados = stats ? Math.min(stats.prestamosActivos, stats.equiposOperativos) : 0;
  const disponibles = stats ? stats.equiposOperativos - prestados : 0;

  const total = stats?.totalEquipos ?? 0;
  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0);
  const finPrestados = pct(prestados);
  const finDisponibles = finPrestados + pct(disponibles);
  const donut = total > 0
    ? `conic-gradient(#e879f9 0 ${finPrestados}%, #8b5cf6 ${finPrestados}% ${finDisponibles}%, #f59e0b ${finDisponibles}% 100%)`
    : '#3b3266';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold bg-linear-to-r from-violet-200 to-fuchsia-300 bg-clip-text text-transparent">Dashboard</h2>
        <p className="text-xs text-ink-400">Resumen del estado de los equipos, préstamos y ambientes.</p>
      </div>

      {error && <div className="p-3 bg-rose-900/80 border border-rose-500 rounded-xl text-rose-200 text-xs font-mono">{error}</div>}
      {loading && <div className="text-center py-8 text-ink-400 font-mono text-xs animate-pulse">Cargando indicadores...</div>}

      {stats && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard label="Total equipos" value={stats.totalEquipos} />
            <StatCard label="Operativos" value={stats.equiposOperativos} valueClass="text-violet-300" />
            <StatCard label="En mantenimiento" value={enMantenimiento} valueClass="text-amber-400" />
            <StatCard label="Préstamos activos" value={stats.prestamosActivos} valueClass="text-fuchsia-400" />
            <StatCard label="Ocupación global" value={stats.tasaOcupacionGlobal} hint="Préstamos activos / total de equipos" />
            <StatCard
              label="Incidencias"
              value={stats.incidencias.total}
              valueClass={stats.incidencias.total > 0 ? 'text-rose-400' : 'text-white'}
              hint={`Alta: ${stats.incidencias.alta} · Media: ${stats.incidencias.media}`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-6 bg-ink-800/70 border border-violet-400/15 rounded-2xl backdrop-blur-sm shadow-xl">
              <h3 className="text-sm font-bold text-white mb-4">Estado de los equipos</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-36 h-36 rounded-full shrink-0" style={{ background: donut }}>
                  <div className="absolute inset-4 rounded-full bg-ink-800 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold">{total}</span>
                    <span className="text-[10px] font-mono text-ink-400">equipos</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-fuchsia-400" />Prestados: <strong>{prestados}</strong></li>
                  <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-violet-500" />Disponibles: <strong>{disponibles}</strong></li>
                  <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" />En mantenimiento: <strong>{enMantenimiento}</strong></li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-ink-800/70 border border-violet-400/15 rounded-2xl backdrop-blur-sm shadow-xl">
              <h3 className="text-sm font-bold text-white mb-4">Ocupación por ambiente</h3>
              <div className="space-y-4">
                {stats.laboratoriosOcupacion.map((lab) => (
                  <div key={lab.nombre}>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-ink-200">{lab.nombre}</span>
                      <span className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${lab.activo ? 'bg-emerald-500/20 text-emerald-400' : 'bg-ink-500/20 text-ink-400'}`}>
                          {lab.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        <strong className="font-mono">{lab.porcentaje}%</strong>
                      </span>
                    </div>
                    <div className="w-full bg-ink-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${lab.activo ? 'bg-linear-to-r from-violet-500 to-fuchsia-500' : 'bg-ink-500'}`}
                        style={{ width: `${lab.porcentaje}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Fichas</h3>
        <TarjetaFicha
          numeroFicha="2879451"
          programa="Análisis y Desarrollo de Software"
          jornada="Diurna"
          onAbrirModal={() => setMostrarModal(true)}
        />
      </div>

      {mostrarModal && (
        <ModalNovedad
          titulo="Novedad ADSO"
          mensaje="Migración a TypeScript completada exitosamente."
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}
