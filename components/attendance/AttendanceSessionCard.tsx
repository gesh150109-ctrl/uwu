import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import type { Tables } from "@/types/database.types";

type Session = Pick<
  Tables<"sesiones">,
  | "id"
  | "titulo"
  | "descripcion"
  | "fecha"
  | "hora_inicio"
  | "hora_fin"
  | "lugar"
  | "estado"
>;

interface AttendanceSessionCardProps {
  session: Session;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "long",
  }).format(new Date(`${date}T00:00:00`));
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default function AttendanceSessionCard({
  session,
}: AttendanceSessionCardProps) {
  const isCompleted = session.estado === "REALIZADA";

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-cyan-500/30">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-white">
              {session.titulo}
            </h2>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                isCompleted
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
              }`}
            >
              {isCompleted ? "Realizada" : "Programada"}
            </span>
          </div>

          {session.descripcion && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
              {session.descripcion}
            </p>
          )}
        </div>

        <Link
          href={`/asistencia/${session.id}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Gestionar
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 border-t border-slate-800 pt-5 sm:grid-cols-3">
        <SessionDetail
          icon={CalendarDays}
          label="Fecha"
          value={formatDate(session.fecha)}
        />

        <SessionDetail
          icon={Clock3}
          label="Horario"
          value={`${formatTime(session.hora_inicio)} - ${formatTime(
            session.hora_fin,
          )}`}
        />

        <SessionDetail
          icon={MapPin}
          label="Lugar"
          value={session.lugar || "No especificado"}
        />
      </div>
    </article>
  );
}

interface SessionDetailProps {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}

function SessionDetail({
  icon: Icon,
  label,
  value,
}: SessionDetailProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}