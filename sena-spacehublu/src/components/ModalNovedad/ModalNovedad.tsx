export interface ModalNovedadProps {
  titulo: string;
  mensaje: string;
  onClose: () => void; // Callback obligatoria enviada por el Padre
}

export default function ModalNovedad({ titulo, mensaje, onClose }: ModalNovedadProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <button onClick={onClose}>Cerrar Modal</button>
      </div>
    </div>
  );
}