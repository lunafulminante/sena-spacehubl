export interface ModalNovedadProps {
  titulo: string;
  mensaje: string;
  onClose: () => void; // Callback obligatoria enviada por el Padre
}

export default function ModalNovedad({ titulo, mensaje, onClose }: ModalNovedadProps) {
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-ink-900 border border-ink-700 w-full max-w-md rounded-2xl p-6 shadow-2xl text-white">
        <h3 className="text-lg font-bold text-violet-300 mb-2">{titulo}</h3>
        <p className="text-sm text-ink-300 mb-4">{mensaje}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-ink-800 hover:bg-ink-700 rounded-xl text-xs font-bold cursor-pointer">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
