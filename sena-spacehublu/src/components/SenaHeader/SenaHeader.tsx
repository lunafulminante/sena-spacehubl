// 1. Definimos el Contrato de Props en TypeScript
export interface SenaHeaderProps {
  tituloPortal: string;
  centroFormacion: string;
}

// 2. Aplicamos la interface a las Props del componente
export default function SenaHeader({ tituloPortal, centroFormacion }: SenaHeaderProps) {
  return (
    <header className="header-container">
      <h1>{tituloPortal}</h1>
      <p>{centroFormacion}</p>
    </header>
  );
}