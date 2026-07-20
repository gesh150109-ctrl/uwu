import Link from "next/link";
import { CalendarPlus, ClipboardCheck } from "lucide-react";

interface AttendanceEmptyStateProps {
  variant?: "sessions" | "members";
}

export default function AttendanceEmptyState({
  variant = "sessions",
}: AttendanceEmptyStateProps) {
  if (variant === "members") {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
          <ClipboardCheck size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-white">
          No hay miembros activos
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
          No existen miembros activos disponibles para registrar asistencia
          en esta sesión.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
        <CalendarPlus size={28} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-white">
        No hay sesiones disponibles
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        Crea una sesión programada para comenzar a registrar la asistencia
        de los miembros.
      </p>

      <Link
        href="/sesiones/nueva"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        <CalendarPlus size={18} />
        Crear sesión
      </Link>
    </div>
  );
}