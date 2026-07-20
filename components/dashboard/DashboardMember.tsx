import Header from "./Header";
import NextSessionCard from "./NextSessionCard";
import StatCard from "./StatCard";

interface Props {
  nombre: string;

  porcentajeAsistencia: number;

  materialesNuevos: number;

  votacionesDisponibles: number;

  proximaSesion: {
    titulo: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    lugar: string | null;
  } | null;
}

export default function DashboardMember({
  nombre,
  porcentajeAsistencia,
  materialesNuevos,
  votacionesDisponibles,
  proximaSesion,
}: Props) {
  return (
    <div className="space-y-8">

      <Header nombre={nombre} />

      <section className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Asistencia"
          value={`${porcentajeAsistencia}%`}
        />

        <StatCard
          title="Materiales"
          value={materialesNuevos}
        />

        <StatCard
          title="Votaciones"
          value={votacionesDisponibles}
        />

      </section>

      <NextSessionCard
        session={proximaSesion}
      />

    </div>
  );
}