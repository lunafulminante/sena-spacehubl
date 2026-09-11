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
    <div className="tarjeta-box">
      <span>Ficha #{numeroFicha}</span>
      <h3>{programa} {jornada}</h3>
      <button onClick={() => setAsistio(!asistio)}>
        {asistio ? '✅ Presente' : '❌ Ausente'}
      </button>
      
      {/* Renderizado condicional mediante cortocircuito && */}
      {onAbrirModal && (
        <button onClick={onAbrirModal}>💬 Ver Novedades (Modal)</button>
      )}
    </div>
  );
}