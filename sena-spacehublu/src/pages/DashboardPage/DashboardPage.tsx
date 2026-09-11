import { useState } from 'react';
import TarjetaFicha from '../../components/TarjetaFicha/TarjetaFicha';
import ModalNovedad from '../../components/ModalNovedad/ModalNovedad';

export default function DashboardPage() {
  // Estado tipado explícitamente como boolean
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  return (
    <div className="dashboard-container">
      <h2>Panel de Fichas ADSO</h2>
      
      <TarjetaFicha 
        numeroFicha="2879451" 
        programa="Análisis y Desarrollo de Software" 
        jornada="Diurna"
        onAbrirModal={() => setMostrarModal(true)}
      />

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
