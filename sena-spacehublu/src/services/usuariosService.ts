import { apiFetch } from './api';

export interface Aprendiz {
  id: number;
  nombreCompleto: string;
  ficha: string;
}

export const usuariosService = {
  getAprendices: async (): Promise<Aprendiz[]> => {
    return apiFetch<Aprendiz[]>('/usuarios/aprendices');
  },
};

export default usuariosService;
