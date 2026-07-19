export interface DashboardProfile {
  id: string;
  codigo_universitario: string;
  correo: string;
  nombres: string;
  apellidos: string;
  telefono: string | null;
  foto_url: string | null;
  estado: string;
  es_admin: boolean;
}

export interface SessionSummary {
  id: string;
  titulo: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  lugar: string | null;
}

export interface AdminDashboardData {
  profile: DashboardProfile;

  totalMiembros: number;
  solicitudesPendientes: number;
  materialesRecientes: number;
  votacionesActivas: number;

  proximaSesion: SessionSummary | null;
}

export interface MemberDashboardData {
  profile: DashboardProfile;

  porcentajeAsistencia: number;
  materialesNuevos: number;
  votacionesDisponibles: number;

  proximaSesion: SessionSummary | null;
}

export type DashboardData =
  | AdminDashboardData
  | MemberDashboardData;