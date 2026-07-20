export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      asistencia: {
        Row: {
          created_at: string
          estado: Database["public"]["Enums"]["estado_asistencia"]
          id: string
          justificacion: string | null
          perfil_id: string
          registrado_por: string | null
          sesion_id: string
        }
        Insert: {
          created_at?: string
          estado: Database["public"]["Enums"]["estado_asistencia"]
          id?: string
          justificacion?: string | null
          perfil_id: string
          registrado_por?: string | null
          sesion_id: string
        }
        Update: {
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_asistencia"]
          id?: string
          justificacion?: string | null
          perfil_id?: string
          registrado_por?: string | null
          sesion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asistencia_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asistencia_registrado_por_fkey"
            columns: ["registrado_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asistencia_sesion_id_fkey"
            columns: ["sesion_id"]
            isOneToOne: false
            referencedRelation: "sesiones"
            referencedColumns: ["id"]
          },
        ]
      }
      curso_expositores: {
        Row: {
          created_at: string | null
          curso_id: string
          id: string
          miembro_id: string
        }
        Insert: {
          created_at?: string | null
          curso_id: string
          id?: string
          miembro_id: string
        }
        Update: {
          created_at?: string | null
          curso_id?: string
          id?: string
          miembro_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "curso_expositores_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_expositores_miembro_id_fkey"
            columns: ["miembro_id"]
            isOneToOne: false
            referencedRelation: "miembros"
            referencedColumns: ["id"]
          },
        ]
      }
      cursos: {
        Row: {
          created_at: string | null
          id: string
          nombre: string
          orden: number
          sesion_id: string
          tema: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nombre: string
          orden: number
          sesion_id: string
          tema: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nombre?: string
          orden?: number
          sesion_id?: string
          tema?: string
        }
        Relationships: [
          {
            foreignKeyName: "cursos_sesion_id_fkey"
            columns: ["sesion_id"]
            isOneToOne: false
            referencedRelation: "sesiones"
            referencedColumns: ["id"]
          },
        ]
      }
      materiales: {
        Row: {
          archivo_nombre: string | null
          archivo_path: string | null
          archivo_tamano: number | null
          archivo_url: string | null
          categoria: string | null
          created_at: string
          descripcion: string | null
          id: string
          sesion_id: string | null
          subido_por: string
          tipo: Database["public"]["Enums"]["tipo_material"] | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          archivo_nombre?: string | null
          archivo_path?: string | null
          archivo_tamano?: number | null
          archivo_url?: string | null
          categoria?: string | null
          created_at?: string
          descripcion?: string | null
          id?: string
          sesion_id?: string | null
          subido_por: string
          tipo?: Database["public"]["Enums"]["tipo_material"] | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          archivo_nombre?: string | null
          archivo_path?: string | null
          archivo_tamano?: number | null
          archivo_url?: string | null
          categoria?: string | null
          created_at?: string
          descripcion?: string | null
          id?: string
          sesion_id?: string | null
          subido_por?: string
          tipo?: Database["public"]["Enums"]["tipo_material"] | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "materiales_sesion_id_fkey"
            columns: ["sesion_id"]
            isOneToOne: false
            referencedRelation: "sesiones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiales_subido_por_fkey"
            columns: ["subido_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      miembros: {
        Row: {
          activo: boolean
          created_at: string
          fecha_ingreso: string | null
          fecha_salida: string | null
          id: string
          observaciones: string | null
          perfil_id: string
          updated_at: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          fecha_ingreso?: string | null
          fecha_salida?: string | null
          id?: string
          observaciones?: string | null
          perfil_id: string
          updated_at?: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          fecha_ingreso?: string | null
          fecha_salida?: string | null
          id?: string
          observaciones?: string | null
          perfil_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "miembros_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: true
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notificaciones: {
        Row: {
          created_at: string
          enlace: string | null
          id: string
          leida: boolean
          mensaje: string
          tipo: Database["public"]["Enums"]["tipo_notificacion"]
          titulo: string
          usuario_id: string
        }
        Insert: {
          created_at?: string
          enlace?: string | null
          id?: string
          leida?: boolean
          mensaje: string
          tipo?: Database["public"]["Enums"]["tipo_notificacion"]
          titulo: string
          usuario_id: string
        }
        Update: {
          created_at?: string
          enlace?: string | null
          id?: string
          leida?: boolean
          mensaje?: string
          tipo?: Database["public"]["Enums"]["tipo_notificacion"]
          titulo?: string
          usuario_id?: string
        }
        Relationships: []
      }
      perfiles: {
        Row: {
          apellidos: string
          codigo_universitario: string
          correo: string
          created_at: string
          es_admin: boolean
          estado: Database["public"]["Enums"]["estado_perfil"]
          foto_url: string | null
          id: string
          nombres: string
          telefono: string | null
          updated_at: string
        }
        Insert: {
          apellidos: string
          codigo_universitario: string
          correo: string
          created_at?: string
          es_admin?: boolean
          estado?: Database["public"]["Enums"]["estado_perfil"]
          foto_url?: string | null
          id: string
          nombres: string
          telefono?: string | null
          updated_at?: string
        }
        Update: {
          apellidos?: string
          codigo_universitario?: string
          correo?: string
          created_at?: string
          es_admin?: boolean
          estado?: Database["public"]["Enums"]["estado_perfil"]
          foto_url?: string | null
          id?: string
          nombres?: string
          telefono?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      roles_sesion: {
        Row: {
          created_at: string
          id: string
          perfil_id: string
          rol: Database["public"]["Enums"]["rol_sesion"]
          sesion_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          perfil_id: string
          rol: Database["public"]["Enums"]["rol_sesion"]
          sesion_id: string
        }
        Update: {
          created_at?: string
          id?: string
          perfil_id?: string
          rol?: Database["public"]["Enums"]["rol_sesion"]
          sesion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_sesion_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_sesion_sesion_id_fkey"
            columns: ["sesion_id"]
            isOneToOne: false
            referencedRelation: "sesiones"
            referencedColumns: ["id"]
          },
        ]
      }
      sesiones: {
        Row: {
          created_at: string
          created_by: string | null
          descripcion: string | null
          estado: Database["public"]["Enums"]["estado_sesion"]
          fecha: string
          hora_fin: string
          hora_inicio: string
          id: string
          lugar: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_sesion"]
          fecha: string
          hora_fin: string
          hora_inicio: string
          id?: string
          lugar?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_sesion"]
          fecha?: string
          hora_fin?: string
          hora_inicio?: string
          id?: string
          lugar?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sesiones_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitudes: {
        Row: {
          apellidos: string
          codigo_universitario: string
          correo: string
          estado: Database["public"]["Enums"]["estado_solicitud"]
          fecha_revision: string | null
          fecha_solicitud: string
          id: string
          motivo: string | null
          nombres: string
          perfil_id: string | null
          revisado_por: string | null
          telefono: string | null
        }
        Insert: {
          apellidos: string
          codigo_universitario: string
          correo: string
          estado?: Database["public"]["Enums"]["estado_solicitud"]
          fecha_revision?: string | null
          fecha_solicitud?: string
          id?: string
          motivo?: string | null
          nombres: string
          perfil_id?: string | null
          revisado_por?: string | null
          telefono?: string | null
        }
        Update: {
          apellidos?: string
          codigo_universitario?: string
          correo?: string
          estado?: Database["public"]["Enums"]["estado_solicitud"]
          fecha_revision?: string | null
          fecha_solicitud?: string
          id?: string
          motivo?: string | null
          nombres?: string
          perfil_id?: string | null
          revisado_por?: string | null
          telefono?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solicitudes_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitudes_revisado_por_fkey"
            columns: ["revisado_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      votaciones: {
        Row: {
          created_at: string
          created_by: string | null
          descripcion: string | null
          estado: Database["public"]["Enums"]["estado_votacion"]
          fecha_fin: string | null
          fecha_inicio: string
          id: string
          solicitud_id: string | null
          tipo: Database["public"]["Enums"]["tipo_votacion"]
          titulo: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_votacion"]
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: string
          solicitud_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_votacion"]
          titulo: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_votacion"]
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: string
          solicitud_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_votacion"]
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "votaciones_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votaciones_solicitud_id_fkey"
            columns: ["solicitud_id"]
            isOneToOne: false
            referencedRelation: "solicitudes"
            referencedColumns: ["id"]
          },
        ]
      }
      votos: {
        Row: {
          created_at: string
          id: string
          perfil_id: string
          votacion_id: string
          voto: Database["public"]["Enums"]["opcion_voto"]
        }
        Insert: {
          created_at?: string
          id?: string
          perfil_id: string
          votacion_id: string
          voto: Database["public"]["Enums"]["opcion_voto"]
        }
        Update: {
          created_at?: string
          id?: string
          perfil_id?: string
          votacion_id?: string
          voto?: Database["public"]["Enums"]["opcion_voto"]
        }
        Relationships: [
          {
            foreignKeyName: "votos_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votos_votacion_id_fkey"
            columns: ["votacion_id"]
            isOneToOne: false
            referencedRelation: "votaciones"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cerrar_votacion: { Args: { p_votacion_id: string }; Returns: undefined }
      crear_notificacion: {
        Args: {
          p_enlace?: string
          p_mensaje: string
          p_tipo?: Database["public"]["Enums"]["tipo_notificacion"]
          p_titulo: string
          p_usuario_id: string
        }
        Returns: string
      }
      crear_votacion_general: {
        Args: { p_descripcion?: string; p_titulo: string }
        Returns: string
      }
      desactivar_miembro: {
        Args: { p_miembro_id: string; p_observaciones?: string }
        Returns: undefined
      }
      es_administrador_activo: { Args: never; Returns: boolean }
      es_miembro_activo: { Args: never; Returns: boolean }
      notificar_miembros_activos: {
        Args: {
          p_enlace?: string
          p_mensaje: string
          p_tipo?: Database["public"]["Enums"]["tipo_notificacion"]
          p_titulo: string
        }
        Returns: number
      }
      obtener_correo_por_codigo: { Args: { p_codigo: string }; Returns: string }
      reactivar_miembro: { Args: { p_miembro_id: string }; Returns: undefined }
      revisar_solicitud: {
        Args: {
          p_decision: Database["public"]["Enums"]["estado_solicitud"]
          p_solicitud_id: string
        }
        Returns: undefined
      }
      validar_solicitud_aprobada: {
        Args: { p_codigo: string; p_correo: string }
        Returns: boolean
      }
      votar_solicitud: {
        Args: {
          p_votacion_id: string
          p_voto: Database["public"]["Enums"]["opcion_voto"]
        }
        Returns: undefined
      }
    }
    Enums: {
      estado_asistencia: "PRESENTE" | "MEDIA_FALTA" | "FALTA" | "JUSTIFICADA"
      estado_perfil: "PENDIENTE" | "ACTIVO" | "SUSPENDIDO" | "INACTIVO"
      estado_sesion: "PROGRAMADA" | "REALIZADA" | "CANCELADA"
      estado_solicitud: "PENDIENTE" | "APROBADA" | "RECHAZADA"
      estado_votacion: "ABIERTA" | "CERRADA"
      opcion_voto: "SI" | "NO" | "ABSTENCION"
      rol_sesion:
        | "FACILITADOR"
        | "DOCUMENTADOR"
        | "DETECTOR_HUECOS"
        | "ENCARGADO_CELULARES"
        | "COORDINADOR_AULA"
        | "TESORERO"
      tipo_material: "PDF" | "PPT" | "DOCX" | "ZIP" | "LINK" | "VIDEO" | "OTRO"
      tipo_notificacion:
        | "SESION"
        | "VOTACION"
        | "SOLICITUD"
        | "MATERIAL"
        | "SISTEMA"
      tipo_votacion: "INGRESO" | "GENERAL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_asistencia: ["PRESENTE", "MEDIA_FALTA", "FALTA", "JUSTIFICADA"],
      estado_perfil: ["PENDIENTE", "ACTIVO", "SUSPENDIDO", "INACTIVO"],
      estado_sesion: ["PROGRAMADA", "REALIZADA", "CANCELADA"],
      estado_solicitud: ["PENDIENTE", "APROBADA", "RECHAZADA"],
      estado_votacion: ["ABIERTA", "CERRADA"],
      opcion_voto: ["SI", "NO", "ABSTENCION"],
      rol_sesion: [
        "FACILITADOR",
        "DOCUMENTADOR",
        "DETECTOR_HUECOS",
        "ENCARGADO_CELULARES",
        "COORDINADOR_AULA",
        "TESORERO",
      ],
      tipo_material: ["PDF", "PPT", "DOCX", "ZIP", "LINK", "VIDEO", "OTRO"],
      tipo_notificacion: [
        "SESION",
        "VOTACION",
        "SOLICITUD",
        "MATERIAL",
        "SISTEMA",
      ],
      tipo_votacion: ["INGRESO", "GENERAL"],
    },
  },
} as const
