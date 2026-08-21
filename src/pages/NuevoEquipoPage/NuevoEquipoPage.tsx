import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoEquipoPage() {
  const navigate = useNavigate();
  const [placa, setPlaca] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Lógica para guardar equipo...
    // 2. Redirección programática a la lista:
    navigate('/inventario');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Nuevo Equipo</h2>
      <input value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="Placa SENA" />
      <button type="submit">Guardar</button>
    </form>
  );
}