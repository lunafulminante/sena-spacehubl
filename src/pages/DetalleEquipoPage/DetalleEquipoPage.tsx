import { useParams } from 'react';

export default function DetalleEquipoPage() {
  // Extraemos la variable :placaSena definida en el 
  const { placaSena } = useParams<{ placaSena: string }>();

  return (
    <div>
      <h2>Ficha Técnica del Computador</h2>
      <p>Placa SENA Consultada: <strong>{placaSena}</strong></p>
    </div>
  );
}