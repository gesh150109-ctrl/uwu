import Link from "next/link";
import {
  Calendar,
  Clock3,
  MapPin,
  FileText,
  ArrowRight,
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

interface SessionCardProps {
  session: Session;
}

const statusStyles = {
  PROGRAMADA: {
    label: "Programada",
    className: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  },
  REALIZADA: {
    label: "Realizada",
    className: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
  },
  CANCELADA: {
    label: "Cancelada",
    className: "bg-red-500/15 text-red-400 ring-red-500/30",
  },
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default function SessionCard({
  session,
}: SessionCardProps) {
  const status = statusStyles[session.estado];

  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:border-cyan-500/60">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-white">
            {session.titulo}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
            {session.descripcion?.trim() || "Sin descripción registrada."}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-6 grid gap-4 text-sm md:grid-cols-3">
        <div className="flex items-center gap-3 text-slate-300">
          <Calendar className="text-cyan-400" size={18} />
          <span>{formatDate(session.fecha)}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Clock3 className="text-cyan-400" size={18} />
          <span>
            {formatTime(session.hora_inicio)} -{" "}
            {formatTime(session.hora_fin)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <MapPin className="text-cyan-400" size={18} />
          <span>{session.lugar?.trim() || "Lugar por definir"}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FileText size={16} />
          <span>Detalle, cursos y expositores</span>
        </div>

        <Link
          href={`/sesiones/${session.id}`}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/10 hover:text-cyan-300"
        >
          Ver sesión
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}