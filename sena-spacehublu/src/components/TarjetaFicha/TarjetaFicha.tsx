import { useState } from 'react';

// Contrato de Props con callback opcional para el modal
export interface TarjetaFichaProps {
  numeroFicha: string;
  programa: string;
  jornada: string;
  onAbrirModal?: () => void; // Callback tipada (sin retorno)
}

export default function TarjetaFicha({ numeroFicha, programa, jornada, onAbrirModal }: TarjetaFichaProps) {
  const [asistio, setAsistio] = useState<boolean>(false);

  return (
    <div className="p-5 bg-ink-800/70 border border-violet-400/15 rounded-2xl backdrop-blur-sm text-white shadow-xl max-w-md space-y-3">
      <span className="text-xs font-mono text-violet-300 font-bold">Ficha #{numeroFicha}</span>
      <h3 className="text-lg font-bold">{programa} <span className="text-ink-400 font-normal">· {jornada}</span></h3>
      <div className="flex gap-2 text-xs font-bold">
        <button onClick={() => setAsistio(!asistio)} className="px-3 py-2 bg-ink-700 hover:bg-ink-600 rounded-xl cursor-pointer">
          {asistio ? '✅ Presente' : '❌ Ausente'}
        </button>

        {/* Renderizado condicional mediante cortocircuito && */}
        {onAbrirModal && (
          <button onClick={onAbrirModal} className="px-3 py-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-900/40 rounded-xl cursor-pointer">
            💬 Ver Novedades
          </button>
        )}
      </div>
    </div>
  );
}
