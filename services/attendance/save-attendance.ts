import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type AttendanceStatus =
  Database["public"]["Enums"]["estado_asistencia"];

interface AttendanceRecord {
  perfilId: string;
  estado: AttendanceStatus;
  justificacion?: string | null;
}

interface SaveAttendanceInput {
  sessionId: string;
  registeredBy: string;
  records: AttendanceRecord[];
}

export async function saveAttendance({
  sessionId,
  registeredBy,
  records,
}: SaveAttendanceInput) {
  const supabase = await createClient();

  if (records.length === 0) {
    return [];
  }

  const rows = records.map((record) => ({
    sesion_id: sessionId,
    perfil_id: record.perfilId,
    estado: record.estado,
    justificacion:
      record.estado === "JUSTIFICADA"
        ? record.justificacion?.trim() || null
        : null,
    registrado_por: registeredBy,
  }));

  const { data, error } = await supabase
    .from("asistencia")
    .upsert(rows, {
      onConflict: "sesion_id,perfil_id",
    })
    .select(`
      id,
      sesion_id,
      perfil_id,
      estado,
      justificacion,
      registrado_por,
      created_at
    `);

  if (error) {
  const detalle = {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  };

  console.error(
    "ERROR REAL ASISTENCIA:",
    JSON.stringify(detalle, null, 2),
  );

  throw new Error(
    `${error.code ?? "SIN_CODIGO"}: ${error.message}`,
  );
}

  return data;
}