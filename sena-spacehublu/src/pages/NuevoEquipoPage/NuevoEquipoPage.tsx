// =================================================================
// Archivo: src/pages/NuevoEquipoPage/NuevoEquipoPage.tsx
//RESPONSABILIDAD: Formulario para registrar un nuevo equipo en la API mediante POST.
// =================================================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { equiposService, type Equipo } from '../../services/equiposService';

export default function NuevoEquipoPage() {
  const [placaSena, setPlacaSena] = useState('');
  const [marcaModelo, setMarcaModelo] = useState('');
  const [ram, setRam] = useState('16GB DDR4');
  const [ambiente, setAmbiente] = useState('Ambiente 301 - ADSO');
  const [estado, setEstado] = useState<Equipo['estado']>('Operativo');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await equiposService.create({ placaSena, marcaModelo, ram, ambiente, estado });
      navigate('/inventario');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar equipo');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-ink-800/70 border border-violet-400/15 rounded-2xl backdrop-blur-sm text-white shadow-xl">
      <h2 className="text-xl font-bold text-violet-300 mb-1">Registrar Nuevo Equipo</h2>
      <p className="text-xs text-ink-400 mb-4">Completa los datos del equipo de cómputo.</p>
      {error && <div className="p-3 mb-4 bg-rose-900/80 border border-rose-500 rounded-xl text-rose-200 text-xs font-mono">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div>
          <label className="block font-bold text-ink-300 mb-1">Placa SENA</label>
          <input type="text" required placeholder="SENA-1006" value={placaSena} onChange={(e) => setPlacaSena(e.target.value)} className="w-full bg-ink-900 border border-ink-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30" />
        </div>
        <div>
          <label className="block font-bold text-ink-300 mb-1">Marca / Modelo</label>
          <input type="text" required placeholder="Lenovo ThinkPad L14 G3" value={marcaModelo} onChange={(e) => setMarcaModelo(e.target.value)} className="w-full bg-ink-900 border border-ink-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-ink-300 mb-1">Memoria RAM</label>
            <select value={ram} onChange={(e) => setRam(e.target.value)} className="w-full bg-ink-900 border border-ink-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30">
              <option value="8GB DDR4">8GB DDR4</option>
              <option value="16GB DDR4">16GB DDR4</option>
              <option value="32GB DDR5">32GB DDR5</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-ink-300 mb-1">Estado Inicial</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value as Equipo['estado'])} className="w-full bg-ink-900 border border-ink-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30">
              <option value="Operativo">Operativo</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-bold text-ink-300 mb-1">Ambiente Asignado</label>
          <input type="text" required value={ambiente} onChange={(e) => setAmbiente(e.target.value)} className="w-full bg-ink-900 border border-ink-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30" />
        </div>
        <div className="pt-2 flex justify-end gap-3 font-sans">
          <button type="button" onClick={() => navigate('/inventario')} className="px-4 py-2 bg-ink-700 hover:bg-ink-600 rounded-xl text-xs font-bold text-ink-300">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-900/40 font-extrabold rounded-xl text-xs shadow-lg">Guardar Equipo</button>
        </div>
      </form>
    </div>
  );
}