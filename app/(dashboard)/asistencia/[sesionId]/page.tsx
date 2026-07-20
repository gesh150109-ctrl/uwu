import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import AttendanceEmptyState from "@/components/attendance/AttendanceEmptyState";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { getSessionAttendance } from "@/services/attendance/get-session-attendance";
import { saveAttendanceAction } from "./actions";

interface SessionAttendancePageProps {
  params: Promise<{
    sesionId: string;
  }>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "long",
  }).format(new Date(`${date}T00:00:00`));
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default async function SessionAttendancePage({
  params,
}: SessionAttendancePageProps) {
  const { sesionId } = await params;

  const { session, members } =
    await getSessionAttendance(sesionId);

  if (!session) {
    notFound();
  }

  const action = saveAttendanceAction.bind(
    null,
    session.id,
  );

  return (
    <div className="space-y-8">
      <header>
        <Link
          href="/asistencia"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={17} />
          Volver a asistencia
        </Link>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Registro por sesión
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {session.titulo}
          </h1>

          {session.descripcion && (
            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              {session.descripcion}
            </p>
          )}
        </div>
      </header>

      <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg md:grid-cols-3">
        <SessionInfo
          icon={CalendarDays}
          label="Fecha"
          value={formatDate(session.fecha)}
        />

        <SessionInfo
          icon={Clock3}
          label="Horario"
          value={`${formatTime(session.hora_inicio)} - ${formatTime(
            session.hora_fin,
          )}`}
        />

        <SessionInfo
          icon={MapPin}
          label="Lugar"
          value={session.lugar || "No especificado"}
        />
      </section>

      {members.length === 0 ? (
        <AttendanceEmptyState variant="members" />
      ) : (
        <AttendanceTable
          members={members}
          action={action}
        />
      )}
    </div>
  );
}

interface SessionInfoProps {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}

function SessionInfo({
  icon: Icon,
  label,
  value,
}: SessionInfoProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
        <Icon size={20} />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}