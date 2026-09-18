import { useState, type FormEvent } from 'react';
import type { Equipo } from '../services/equiposService';
import type { Aprendiz } from '../services/usuariosService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { aprendizId?: number; equipoPlaca: string }) => Promise<void>;
  puedeElegirAprendiz: boolean;
  aprendices: Aprendiz[];
  defaultNombre: string;
  defaultFicha: string;
  equipos: Equipo[];
}

export default function PrestamoModal({ isOpen, onClose, onSubmit, puedeElegirAprendiz, aprendices, defaultNombre, defaultFicha, equipos }: Props) {
  const [equipoPlaca, setEquipoPlaca] = useState('');
  const [aprendizId, setAprendizId] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const seleccionado = aprendices.find((a) => String(a.id) === aprendizId);
  const nombre = puedeElegirAprendiz ? seleccionado?.nombreCompleto : defaultNombre;
  const ficha = puedeElegirAprendiz ? seleccionado?.ficha : defaultFicha;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ aprendizId: puedeElegirAprendiz ? Number(aprendizId) : undefined, equipoPlaca });
      setEquipoPlaca('');
      setAprendizId('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-ink-900 border border-ink-700 w-full max-w-md rounded-2xl p-6 shadow-2xl text-white relative">
        <div className="flex justify-between items-center mb-4 border-b border-ink-800 pb-3">
          <h3 className="text-lg font-bold text-violet-300">Registrar Nuevo Préstamo</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-white font-bold cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold text-ink-300 mb-1">Seleccionar Equipo</label>
            <select required value={equipoPlaca} onChange={(e) => setEquipoPlaca(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded-xl p-2.5 text-white">
              <option value="">-- Selecciona un equipo --</option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.placaSena}>
                  {equipo.placaSena} - {equipo.marcaModelo}
                </option>
              ))}
            </select>
            {equipos.length === 0 && <p className="text-amber-400 mt-1">No hay equipos disponibles para prestar.</p>}
          </div>
          <div>
            <label className="block font-bold text-ink-300 mb-1">Aprendiz</label>
            {puedeElegirAprendiz ? (
              <select required value={aprendizId} onChange={(e) => setAprendizId(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded-xl p-2.5 text-white">
                <option value="">-- Selecciona un aprendiz --</option>
                {aprendices.map((a) => (
                  <option key={a.id} value={a.id}>{a.nombreCompleto}</option>
                ))}
              </select>
            ) : (
              <input type="text" value={nombre} disabled className="w-full bg-ink-800 border border-ink-700 rounded-xl p-2.5 text-white disabled:opacity-50" />
            )}
            {puedeElegirAprendiz && aprendices.length === 0 && <p className="text-amber-400 mt-1">No se pudo cargar la lista de aprendices. Verifica que el servidor esté actualizado.</p>}
          </div>
          <div>
            <label className="block font-bold text-ink-300 mb-1">Ficha</label>
            <input type="text" value={ficha || 'Sin ficha registrada'} disabled className="w-full bg-ink-800 border border-ink-700 rounded-xl p-2.5 text-white disabled:opacity-50" />
          </div>

          <div className="flex justify-end gap-3 pt-4 font-sans">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-ink-800 hover:bg-ink-700 rounded-xl text-xs font-bold cursor-pointer">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-900/40 font-extrabold rounded-xl text-xs cursor-pointer disabled:opacity-50">{loading ? 'Guardando...' : 'Asignar Equipo'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
