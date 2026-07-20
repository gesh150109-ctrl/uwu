import {
  Calendar,
  Clock3,
  FileText,
  MapPin,
} from "lucide-react";

import type { Tables } from "@/types/database.types";

type Session = Pick<
  Tables<"sesiones">,
  | "titulo"
  | "descripcion"
  | "fecha"
  | "hora_inicio"
  | "hora_fin"
  | "lugar"
  | "estado"
>;

interface SessionDetailsProps {
  session: Session;
}

const statusStyles = {
  PROGRAMADA: {
    label: "Programada",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  REALIZADA: {
    label: "Realizada",
    className:
      "border-slate-500/30 bg-slate-500/10 text-slate-300",
  },
  CANCELADA: {
    label: "Cancelada",
    className:
      "border-red-500/30 bg-red-500/10 text-red-400",
  },
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default function SessionDetails({
  session,
}: SessionDetailsProps) {
  const status = statusStyles[session.estado];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg md:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {session.titulo}
            </h1>

            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              {session.descripcion?.trim() ||
                "Sin descripción registrada."}
            </p>
          </div>

          <span
            className={`w-fit rounded-full border px-4 py-1.5 text-sm font-semibold ${status.className}`}
          >
            {status.label}
          </span>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <DetailCard
          icon={<Calendar size={22} />}
          label="Fecha"
          value={formatDate(session.fecha)}
        />

        <DetailCard
          icon={<Clock3 size={22} />}
          label="Horario"
          value={`${formatTime(session.hora_inicio)} - ${formatTime(
            session.hora_fin,
          )}`}
        />

        <DetailCard
          icon={<MapPin size={22} />}
          label="Lugar"
          value={session.lugar?.trim() || "Lugar por definir"}
        />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
            <FileText size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Información de la sesión
            </h2>

            <p className="text-sm text-slate-400">
              Datos generales registrados para esta sesión.
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-950 p-4">
            <dt className="text-sm text-slate-500">
              Estado actual
            </dt>

            <dd className="mt-1 font-semibold text-white">
              {status.label}
            </dd>
          </div>

          <div className="rounded-xl bg-slate-950 p-4">
            <dt className="text-sm text-slate-500">
              Duración
            </dt>

            <dd className="mt-1 font-semibold text-white">
              {calculateDuration(
                session.hora_inicio,
                session.hora_fin,
              )}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="text-cyan-400">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold capitalize text-white">
        {value}
      </p>
    </article>
  );
}

function calculateDuration(
  startTime: string,
  endTime: string,
) {
  const [startHours, startMinutes] = startTime
    .slice(0, 5)
    .split(":")
    .map(Number);

  const [endHours, endMinutes] = endTime
    .slice(0, 5)
    .split(":")
    .map(Number);

  const startTotal = startHours * 60 + startMinutes;
  const endTotal = endHours * 60 + endMinutes;
  const duration = endTotal - startTotal;

  if (duration <= 0) {
    return "Horario no válido";
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours === 0) {
    return `${minutes} minutos`;
  }

  if (minutes === 0) {
    return `${hours} ${hours === 1 ? "hora" : "horas"}`;
  }

  return `${hours} ${
    hours === 1 ? "hora" : "horas"
  } y ${minutes} minutos`;
}