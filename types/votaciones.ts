import type { Database } from "@/types/database.types";

export type TipoVotacion =
  Database["public"]["Enums"]["tipo_votacion"];

export type EstadoVotacion =
  Database["public"]["Enums"]["estado_votacion"];

export type OpcionVoto =
  Database["public"]["Enums"]["opcion_voto"];

export type VotoVotacion = {
  perfil_id: string;
  voto: OpcionVoto;
};

export type Votacion = {
  id: string;
  titulo: string;
  descripcion: string | null;
  tipo: TipoVotacion;
  estado: EstadoVotacion;
  fecha_inicio: string;
  fecha_fin: string | null;
  created_at: string;
  solicitud_id: string | null;
  votos: VotoVotacion[];
  votoActual: OpcionVoto | null;
};