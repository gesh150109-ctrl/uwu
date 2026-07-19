import {
  Calendar,
  Clock3,
  MapPin,
  BookOpen,
  Users,
} from "lucide-react";

interface CourseInfo {
  nombre: string;
  tema: string;
  expositores: string[];
}

interface SessionCardProps {
  fecha: string;
  hora: string;
  aula: string;
  curso1: CourseInfo;
  curso2: CourseInfo;
  estado: "Programada" | "Finalizada" | "Cancelada";
}

export default function SessionCard({
  fecha,
  hora,
  aula,
  curso1,
  curso2,
  estado,
}: SessionCardProps) {
  const badgeColor =
    estado === "Programada"
      ? "bg-emerald-500"
      : estado === "Finalizada"
      ? "bg-slate-600"
      : "bg-red-500";

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-lg">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-2xl font-bold text-cyan-400">
          Próxima sesión
        </h2>

        <span
          className={`${badgeColor} rounded-full px-4 py-1 text-sm font-semibold`}
        >
          {estado}
        </span>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <div className="flex items-center gap-3">
          <Calendar className="text-cyan-400" />
          <span>{fecha}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 className="text-cyan-400" />
          <span>{hora}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-cyan-400" />
          <span>{aula}</span>
        </div>

      </div>

      <div className="my-8 h-px bg-slate-700" />

      <div className="grid gap-6 lg:grid-cols-2">

        <CourseCard titulo="Curso 1" curso={curso1} />

        <CourseCard titulo="Curso 2" curso={curso2} />

      </div>

    </div>
  );
}

function CourseCard({
  titulo,
  curso,
}: {
  titulo: string;
  curso: CourseInfo;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">

      <div className="flex items-center gap-2 mb-4">

        <BookOpen className="text-cyan-400" size={20} />

        <h3 className="font-semibold text-cyan-300">
          {titulo}
        </h3>

      </div>

      <p className="font-semibold text-lg">
        {curso.nombre}
      </p>

      <p className="text-slate-400 mt-1">
        {curso.tema}
      </p>

      <div className="flex items-start gap-2 mt-5">

        <Users className="text-cyan-400 mt-1" size={18} />

        <div>

          <p className="text-sm text-slate-400">
            Expositores
          </p>

          <p>
            {curso.expositores.join(", ")}
          </p>

        </div>

      </div>

    </div>
  );
}