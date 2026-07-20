import type { Database } from "@/types/database.types";

export type EstadoPerfil =
  Database["public"]["Enums"]["estado_perfil"];

export type Miembro = {
  id: string;
  perfil_id: string;
  fecha_ingreso: string | null;
  fecha_salida: string | null;
  activo: boolean;
  observaciones: string | null;
  created_at: string;
  updated_at: string;
  perfil: {
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string | null;
    codigo_universitario: string | null;
    estado: EstadoPerfil;
    es_admin: boolean | null;
  };
};