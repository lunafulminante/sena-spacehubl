import { apiFetch } from './api';

export interface LaboratorioOcupacion {
  nombre: string;
  porcentaje: number;
  activo: boolean;
}

export interface DashboardStats {
  totalEquipos: number;
  equiposOperativos: number;
  equiposMantenimiento: number;
  prestamosActivos: number;
  tasaOcupacionGlobal: string;
  incidencias: { total: number; alta: number; media: number };
  laboratoriosOcupacion: LaboratorioOcupacion[];
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    return apiFetch<DashboardStats>('/dashboard/stats');
  },
};

export default dashboardService;
